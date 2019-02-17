import React from 'react';
import PropTypes from 'prop-types';
import 'aframe-look-at-component';

const Acompass = props => <a-text {...props} width="50" />;

Acompass.propTypes = {
  value: PropTypes.string,
  color: PropTypes.string,
  position: PropTypes.string,
  rotation: PropTypes.string,
};

Acompass.defaultProps = {
  value: '',
  color: 'white',
  position: '0 0 0',
  rotation: '0 0 0',
};

export default Acompass;
