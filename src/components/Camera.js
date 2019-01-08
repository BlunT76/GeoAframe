import React, {Component} from 'react';
import 'aframe-look-at-component';
import projector from 'ecef-projector';
import Atext from './Atext'
import Acursor from './Acursor'
//import AtextGeo from './AtextGeo'

const AFRAME = window.AFRAME
const THREE = window.THREE


class Camera extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      position: "0 0 0",
      positionArr:[],
      objPos: null,
      heading: null,
      //rotation: null,
      //location: null,
      lat: null,
      lng:null,
      watchID: null
    }
  }

  componentDidMount() {
    this.updateCamPosition()
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watchID);
  }

  // launch the watchPosition function (dans un setState pour pouvoir le stopper
  // dans le unmount, je sais pas si c'est bien de faire ca)
  updateCamPosition = () => {
    let that = this.props
    if ("geolocation" in navigator) {
      this.setState({
        watchID: navigator
          .geolocation
          .watchPosition((position,error, options) => {
            let prj = projector.project(position.coords.latitude, position.coords.longitude, 0);
            this.setState({position: `${prj[0]} 0 ${prj[1]}`})
            //this.setState({positionArr: prj})
            this.setState({lat:position.coords.latitude})
            this.setState({lng:position.coords.longitude})
            this.setState({heading:position.coords.heading})
            that.getCamPosition(prj)
          })
      })
    } else {
      alert("Pas de geolocation disponible")
    }
  }

  // updateObjPosition = (lat,lng) => {
  //   let prj = projector.project(lat, lng, 0)
  //   let ox = this.state.positionArr[0] - prj[0]
  //   let oz = this.state.positionArr[1] - prj[1]
  //   return `${ox} 0 -${oz}`
  // }

  render() {
    return (
      <a-entity /*position={this.state.position}*/>
        <a-entity
          id="camera"
          ref={this.myRef}
          camera="active: true"
          look-controls
          wasd-controls
          position="0 0 0"
          listener
          near="0"
          axis
          //look-at="0 0 0"
          //rotation="0 180 180"
          //style={this.camStyle}
          >
          {/* //affichage de la geolocation de la camera */}
          <Atext position="-0.2 0 -1" value={`lat: ${this.state.lat}`} rotation="0 0 0" width="0.5" color= "#0F25CE" align="center"/>
          <Atext position="0.1 0 -1" value={`lng: ${this.state.lng}`} rotation="0 0 0" width="0.5" color= "#0F25CE" align="center"/>
          <Atext position="0.1 -0.1 -1" value={`heading: ${this.state.heading}`} rotation="0 0 0" width="0.5" color= "#0F25CE" align="center"/>
          <a-entity cursor="fuse: true; fuseTimeout: 500"
                position="0 0 -1"
                geometry="primitive: ring; radiusInner: 0.005; radiusOuter: 0.007"
                material="color: blue; shader: flat">
          </a-entity>
          
        </a-entity>
      </a-entity>
    );
  }
}

const camStyle = {
  // position: 'fixed',
  // top: '10px',
  // width: '100%',
  // height: '100%'
};

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export default Camera;

//passer le projet sous capacitor en apk mobile
//utiliser un plugin magnetometer, integrer boussole sur camera, tester precision
//serveur node, bdd qui stocke les poi(mongodb) une page pour ajouter des poi,
//insomnia