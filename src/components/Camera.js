import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    const { roty, control } = this.props;
    console.log({ control });

    const rotation = `0 ${roty - 180} 0`;
    return (
      <a-entity>
        <a-entity
          id="camera"
          ref={this.myRef}
          camera="active: true"
          look-controls={`enabled: ${control}`}
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
  control: PropTypes.bool,
};

Camera.defaultProps = {
  roty: 0,
  control: true,
};

export default Camera;
