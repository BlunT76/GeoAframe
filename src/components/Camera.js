import React, {Component} from 'react';
import 'aframe-look-at-component';
import projector from 'ecef-projector';
import { Plugins } from '@capacitor/core';
import Atext from './Atext'
import config from '../config'
//import Acursor from './Acursor'

const { Geolocation } = Plugins;
const overpass = "https://overpass-api.de/api/interpreter?data=[out:json];node[bus]";
//const AFRAME = window.AFRAME
//const THREE = window.THREE


class Camera extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    
    this.state = {
      position: "0 0 0",
      positionArr:[],
      objPos: null,
      heading: null,
      lat: null,
      lng:null,
      watchID: null,
      bar: null
    }
  }

  componentDidMount() {
    this.updateCamPosition()
    let supported = navigator.mediaDevices.getSupportedConstraints();
    //console.log(supported)
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watchID);
    Geolocation.clearWatch(this.state.watchID);
  }

  // launch the watchPosition function (dans un setState pour pouvoir le stopper
  // dans le unmount, je sais pas si c'est bien de faire ca)
  updateCamPosition = () => {
    let that = this.props
    let isList = false
    this.setState({
      watchID: Geolocation.watchPosition({GeolocationOptions},(position,error) => {
        let prj = projector.project(position.coords.latitude, position.coords.longitude, 0);
        this.setState({
          position: `${prj[0]} 0 -${prj[1]}`,
          lat:position.coords.latitude.toFixed(6),
          lng:position.coords.longitude.toFixed(6),
          heading:position.coords.heading
        })
        //provisoire, sert a effectuer seulement une requete overpass apres avoir obtenu 
        //la 1ere position gps de l'utilisateur
        that.getCamPosition(prj)
        if (isList == false){ 
          isList = true
          //this.getPoiOverpass()
          this.getPoiInnoside()
        }
      })
    })
  }

  // affiche les POI de OVERPASS

  getPoiOverpass = () => {
    let that = this.props
     //requete de poi sur overpass api
    if ((this.state.lat != null) & (this.state.lng != null)) {
      // prettier-ignore
      fetch(`${overpass}(around:500.0,${this.state.lat},${this.state.lng});out;`,
        {
          method: "GET"
        }
      )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.elements.length != 0) {
          this.props.getPoiList(responseJson.elements)
        } else {
          console.log("rien a proximité");
        }
      })
      .catch(error => {
        console.log("error", error);
      });
    }
  }

  // AFFICHE LES POI DE INNOSIDE
  getPoiInnoside = () => {
    let that = this.props
     //requete de poi sur overpass api
    if ((this.state.lat != null) & (this.state.lng != null)) {
      fetch(`${config.url}`,
        {
          method: "GET"
        }
      )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        if (responseJson.payload.geofences.length != 0) {
          this.props.getPoiList(responseJson.payload.geofences)
        } else {
          console.log("rien a proximité");
        }
      })
      .catch(error => {
        console.log("error", error);
      });
    }
  }

  render() {
    return (
      <a-entity /*position={this.state.position} */>
        <a-entity
          id="camera"
          ref={this.myRef}
          camera="active: true"
          look-controls
          wasd-controls
          //position="0 0 0"
          listener
          near="0"
          userHeight="1.6"
          rotation="0 0 0"
          >
          {/* //affichage de la geolocation de la camera */}
          <Atext position="0 0 -1" value={`lat: ${this.state.lat} lng: ${this.state.lng}`} rotation="0 0 0" width="2" color= "red" align="center" />
          {/* <Atext position="0.5 -0.3 -1" value={`lng: ${this.state.lng}`} rotation="0 0 0" width="2" color= "#0F25CE" align="center"/> */}
          <Atext position="0.1 -0.1 -1" value={`heading: ${this.state.heading}`} rotation="0 0 0" width="0.5" color= "#0F25CE" align="center"/>
          
        </a-entity>
      </a-entity>
    );
  }
}

const GeolocationOptions = {
  enableHighAccuracy:true,
  maximumAge:0,
  requireAltitude: false,
  timeout:5000
}

export default Camera;

//passer le projet sous capacitor en apk mobile
//utiliser un plugin magnetometer, integrer boussole sur camera, tester precision
//serveur node, bdd qui stocke les poi(mongodb) une page pour ajouter des poi,
//insomnia