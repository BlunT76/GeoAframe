import React from 'react';
import PropTypes from 'prop-types';
import 'aframe-look-at-component';

const Atext = (props) => {
  const {
    value,
    width,
    height,
    color,
    position,
    rotation,
    handleOpenModal,
    id,
    list,
  } = props;

  const cone = position.split(' ');
  const conePosition = `${cone[0]} -10 ${cone[2]}`;

  return (
    <a-entity>
      <a-entity
        onClick={() => handleOpenModal(value, Number(id), list)}
        geometry={`primitive: plane; height: ${height * 2}; width: ${width / 2};`}
        material={color}
        text={`value:${value}; width: ${width}; height: ${height}; zOffset: 0.5; xOffset: 0.2;  align: center;`}
        position={position}
        rotation={rotation}
        look-at="[camera]"
        list={list}
      />
      <a-entity
        material={color}
        position={conePosition}
        geometry="primitive: cone; segments-radial: 4; segments-height: 1; radiusBottom: 0.01; radiusTop: 5; height: 10"
      />
    </a-entity>
  );
};

Atext.propTypes = {
  value: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  position: PropTypes.string,
  rotation: PropTypes.string,
  handleOpenModal: PropTypes.func,
  id: PropTypes.string,
  list: PropTypes.string,
};

Atext.defaultProps = {
  value: '',
  width: '0',
  height: '0',
  color: 'transparent',
  position: '0 0 0',
  rotation: '0 0 0',
  handleOpenModal: () => {},
  id: '',
  list: '',
};

export default Atext;
