import React, { Component } from 'react';
import PropTypes from 'prop-types';
import projector from 'ecef-projector';
import 'aframe-look-at-component';
import {
  getPoiInnoside,
  getPoiOverpass,
  navigate,
  getPoiPersoAll,
} from './utils/getPoi';
import { drawLines } from './utils/drawLines';
import Atext from './components/Atext';
// import Aimage from './components/Aimage';
import Acompass from './components/Acompass';
import Camera from './components/Camera';
import MediaCamera from './components/MediaCamera';
import Amodal from './components/Modal';

// const AFRAME = window.AFRAME


class App extends Component {
  constructor(props) {
    super(props);
    this.AframeDiv = React.createRef();

    this.state = {
      watchID: null,
      camPosition: [0, 0, 0],
      prjPrevious: [0, 0, 0],
      poiList: [],
      overList: [],
      persoList: [],
      orientation: null,
      orientationPrevious: null,
      lat: null,
      lng: null,
      linesPos: null,
      showModal: false,
      msg: '',
      iNav: null,
      list: null,
      control: true,
    };
  }

  componentDidMount() {
    this.updateCamPosition();
    if (window.DeviceOrientationEvent === undefined) {
      // No accelerometer is present. Use buttons.

      alert('no magnetometer');
    } else {
      // alert('accelerometer found');
      window.addEventListener('deviceorientation', this.magnetometerUpdate, true);
      window.addEventListener('compassneedscalibration', (event) => {
        alert('Your compass needs calibrating! Wave your device in a figure-eight motion');
        event.preventDefault();
      }, true);
    }
    if (window.innerHeight > window.innerWidth) {
      alert('Le mode paysage est plus adapté à cette apllication!');
    }
  }

  componentWillUnmount() {
    const { watchID } = this.state;
    navigator.geolocation.clearWatch(watchID);
  }

  magnetometerUpdate = ({ alpha }) => {
    const { orientationPrevious } = this.state;
    let a = alpha;
    let nextVal = null;
    if (orientationPrevious === null) {
      this.setState({ orientationPrevious: alpha });
    }
    // if (Math.abs(alpha - orientationPrevious) > 180) {
    //   a = alpha - 360;
    // }
    if (orientationPrevious > 358 && a < 3) {
      console.log('ICI');
      a += orientationPrevious;
      nextVal = ((orientationPrevious * 4) + (a)) / 5;
      nextVal -= 360;
      console.log(nextVal);
    }

    if (orientationPrevious < 3 && a > 358) {
      console.log('LA');
      a = orientationPrevious - a;
      nextVal = ((orientationPrevious * 4) + (a)) / 5;
      nextVal += 360;
      console.log(nextVal);
    } else {
      // console.log('ELSE');
      nextVal = ((orientationPrevious * 4) + (a)) / 5;
    }

    if (nextVal !== 0) {
      this.setState({
        orientation: nextVal,
        orientationPrevious: nextVal,
        control: false,
      });
    }
  }

  handleOpenModal = (e, i, l) => {
    this.setState({
      showModal: true,
      msg: e,
      iNav: i,
      list: l,
    });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  updateObjPosition = (lat, lng) => {
    const { camPosition } = this.state;
    const prj = projector.project(lat, lng, 0);
    const ox = camPosition[0] - prj[0];
    const oz = camPosition[1] - prj[1];
    if (oz > 0) {
      return `${ox} 0 -${oz}`;
    }
    const oza = Math.abs(oz);
    return `${ox} 0 ${oza}`;
  }

  updateCompassPosition = (lat, lng) => {
    const { camPosition } = this.state;
    const prj = projector.project(Number(lat), Number(lng), 0);
    const ox = camPosition[0] - prj[0];
    const oz = camPosition[1] - prj[1];
    if (Number.isNaN(ox) || Number.isNaN(oz)) {
      return null;
    }
    if (oz > 0) {
      return `${ox} -10 -${oz}`;
    }
    const oza = Math.abs(oz);
    return `${ox} -10 ${oza}`;
  }

  // launch the watchPosition function (dans un setState pour pouvoir le stopper
  // dans le unmount, je sais pas si c'est bien de faire ca)
  updateCamPosition = () => {
    const { prjPrevious } = this.state;
    const { dataMenu } = this.props;
    let isList = false;

    this.setState({
      watchID: navigator.geolocation.watchPosition((position) => {
        if (position) {
          // console.log(position.coords.latitude, position.coords.longitude);

          const prj = projector.project(position.coords.latitude, position.coords.longitude, 0);
          if (prjPrevious === null) {
            this.setState({ prjPrevious: prj });
          }
          const nextLat = ((prjPrevious[0] * 4) + (prj[0])) / 5;
          const nextLng = ((prjPrevious[1] * 4) + (prj[1])) / 5;
          const nextAlt = ((prjPrevious[2] * 4) + (prj[2])) / 5;

          this.setState({
            prjPrevious: [nextLat, nextLng, nextAlt],
            lat: position.coords.latitude.toFixed(6),
            lng: position.coords.longitude.toFixed(6),
            camPosition: prj,
          });

          if (isList === false) {
            isList = true;

            if (dataMenu.innoside) {
              getPoiInnoside(1, 1).then((response) => {
                // console.log({ response });
                this.setState({ poiList: response });
              });
            }
            if (dataMenu.overpass) {
              getPoiOverpass(
                position.coords.latitude,
                position.coords.longitude,
                dataMenu.around,
              ).then((response) => {
                // console.log({ response });
                this.setState({ overList: response });
              });
            }
            if (dataMenu.perso) {
              getPoiPersoAll()
                .then(response => this.setState({ persoList: response }));
            }
          }
        }
      }, (error) => {
        console.log(error);
        isList = false;
      }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 2000,
      }),
    });
  }

