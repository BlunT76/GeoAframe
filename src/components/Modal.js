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
    handleNavigate,
    id,
  } = props;

  return (
    <div>
      <Modal
        poiInfo={poiInfo}
        open={open}
        onClose={() => handleCloseModal()}
        center
        classNames={{
          // overlay: styles.overlay,
          modal: { background: 'red' },
        }}
      >
        <h2>{msg}</h2>
        <button type="button" onClick={() => handleNavigate(msg, id)}>Navigate</button>
      </Modal>
    </div>
  );
};

Amodal.propTypes = {
  poiInfo: PropTypes.string,
  open: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  msg: PropTypes.string,
  handleNavigate: PropTypes.func,
  id: PropTypes.number,
};

Amodal.defaultProps = {
  poiInfo: '',
  open: '0 0 0',
  handleCloseModal: () => {},
  msg: '',
  handleNavigate: () => {},
  id: 0,
};

export default Amodal;
