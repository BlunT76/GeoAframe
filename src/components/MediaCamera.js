import React, { Component } from 'react';
import Webcam from 'react-webcam';

const videoContainer = {
  display: 'block',
  height: '100%',
  overflow: 'hidden',
  width: '100%',
  zIndex: '0',
};
class MediaCamera extends Component {
  render() {
    const videoConstraints = {
      facingMode: 'environment',
    };
    return (
      <Webcam
        style={videoContainer}
        audio={false}
        videoConstraints={videoConstraints}
        ref={node => (this.webcam = node)}
      />
    );
  }
}

export default MediaCamera;
