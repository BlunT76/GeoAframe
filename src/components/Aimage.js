import React from 'react';
import PropTypes from 'prop-types';
import 'aframe-look-at-component';

const Aimage = (props) => {
  const {
    value, width, height, position,
  } = props;
  return (
    <a-entity>
      <a-image
        src="./images/innoside.png"
        value={value}
        width={width}
        height={height}
        position={position}
        look-at="[camera]"
      />
    </a-entity>
  );
};

Aimage.propTypes = {
  value: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  position: PropTypes.string,
};

Aimage.defaultProps = {
  value: '',
  width: '0',
  height: '0',
  position: '0 0 0',
};

export default Aimage;
