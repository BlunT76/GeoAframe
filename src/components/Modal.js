import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import styles from '../css/custom-styling.css';

const Amodal = (props) => {
  const {
    poiInfo,
    open,
    handleCloseModal,
    msg,
    handleNavigate,
    id,
    list,
  } = props;

  return (
    <div>
      <Modal
        poiInfo={poiInfo}
        open={open}
        onClose={() => handleCloseModal()}
        center
        classNames={{
          overlay: styles.customOverlay,
          modal: styles.customModal,
        }}
      >
        <div className="m-4">
          <h2>{msg}</h2>
          <button type="button" className="btn btn-outline-light btn-lg btn-block mt-5" onClick={() => handleNavigate(msg, id, list)}>Navigate</button>
        </div>
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
  list: PropTypes.string,
};

Amodal.defaultProps = {
  poiInfo: '',
  open: '0 0 0',
  handleCloseModal: () => {},
  msg: '',
  handleNavigate: () => {},
  id: 0,
  list: '',
};

export default Amodal;
