import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as MenuSvgIcon } from '../img/bars-solid.svg';

const BtnMenu = (props) => {
  const { handleSubmit } = props;
  return (
    <button type="button" className="btn btn-light BtnMenu" onClick={handleSubmit}>
      <MenuSvgIcon />
    </button>
  );
};

BtnMenu.propTypes = {
  handleSubmit: PropTypes.func,
};

BtnMenu.defaultProps = {
  handleSubmit: () => {},
};

export default BtnMenu;
