import React, { PureComponent } from 'react';

require('aframe-look-at-component');
const projector = require('ecef-projector');


class AtextGeo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pos: null,
      // rotation: null,
      // angleObj: null
    };
  }

  componentDidMount() {
    this.getProjection();
  }

  getProjection = () => {
    const {lat, lng } = this.props;
    const prj = projector.project(lat, lng, 0);
    this.setState({ pos: prj });
  }

  handleObjRotation = () => {
    const { cam } = this.props;
    const { pos } = this.state;
    if (!cam || !pos) {
      return;
    }

    const dx = pos[2] - cam[2];
    const dy = pos[1] - cam[1];
    let c = Math.atan(dy / dx);

    if (dx < 0) {
      c += Math.PI;
    }
    const res = c * 180 / Math.PI;
    this.setState({ angleObj: res });
  }

  render() {
    let res = 0
    // if(this.props.cam > this.props.lng){
    //   res = this.props.cam-this.props.lng
    // } else {
    //   res = this.props.cam-this.props.lng+90
    // }
    // let res
    // if(this.props.cam && this.state.pos){
    //   //console.log(this.props.cam)
    //   let dx = this.state.pos[0]- this.props.cam[0]
    //   let dy = this.state.pos[2]- this.props.cam[2]
    //   let c = Math.atan(dy / dx)
      
    //   if(dx < 0){
    //     c = c + Math.PI
    //   } 
    //   res = c * 180 / Math.PI
    //   console.log("RES",res)
    //   //this.setState({angleObj: res}) 
    // }
    
    return (
      this.state.pos != null &&
      <a-entity>
        <a-text
          font="kelsonsans"
          value={this.props.value}
          width={this.props.width}
          position= {`${this.state.pos[0]} 0 ${this.state.pos[1]}`}
          //rotation={`0 ${res} 0`}
          color= "#15E10D"
          look-at="[camera]"
        />
        <a-box color="red" depth="0.1" height="0.1" width="0.1" position= {`${this.state.pos[0]} 0 ${this.state.pos[1]}`}></a-box>
      </a-entity>
    );
  }
}

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

export default AtextGeo;

// Aframe position helper
// x 	Negative X axis extends left. Positive X Axis extends right. 	
// y 	Negative Y axis extends down. Positive Y Axis extends up. 	
// z 	Negative Z axis extends in.(devant la camera) Positive Z Axis extends out.(derriere la camera)

// Aframe rotation helper
// x 	Pitch, rotation about the X-axis. 	
// y 	Yaw, rotation about the Y-axis. 	
// z 	Roll, rotation about the Z-axis.