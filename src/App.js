import React, {Component} from 'react';
import projector from 'ecef-projector';
import 'aframe-look-at-component';
import Atext from './components/Atext'
import Aimage from './components/Aimage'
import Acursor from './components/Acursor'
//import AtextGeo from './components/AtextGeo'
//import Accelerometer from './components/Accelerometer'
import Camera from './components/Camera'


class AFrameRenderer extends Component {
  constructor(props) {
    super(props);
    this.AframeDiv = React.createRef();

    this.state = {
      inno_1: null,
      camPosition: [0,0,0],
    }
  }

  componentDidMount () {
    
  }
  getCamPosition = (e) => {
      this.setState({
        camPosition: e
      })
  }

  getObjRotation = (e) => {
    //Math.atan2(Math.sin(Math.radians(angledest) - Math.radians(angleplayer)), Math.cos(Math.radians(angledest) - Math.radians(angleplayer)))
  }

  updateObjPosition = (lat,lng) => {
    let prj = projector.project(lat, lng, 0)
    let ox = this.state.camPosition[0] - prj[0]
    let oz = this.state.camPosition[1] - prj[1]
    return `${ox} 0 -${oz}`
  }
  
  render() {
    return (
      <a-scene cursor="rayOrigin: mouse" style={sceneStyle}> 
        <Camera getCamPosition={this.getCamPosition}/>

        

        <Atext position={this.updateObjPosition(43.050646,0.721948)} value="Fontaine" look-at="[camera]" width="15" color= "#0F25CE"/>
        <Atext position={this.updateObjPosition(43.050740,0.721487)} value="Eglise" look-at="[camera]" width="15" color= "#0F25CE"/>
        <Atext position={this.updateObjPosition(43.050305,0.722297)} value="Cour" look-at="[camera]" width="15" color= "#0F25CE"/>
        <Atext position={this.updateObjPosition(43.050246,0.722458)} value="Voisine" look-at="[camera]" width="15" color= "#0F25CE"/>

        <Atext position={this.updateObjPosition(43.593967,1.447539)} value="Dans la rue" look-at="[camera]" width="15" color= "#0F25CE"/>
        <Atext position={this.updateObjPosition(43.594340,1.447813)} value="Tramway Jardin Royal" look-at="[camera]" width="15" color= "#0F25CE"/>

        <Aimage 
          position={this.updateObjPosition(43.593547,1.448119)} 
          rotation="0 0 0" 
          width="10" 
          height="2.5"
        />
        
       
        {/* <a-camera id="camera" user-height="1.6" gps-position compass-rotation style={{position: 'fixed', top: '10px', width:'100%', height:'100%'}}></a-camera> */}
      </a-scene>
      
    );
  }
}

const sceneStyle = {
  // height: "100%",
  // width: "100%"
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

//position gps proche simplon saint gaudens
//43.109098, 0.726465 accueil cyberbase
//43.109466, 0.726465 rue de l'avenir
//43.109447, 0.726760 cour de derriere
//43.109235, 0.726666
//43.71606591298971, 1.334468722343445