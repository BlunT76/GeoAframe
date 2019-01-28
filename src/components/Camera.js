import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import 'aframe-look-at-component';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    const { roty } = this.props;
    const rotation = `0 ${roty - 180} 0`;
    return (
      <a-entity>
        <a-entity
          id="camera"
          ref={this.myRef}
          camera="active: true"
          // look-controls
          wasd-controls
          // listener
          near="0.005"
          far="1000"
          userHeight="1.6"
          rotation={rotation}
        >
          {/* <a-cursor /> */}
        </a-entity>
      </a-entity>
    );
  }
}

Camera.propTypes = {
  roty: PropTypes.number,
};

Camera.defaultProps = {
  roty: 0,
};

export default Camera;
