import React, {Component} from 'react';
import projector from 'ecef-projector';
import 'aframe-look-at-component';
import Atext from './components/Atext'
//import ArrText from './components/ArrText'
//import Aimage from './components/Aimage'
//import Acursor from './components/Acursor'
//import AtextGeo from './components/AtextGeo'
//import Accelerometer from './components/Accelerometer'
import Camera from './components/Camera'
import MediaCamera from './components/MediaCamera'


class AFrameRenderer extends Component {
  constructor(props) {
    super(props);
    this.AframeDiv = React.createRef();

    this.state = {
      inno_1: null,
      camPosition: [0,0,0],
      poiList: []
    }
  }

  componentDidMount () {
    console.log(this.updateObjPosition(43.592941,1.447373))
  }

  getCamPosition = (e) => {
    this.setState({
      camPosition: e
    })
  }

  getPoiList = (e) => {
    console.log("LISTPOI:",e)
    this.setState({
      poiList: e
    })
  }

  getObjRotation = (e) => {
    //Math.atan2(Math.sin(Math.radians(angledest) - Math.radians(angleplayer)), Math.cos(Math.radians(angledest) - Math.radians(angleplayer)))
  }

  updateObjPosition = (lat,lng) => {
    let prj = projector.project(lat, lng, 0)
    let ox = this.state.camPosition[0] - prj[0]
    let oz = this.state.camPosition[1] - prj[1]
    if(oz > 0){
      return `${ox} 0 -${oz}`
    } else {
      let oza = Math.abs(oz)
      return `${ox} 0 ${oza}`
    }
    
  }
  
  render() {
    return (
      <a-scene ar cursor="rayOrigin: mouse" style={sceneStyle}> 
        <MediaCamera />
        <Camera getCamPosition={this.getCamPosition} getPoiList={this.getPoiList}/>

        {/* Affichage des POI de openstreetmap */}
        {this.state.poiList.map(e => 
        <Atext 
        key={e._id.toString()}
        position={this.updateObjPosition(e.location.coordinates[1],e.location.coordinates[0])} 
        value={e.name}
        look-at="[camera]"
        width="300"
        color= "#F8F609" 
        />)}
        
        {/* Affichage de POI personnalisés */}
        <Atext position={this.updateObjPosition(43.050646,0.721948)} value="Fontaine" look-at="[camera]" width="15" color= "#0F25CE"/>
        <Atext position={this.updateObjPosition(43.050740,0.721487)} value="Eglise" look-at="[camera]" width="15" color= "#0F25CE"/>
        <Atext position={this.updateObjPosition(43.050305,0.722297)} value="Cour" look-at="[camera]" width="15" color= "#0F25CE"/>
        <Atext position={this.updateObjPosition(43.050246,0.722458)} value="Voisine" look-at="[camera]" width="15" color= "#0F25CE"/>

        <Atext position={this.updateObjPosition(43.593967,1.447539)} value="Dans la rue" look-at="[camera]" width="15" color= "#0F25CE"/>
        <Atext position={this.updateObjPosition(43.594340,1.447813)} value="Tramway Jardin Royal" look-at="[camera]" width="15" color= "#0F25CE"/>

        <Atext position={this.updateObjPosition(43.592941,1.447373)} value="Fontaine" look-at="[camera]" width="15" color= "#0F25CE"/>
        <Atext position={this.updateObjPosition(43.593932,1.448156)} value="LE VILLAGE" look-at="[camera]" width="50" color= "#0F25CE"/>
        {/* <Aimage 
          position={this.updateObjPosition(43.592941,1.447373)} 
          rotation="0 0 0" 
          width="10" 
          height="2.5"
        /> */}
      </a-scene>
      
    );
  }
}

const sceneStyle = {
  height: "100%",
  width: "100%",
  zIndex: 1,
  backgroundColor: "transparent"
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