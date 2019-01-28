import React from 'react';
import PropTypes from 'prop-types';

const BtnMenu = (props) => {
  const { handleOpenMenu } = props;
  return (
    <button type="button" onClick={() => handleOpenMenu()} />
  );
};

BtnMenu.propTypes = {
  handleOpenMenu: PropTypes.func,
};

BtnMenu.defaultProps = {
  handleOpenMenu: () => {},
};

export default BtnMenu;
