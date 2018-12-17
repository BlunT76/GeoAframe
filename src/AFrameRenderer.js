//react imports
import React, {Component} from 'react';
import Atext from './components/Atext'
import Aimage from './components/Aimage'
import Acursor from './components/Acursor'
import ARgeo from './components/ARgeo'
import AtextGeo from './components/AtextGeo'
import Orientation from './components/Orientation'
// const ar = 'ar.js' const AFrame = 'aframe.js' const AFrame = () => ( function
// AFrame () {
class AFrameRenderer extends Component {
  constructor(props) {
    super(props);
    this.AframeDiv = React.createRef();

    this.state = {
      inno_1: null
    }
  }
  render() {
    return (
      <a-scene stats >
        <Orientation />
        {/* <Acursor /> */}
        <AtextGeo position={{lat: 2, lng: 3, alt:0}} rotation="0 15 0" value="GEOGEO" width="10000"/>
        <Atext position="0 0 -15" rotation="0 15 0" value="innoside" width="10"/> 
        <Atext position="0 1 -15" rotation="0 0 0" value="simplon" width="5"/>
        <Aimage 
          position="-2 5 -15" 
          rotation="0 0 0" 
          width="10" 
          height="2.5"
        />
        

        {/* <a-camera id="camera" user-height="1.6" gps-position compass-rotation style={{position: 'fixed', top: '10px', width:'100%', height:'100%'}}></a-camera> */}
      </a-scene>
    );
  }
}
AFrameRenderer.propTypes = {};
AFrameRenderer.defaultProps = {};

export default AFrameRenderer;

// Aframe position helper
// x 	Negative X axis extends left. Positive X Axis extends right. 	
// y 	Negative Y axis extends down. Positive Y Axis extends up. 	
// z 	Negative Z axis extends in.(devant la camera) Positive Z Axis extends out.(derriere la camera)

// Aframe rotation helper
// x 	Pitch, rotation about the X-axis. 	
// y 	Yaw, rotation about the Y-axis. 	
// z 	Roll, rotation about the Z-axis.