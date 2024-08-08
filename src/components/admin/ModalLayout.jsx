import { PropTypes } from 'prop-types';
import { GrClose } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import AddTool from './AddTool';
import EditTool from './EditTool';
import AddProject from './AddProject';
import EditProject from './EditProject';

const ModalLayout = ({
  isOpen, handleClose, modalType,
}) => {
  const [adminModal, setAdminModal] = useState('');

  const removeAnimationEnd = () => {
    const modalBox = document.getElementById('modal__box');
    setAdminModal('');
    modalBox.removeEventListener('animationend', removeAnimationEnd);
    modalBox.style.animation = '';
  };

  const adminModalClose = () => {
    if (adminModal !== '') {
      const modalBox = document.getElementById('modal__box');
      modalBox.style.animation = 'fadeOut 500ms ease-in-out 0ms forwards';
      setTimeout(() => {
        modalBox.addEventListener('animationend', removeAnimationEnd);
      }, 500);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const modalBox = document.getElementById('modal__box');
      setAdminModal('modal__open');
      modalBox.style.animation = 'fadeIn 500ms ease-in-out 0ms forwards';
    } else if (adminModal !== '') adminModalClose();
  }, [isOpen]);

  return (
    <div className={`modal__box ${adminModal}`} id="modal__box">
      <div className="modal__container">
        <div className="modal__header">
          <button type="button" aria-label="Close button" className="btn__transparent" onClick={handleClose}>
            <GrClose />
          </button>
        </div>
        <div className="modal__content">
          { (modalType === 'add-project') && <AddProject handleClose={handleClose} /> }
          { (modalType === 'update-project') && <EditProject handleClose={handleClose} /> }
          { (modalType === 'add-tool') && <AddTool handleClose={handleClose} /> }
          { (modalType === 'update-tool') && <EditTool handleClose={handleClose} /> }
        </div>
      </div>
    </div>
  );
};

ModalLayout.defaultProps = {
  modalType: '',
};

ModalLayout.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  modalType: PropTypes.string,
};

export default ModalLayout;
