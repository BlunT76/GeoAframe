import React from 'react';
import PropTypes from 'prop-types';

const BtnMenu = (props) => {
  const { handleSubmit } = props;
  return (
    <button type="button" className="btn btn-light BtnMenu" onClick={handleSubmit}>
      <svg size="5x" aria-hidden="true" data-prefix="fas" data-icon="bars" className="svg-inline--fa fa-bars fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
      </svg>
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
