//react imports
import React, {Component} from 'react';
import './App.css';
//capacitor imports
import {Plugins} from '@capacitor/core';
const {Geolocation, Camera} = Plugins;

class App extends Component {

    constructor(props) {
        super(props);
        this.showDeviceInfo = this
            .showDeviceInfo
            .bind(this);

    }

    state = {
        lat: null,
        lng: null
    }

    async showDeviceInfo() {

        const watch = Geolocation.watchPosition({}, (position, err) => {
          console.log(position)
          if(!err)
          this.setState({lat: position.coords.latitude, lng: position.coords.longitude})
        })

        //async takePicture() {
          const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            //resultType: CameraResultType.Uri
          });
       
        //console.log('Current', coordinates);
        //await this.setState({lat: coordinates.coords.latitude, lng: coordinates.coords.longitude})
    }

    componentWillUnmount(){
      //Geolocation.clearWatch(watch)
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Test react and capacitor</h1>
                    <button onClick={this.showDeviceInfo}>
                        Show Device Info</button>
                    <p>lat: {this.state.lat}</p>
                    <p>lng: {this.state.lng}</p>
                </header>

            </div>
        );
    }
}

export default App;
