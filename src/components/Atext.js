import React, {Component} from 'react';
import 'aframe-look-at-component';

class Atext extends Component {
  render() {
    return (
        <a-text
          font="kelsonsans"
          value={this.props.value}
          width={this.props.width}
          position= {this.props.position}
          rotation={this.props.rotation}
          color={this.props.color}
          look-at="[camera]"
        />
    );
  }
}

export default Atext;

// Aframe position helper
// x 	Negative X axis extends left. Positive X Axis extends right. 	
// y 	Negative Y axis extends down. Positive Y Axis extends up. 	
// z 	Negative Z axis extends in.(devant la camera) Positive Z Axis extends out.(derriere la camera)

// Aframe rotation helper
// x 	Pitch, rotation about the X-axis. 	
// y 	Yaw, rotation about the Y-axis. 	
// z 	Roll, rotation about the Z-axis.