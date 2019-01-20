import React, { Component } from 'react';
import { Plugins } from '@capacitor/core';
import projector from 'ecef-projector';
import 'aframe-look-at-component';
import config from './config';
import { getPoi } from './utils/getPoi';
import Atext from './components/Atext';

// import Aimage from './components/Aimage';
// import Acursor from './components/Acursor'
import Acompass from './components/Acompass';
// import Accelerometer from './components/Accelerometer'
import Camera from './components/Camera';
import MediaCamera from './components/MediaCamera';
import Amodal from './components/Modal';

const { Geolocation } = Plugins;
const overpass = 'https://overpass-api.de/api/interpreter?data=[out:json];node[bus]';
// const AFRAME = window.AFRAME


class AFrameRenderer extends Component {
  constructor(props) {
    super(props);
    this.AframeDiv = React.createRef();

    this.state = {
      watchID: null,
      camPosition: [0, 0, 0],
      poiList: [],
      overList: [],
      // position: "0 0 0",
      // positionArr:[],
      // objPos: null,
      // heading: 0,
      lat: null,
      lng: null,
      // bar: null,
      showModal: false,
      msg: '',
    };
  }

  componentDidMount() {
    this.updateCamPosition();
  }

  componentWillUnmount() {
    const { watchID } = this.state;
    navigator.geolocation.clearWatch(watchID);
    Geolocation.clearWatch(watchID);
  }

  handleOpenModal = (e) => {
    this.setState({ showModal: true, msg: e });
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
      return `${ox} -5 -${oz}`;
    }
    const oza = Math.abs(oz);
    return `${ox} -5 ${oza}`;
  }

  // launch the watchPosition function (dans un setState pour pouvoir le stopper
  // dans le unmount, je sais pas si c'est bien de faire ca)
  updateCamPosition = () => {
    let isList = false;
    const GeolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
      requireAltitude: false,
      timeout: 5000,
    };
    this.setState({
      watchID: Geolocation.watchPosition({ GeolocationOptions }, (position, error) => {
        if (!error) {
          console.log(position.coords);
          const prj = projector.project(position.coords.latitude, position.coords.longitude, 0);
          this.setState({
            camPosition: `${prj[0]} 0 -${prj[1]}`,
            lat: position.coords.latitude.toFixed(6),
            lng: position.coords.longitude.toFixed(6),
          //  heading: position.coords.heading
          });
          // provisoire, sert a effectuer seulement une requete overpass apres avoir obtenu
          // la 1ere position gps de l'utilisateur
          // this.getCamPosition(prj)
          this.setState({
            camPosition: prj,
          });
          if (isList === false) {
            isList = true;
            // this.getPoiInnoside();
            this.getPoiOverpass();
            getPoi(1, 1).then((response) => {
              console.log(response);
              this.setState({ poiList: response });
            });
          }
        } else {
          console.log({ error });
        }
      }),
    });
  }


  // _onSuccess = (e) => {
  //   console.log(e)
  // }
  // }
  // affiche les POI de OVERPASS

  getPoiOverpass = () => {
    // let that = this.props
    // requete de poi sur overpass api
    const { lat, lng } = this.state;
    if ((lat !== null) && (lng !== null)) {
      // prettier-ignore
      fetch(
        `${overpass}(around:500.0,${lat},${lng});out;`,
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then((responseJson) => {
          if (responseJson.elements.length !== 0) {
            this.setState({ overList: responseJson.elements });
          } else {
            console.log('rien a proximité');
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }

  // AFFICHE LES POI DE INNOSIDE
  getPoiInnoside = () => {
    // requete de poi sur overpass api
    const { lat, lng } = this.state;
    if ((lat != null) && (lng != null)) {
      // console.log(config.url);

      fetch(
        `${config.url}`,
        {
          method: 'GET',
        },
      )
        .catch((error) => {
          console.log('error1', error);
        })
        .then(response => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.payload.geofences.length !== 0) {
            this.setState({ poiList: responseJson.payload.geofences });
          } else {
            console.log('rien a proximité');
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }

  render() {
    const {
      poiList, overList, lat, lng, msg, showModal,
    } = this.state;

    const sceneStyle = {
      height: '100%',
      width: '100%',
      zIndex: 1,
      backgroundColor: 'transparent',
    };
    return (
      <div>
        <a-scene cursor="rayOrigin: mouse" light="defaultLightsEnabled: false" style={sceneStyle}>
          <MediaCamera />
          <Camera lat={lat} lng={lng} />

          {/* Affichage des POI de openstreetmap */}

          {poiList.map(e => (
            <Atext
              key={e._id.toString()}
              position={
                this.updateObjPosition(e.location.coordinates[1], e.location.coordinates[0])
              }
              handleOpenModal={this.handleOpenModal}
              value={e.name}
              look-at="[camera]"
              width="30"
              color="color: #953292"
            />
          ))}

          {overList.map(e => (
            <Atext
              key={e.id.toString()}
              position={this.updateObjPosition(e.lat, e.lon)}
              handleOpenModal={this.handleOpenModal}
              value={e.tags.name}
              look-at="[camera]"
              width="30"
              color="color: #FF6600"
            />
          ))}
          <Acompass value="N" position={this.updateCompassPosition((Number(lat) - 0.0002), Number(lng), 0)} rotation="-90 90 0" />
          <Acompass value="S" position={this.updateCompassPosition((Number(lat) + 0.0002), Number(lng), 0)} rotation="-90 90 -180" />
          <Acompass value="E" position={this.updateCompassPosition(Number(lat), (Number(lng) - 0.0002), 0)} rotation="-90 90 -90" />
          <Acompass value="O" position={this.updateCompassPosition(Number(lat), (Number(lng) + 0.0002), 0)} rotation="-90 90 90" />
        </a-scene>
        <Amodal msg={msg} open={showModal} handleCloseModal={this.handleCloseModal} />
      </div>
    );
  }
}

export default AFrameRenderer;
