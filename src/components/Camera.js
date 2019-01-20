import React, { Component } from 'react';
import 'aframe-look-at-component';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return (
      <a-entity>
        <a-entity
          id="camera"
          ref={this.myRef}
          camera="active: true"
          look-controls
          wasd-controls
          listener
          near="10"
          far="10000"
          userHeight="1.6"
          rotation="0 0 0"
        >
          <a-cursor />
        </a-entity>
      </a-entity>
    );
  }
}

export default Camera;
