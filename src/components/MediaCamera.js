import React, {Component} from 'react';
import Webcam from 'react-webcam'


class MediaCamera extends Component {
  render() {
    const videoConstraints = {
      facingMode:  "environment" 
    };
    return (
      <Webcam
      style={videoContainer}
        audio={false}
        autoPlay={true}
        videoConstraints={videoConstraints}
        ref={node => this.webcam = node}
      />
    );
  }
}

const GeolocationOptions = {
  enableHighAccuracy:true,
  maximumAge:0,
  requireAltitude: false,
  timeout:5000
}

const videoContainer = {
  display: "block",
  height: "100%",
  overflow: "hidden",
  width: "100%",
  zIndex: 0
  
}
// const camStyle = {
//   // position: 'fixed',
//   // top: '10px',
//   // width: '100%',
//   // height: '100%'
// };

// const options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };


export default MediaCamera;

//passer le projet sous capacitor en apk mobile
//utiliser un plugin magnetometer, integrer boussole sur camera, tester precision
//serveur node, bdd qui stocke les poi(mongodb) une page pour ajouter des poi,
//insomnia