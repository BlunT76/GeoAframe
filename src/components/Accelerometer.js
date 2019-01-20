import React, { Component } from 'react';
// import {Z_FIXED} from 'zlib';
// const projector = require('ecef-projector');
// const haveDistance = require('../utils/haversineDistance')
// Same as Atext with position based on gps coordinates

class Accelerometer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      absolute: null,
      alpha: null,
      beta: null,
      gamma: null,
      aX: null,
      aY: null,
      aZ: null,
    };
  }

  componentDidMount() {
    // window.addEventListener("deviceorientation", this.handleOrientation, true);
    // window.addEventListener("devicemotion", this.handleMotion, true);
    if (window.DeviceMotionEvent === undefined) {
      // No accelerometer is present. Use buttons.
      alert('no accelerometer');
    } else {
      alert('accelerometer found');
      window.addEventListener('devicemotion', this.accelerometerUpdate, true);
    }
    window
      .addEventListener('devicemotion', (event) => {
        console.log(`${event.acceleration.x}  m/s2`);
      });
  }

  handleOrientation = (event) => {
    this.setState({
      absolute: event.absolute,
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    });
  }

  // handleMotion = (event) => {}

  accelerometerUpdate = (event) => {
    console.log(event);
    this.setState({
      aX: event.accelerationIncludingGravity.x * 1,
      aY: event.accelerationIncludingGravity.y * 1,
      aZ: event.accelerationIncludingGravity.z * 1,
    });
    // var aX = event.accelerationIncludingGravity.x*1;
    // var aY = event.accelerationIncludingGravity.y*1;
    // var aZ = event.accelerationIncludingGravity.z*1;
    // The following two lines are just to calculate a
    // tilt. Not really needed.
    // xPosition = Math.atan2(aY, aZ);
    // yPosition = Math.atan2(aX, aZ);
  }

  render() {
    const divStyle = {
      position: 'absolute',
      top: 0,
      right: 30,
      color: 'blue',
      zIndex: 9000,
    };
    const {
      absolute,
      alpha,
      beta,
      gamma,
      aX,
      aY,
      aZ,
    } = this.state;
    return (
      <div style={divStyle}>
        <p>
          absolute:
          {absolute}
        </p>
        <p>
          alpha:
          {alpha}
        </p>
        <p>
          beta:
          {beta}
        </p>
        <p>
          gamma:
          {gamma}
        </p>
        <p>
          aX:
          {aX}
        </p>
        <p>
          aY:
          {aY}
        </p>
        <p>
          aZ:
          {aZ}
        </p>
      </div>
    );
  }
}

export default Accelerometer;


// Aframe position helper x Negative X axis extends left. Positive X Axis
// extends right. y Negative Y axis extends down. Positive Y Axis extends up. z
// Negative Z axis extends in.(devant la camera) Positive Z Axis extends
// out.(derriere la camera) Aframe rotation helper x Pitch, rotation about the
// X-axis. y Yaw, rotation about the Y-axis. z Roll, rotation about the
// Z-axis.
