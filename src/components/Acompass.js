import React from 'react';
import PropTypes from 'prop-types';
import 'aframe-look-at-component';

const Acompass = (props) => {
  const { value, position, rotation } = props;
  return (
    <a-text value={value} position={position} width="50" rotation={rotation} />
  );
};

Acompass.propTypes = {
  value: PropTypes.string,
  position: PropTypes.string,
  rotation: PropTypes.string,
};

Acompass.defaultProps = {
  value: '',
  position: '0 0 0',
  rotation: '0 0 0',
};

export default Acompass;
