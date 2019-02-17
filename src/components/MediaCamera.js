import React, { PureComponent } from 'react';
import Webcam from 'react-webcam';
import '../css/style.css';

class MediaCamera extends PureComponent {
  setRef = (webcam) => {
    this.webcam = webcam;
  };

  render() {
    const videoConstraints = {
      facingMode: 'environment',
    };

    return (
      <Webcam
        className="videoContainer"
        audio={false}
        videoConstraints={videoConstraints}
        ref={this.setRef}
      />
    );
  }
}

export default MediaCamera;
