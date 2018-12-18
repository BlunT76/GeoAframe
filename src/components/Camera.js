import React, {Component} from 'react';
const AFRAME = window.AFRAME
const THREE = window.THREE
const projector = require('ecef-projector');

class Camera extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      position: "0 0 0",
      location: null,
      watchID: null
    }
  }

  componentDidMount() {
    //create listener to get the camera position
    AFRAME.registerComponent('listener', {
      init: function () {
        this.tick = AFRAME
          .utils
          .throttleTick(this.tick, 1000, this);
      },
      tick: function () {
        console.log("CamPosition: ", this.el.getAttribute('position'));
      }
    });
    //launch 
    this.updateCamPosition()
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watchID);
  }

  //launch the watchPosition function (dans un setState pour pouvoir le stopper dans le unmount,
  // je sais pas si c'est bien de faire ca)
  updateCamPosition = () => {
    if ("geolocation" in navigator) {
      this.setState({
        watchID: navigator
          .geolocation
          .watchPosition( (position) => {
            let prj = projector.project(position.coords.latitude, position.coords.longitude, 0);
            console.log(prj)
            this.setState({position: `${prj[0]} ${prj[1]} ${prj[2]}`})
          })
      })
    } else {
      alert("Pas de geolocation disponible")
    }
  }

  render() {
    return (
      <a-entity
        ref={this.myRef}
        camera="active: true"
        look-controls
        wasd-controls
        position={this.state.position}
        data-aframe-default-camera
        listener>
      </a-entity>
    );
  }
}
export default Camera;

const camStyle = {
  position: 'fixed',
  top: '10px',
  width: '100%',
  height: '100%'
};

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
// Aframe position helper x 	Negative X axis extends left. Positive X Axis
// extends right. y 	Negative Y axis extends down. Positive Y Axis extends up. z
// 	Negative Z axis extends in.(devant la camera) Positive Z Axis extends
// out.(derriere la camera) Aframe rotation helper x 	Pitch, rotation about the
// X-axis. y 	Yaw, rotation about the Y-axis. z 	Roll, rotation about the
// Z-axis.