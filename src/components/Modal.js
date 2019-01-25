import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import styles from '../index.css';

const Amodal = (props) => {
  const {
    poiInfo,
    open,
    handleCloseModal,
    msg,
  } = props;

  return (
    <div>
      <Modal
        poiInfo={poiInfo}
        open={open}
        onClose={() => handleCloseModal()}
        center
        classNames={{
          //overlay: styles.overlay,
          modal: { background: 'red' },
        }}
      >
        <h2>{msg}</h2>
      </Modal>
    </div>
  );
};

Amodal.propTypes = {
  poiInfo: PropTypes.string,
  open: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  msg: PropTypes.string,
};

Amodal.defaultProps = {
  poiInfo: '',
  open: '0 0 0',
  handleCloseModal: () => {},
  msg: '',
};

export default Amodal;
