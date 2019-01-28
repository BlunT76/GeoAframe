import React, { Component } from 'react';
import Webcam from 'react-webcam';

const videoContainer = {
  display: 'block',
  width: '100%',
  height: 'auto',
  overflow: 'none',
  zIndex: '0',
};

class MediaCamera extends Component {
  render() {
    const videoConstraints = {
      facingMode: 'environment',
    };
    console.log('Width: ', window.innerWidth, 'height: ', window.innerHeight);
    return (
      <Webcam
        style={videoContainer}
        audio={false}
        // width={window.innerWidth}
        // height={window.innerHeight}
        videoConstraints={videoConstraints}
        ref={node => (this.webcam = node)}
      />
    );
  };
}

export default MediaCamera;
