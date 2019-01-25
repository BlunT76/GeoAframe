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

  const cone = position.split(' ');
  const conePosition = `${cone[0]} -1 ${cone[2]}`;

  return (
    <a-entity>
      <a-entity
        onClick={() => handleOpenModal(value)}
        geometry={`primitive: plane; height: 1; width: ${width / 2};`}
        material={color}
        text={`value:${value}; width: ${width}; height: 1;  align: center;`}
        position={position}
        rotation={rotation}
        look-at="[camera]"
      />
      {/* <a-entity
        onClick={() => handleOpenModal(value)}
        geometry="primitive: plane; "
        material={color}
        text="value: test; width: 10; align: center"
        position="0 0 -10"
        rotation={rotation}
        look-at="[camera]"
      /> */}
      <a-entity
        material={color}
        position={conePosition}
        geometry="primitive: cone; segmentsRadial: 4; radiusBottom: 0.01; radiusTop: 0.5; height: 1"
      />
    </a-entity>
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
