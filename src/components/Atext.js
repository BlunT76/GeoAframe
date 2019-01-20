import React from 'react';
import PropTypes from 'prop-types';
import 'aframe-look-at-component';

const Atext = (props) => {
  const {
    value,
    width,
    color,
    position,
    rotation,
    handleOpenModal,
  } = props;

  const text = `value:${value}; width:${width}; align: center`;

  return (
    <a-entity
      onClick={() => handleOpenModal(value)}
      geometry="primitive: plane; height: 10; width: auto"
      material={color}
      text={`${text}`}
      position={position}
      rotation={rotation}
      look-at="[camera]"
    />
  );
};

Atext.propTypes = {
  value: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
  position: PropTypes.string,
  rotation: PropTypes.string,
  handleOpenModal: PropTypes.func,
};

Atext.defaultProps = {
  value: '',
  width: '0',
  color: 'transparent',
  position: '0 0 0',
  rotation: '0 0 0',
  handleOpenModal: () => {},
};

export default Atext;
