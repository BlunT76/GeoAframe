import React, {Component} from 'react';
import projector from 'ecef-projector';
import 'aframe-look-at-component';

class Atext extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }

  componentDidMount () {
    console.log("list: ",this.props.list)
  }

  componentDidUpdate () {
    console.log("listUpdate: ",this.props.list)
  }

  updateObjPosition = (lat,lng) => {
    let prj = projector.project(lat, lng, 0)
    let ox = this.state.camPosition[0] - prj[0]
    let oz = this.state.camPosition[1] - prj[1]
    return `${ox} 0 ${oz}`
  }

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