  handleNavigate = (value, id, selectedList) => {
    const {
      lat, lng, overList, poiList, persoList, camPosition,
    } = this.state;

    const list = {
      innoside: poiList,
      overpass: overList,
      perso: persoList,
    }[selectedList];
    //              //overpass      //perso         //innoside
    let destLat = list[id].lat || list[id].loc || list[id].location;
    let destLon = list[id].lon || list[id].loc || list[id].location;

    if (typeof destLat !== 'number') destLat = destLat.coordinates[1];
    if (typeof destLon !== 'number') destLon = destLon.coordinates[0];
    console.log(lng, lat, destLon, destLat);


    navigate(
      lat,
      lng,
      destLat,
      destLon,
    )
      .then((res) => {
        // console.log(res.features[0].geometry.coordinates);
        const result = drawLines(
          res.features[0].geometry.coordinates,
          list[id].lat,
          list[id].lon,
          camPosition,
        );
        this.setState({ linesPos: result });
        console.log(result);
      });
  }

  render() {
    const {
      poiList,
      overList,
      persoList,
      lat,
      lng,
      msg,
      showModal,
      orientation,
      linesPos,
      iNav,
      list,
      control,
    } = this.state;

    const sceneStyle = {
      width: window.innerWidth,
      height: window.innerHeight,
      zIndex: '1',
      backgroundColor: 'transparent',
      overflow: 'hidden',
    };

    return (
      <div>
        <a-scene embedded stats cursor="rayOrigin: mouse" light="defaultLightsEnabled: false" style={sceneStyle}>

          {/* Affichage de la camera  A-frame */}
          <Camera lat={lat} lng={lng} roty={orientation} control={control} />

          {/* Affichage de la webcam en arriere plan */}
          <MediaCamera />

          {/* Affichage d'un cone vert sur la position de l'utilisateur */}
          <a-entity
            material="color: #4BB14F"
            position={this.updateObjPosition(lat, lng)}
            geometry="primitive: cone; segmentsRadial: 4; radiusBottom: 0.01; radiusTop: 0.5; height: 2"
          />

          {/* Affichage des lignes de navigation */}
          {linesPos && linesPos.map(e => (
            <a-entity
              line={e}
              key={`line${e}`}
            />
          ))
          }

          {/* Affichage des POI de Innoside */}
          {poiList && poiList.map((e, i) => (
            <Atext
              key={e._id.toString()}
              id={i.toString()}
              position={
                this.updateObjPosition(e.location.coordinates[1], e.location.coordinates[0])
              }
              handleOpenModal={this.handleOpenModal}
              value={e.name}
              look-at="[camera]"
              width="100"
              height="5"
              color="color: #953292"
              list="innoside"
            />
          ))}

          {/* Affichage des POI de openstreetmap */}
          {overList && overList.map((e, i) => (
            ((e.tags.name || e.tags.amenity) && i < 30) && (
              <Atext
                key={e.id.toString()}
                id={i.toString()}
                position={this.updateObjPosition(e.lat, e.lon)}
                handleOpenModal={this.handleOpenModal}
                value={e.tags.name || e.tags.amenity}
                look-at="[camera]"
                width="100"
                height="5"
                color="color: #FF6600"
                list="overpass"
              />
            )
          ))}

          {/* Affichage des POI de openstreetmap */}
          {persoList && persoList.map((e, i) => (
            ((e.name) && i < 30) && (
              <Atext
                key={e._id}
                id={i.toString()}
                position={this.updateObjPosition(e.loc.coordinates[1], e.loc.coordinates[0])}
                handleOpenModal={this.handleOpenModal}
                value={e.name}
                look-at="[camera]"
                width="100"
                height="5"
                color="color: #FF6600"
                list="perso"
              />
            )
          ))}

          {/* Affichage d'une boussole simplifiée */}
          <Acompass value="N" color="red" position={this.updateCompassPosition((Number(lat) + 0.0002), Number(lng), 0)} rotation="-90 90 -180" />
          <Acompass value="S" position={this.updateCompassPosition((Number(lat) - 0.0002), Number(lng), 0)} rotation="-90 90 0" />
          <Acompass value="E" position={this.updateCompassPosition(Number(lat), (Number(lng) + 0.0002), 0)} rotation="-90 90 90" />
          <Acompass value="O" position={this.updateCompassPosition(Number(lat), (Number(lng) - 0.0002), 0)} rotation="-90 90 -90" />
        </a-scene>

        <Amodal
          msg={msg}
          id={iNav}
          open={showModal}
          handleCloseModal={this.handleCloseModal}
          handleNavigate={this.handleNavigate}
          list={list}
        />
      </div>
    );
  }
}

App.propTypes = {
  dataMenu: PropTypes.shape({
    innoside: PropTypes.bool,
    overpass: PropTypes.bool,
    around: PropTypes.number,
    perso: PropTypes.bool,
  }),
};

App.defaultProps = {
  dataMenu: {
    innoside: false,
    overpass: false,
    around: 0,
    perso: false,
  },
};

export default App;
