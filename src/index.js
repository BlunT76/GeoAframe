import React from 'react';
import ReactDOM from 'react-dom';
import Webcam from 'react-webcam'
import './index.css';
//import * as serviceWorker from './serviceWorker';
import AFrameRenderer from './App';

console.assert = (test, value) => { !test && console.trace('assert failed', value) }
ReactDOM.render(

<AFrameRenderer>
  

</AFrameRenderer>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

