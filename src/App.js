//react imports
import React, {Component} from 'react';
import { render } from 'react-dom'
import './App.css';
//AR.js imports
import { AFrameRenderer, Marker } from 'react-web-ar'
//capacitor imports
import {Plugins} from '@capacitor/core';
const {Geolocation, Camera} = Plugins;


class App extends Component {

    constructor(props) {
        super(props);
        this.startWatch = this
            .startWatch
            .bind(this);

    }

    state = {
        lat: null,
        lng: null
    }

    async startWatch() {

        const watch = Geolocation.watchPosition({}, (position, err) => {
          console.log(position)
          if(!err)
          this.setState({lat: position.coords.latitude, lng: position.coords.longitude})
        })

    }

    componentWillUnmount(){
      //Geolocation.clearWatch(watch)
    }
    render() {
        return (
            <div className="App">
            <AFrameRenderer
                arToolKit={{ sourceType: 'webcam', sourceUrl: './images/hiro_marker.png'}}
                stats
            >
                <header className="App-header">
                    <h1>Test react and capacitor</h1>
                    <button onClick={this.startWatch}>
                        StartWatch</button>
                    <p>lat: {this.state.lat}</p>
                    <p>lng: {this.state.lng}</p>
                </header>
                
                <Marker parameters={{ preset: 'hiro' }}>
                <a-box color='pink' material='opacity: 1;' position="0 0.003 0" scale='0.4 0.4 0.4'>
                    <a-animation attribute="rotation" to="360 0 0" dur="5000" easing="linear" repeat="indefinite" />
                </a-box>
                </Marker>
                
            </AFrameRenderer>
          </div>
        );
    }
}

export default App;
