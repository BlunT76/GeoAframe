import React, {Component} from 'react';

class Acursor extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   }
  // }
  render() {
    return (
      // <a-entity camera look-controls wasd-controls>
      <a-entity cursor="fuse: true; fuseTimeout: 500"
                position="0 0 -1"
                geometry="primitive: ring; radiusInner: 0.005; radiusOuter: 0.007"
                material="color: blue; shader: flat">
      </a-entity>
      
    // </a-entity>
    
    // <a-entity id="box" cursor-listener geometry="primitive: box" material="color: blue"></a-entity>
    );
  }
}

export default Acursor;

// Aframe position helper
// x 	Negative X axis extends left. Positive X Axis extends right. 	
// y 	Negative Y axis extends down. Positive Y Axis extends up. 	
// z 	Negative Z axis extends in.(devant la camera) Positive Z Axis extends out.(derriere la camera)

// Aframe rotation helper
// x 	Pitch, rotation about the X-axis. 	
// y 	Yaw, rotation about the Y-axis. 	
// z 	Roll, rotation about the Z-axis.