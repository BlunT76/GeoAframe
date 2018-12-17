import React, {Component} from 'react';
const projector = require('ecef-projector');
const haveDistance = require ('../utils/haversineDistance')
//Same as Atext with position based on gps coordinates

class AtextGeo extends Component {
  
  render() {
    console.log(this.props.position)
    var pos = projector.project(37.8043722, -122.2708026, 0.0);
    console.log(pos);
   
    return (
        <a-text
          font="kelsonsans"
          value={this.props.value}
          width={this.props.width}
          position= {`${pos[0]} ${pos[1]} 0`}
          rotation={this.props.rotation}
        />
    );
  }
}

export default AtextGeo;

// Aframe position helper
// x 	Negative X axis extends left. Positive X Axis extends right. 	
// y 	Negative Y axis extends down. Positive Y Axis extends up. 	
// z 	Negative Z axis extends in.(devant la camera) Positive Z Axis extends out.(derriere la camera)

// Aframe rotation helper
// x 	Pitch, rotation about the X-axis. 	
// y 	Yaw, rotation about the Y-axis. 	
// z 	Roll, rotation about the Z-axis.