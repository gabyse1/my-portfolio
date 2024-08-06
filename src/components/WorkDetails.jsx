import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import AnimatedMouse from './icons/AnimatedMouse';

/* eslint no-underscore-dangle: 0 */

const WorkDetails = ({ isOpen, handleClose }) => {
  const { toolList } = useSelector((state) => state.toolListReducer);
  const { loading, error, project } = useSelector((state) => state.projectDetailsReducer);

  const [detailsModal, setDetailsModal] = useState('');

  const getToolIcon = (toolId) => toolList.filter((t) => t._id === toolId)[0].icon;

  const removeAnimationEnd = () => {
    const modalBox = document.getElementById('modal__box-details');
    const modalBoxContainer = document.getElementById('modal__container');
    setDetailsModal('');
    modalBox.removeEventListener('animationend', removeAnimationEnd);
    modalBoxContainer.removeEventListener('animationend', removeAnimationEnd);
    // modalBox.style.animation = '';
  };

  const detailsModalClose = () => {
    if (detailsModal !== '') {
      const modalBox = document.getElementById('modal__box-details');
      const modalBoxContainer = document.getElementById('modal__container');
      modalBoxContainer.style.animation = 'fadeOut 250ms ease-in-out 0ms forwards';
      modalBox.style.animation = 'fadeOut 500ms ease-in-out 250ms forwards';
      setTimeout(() => {
        modalBox.addEventListener('animationend', removeAnimationEnd);
        modalBoxContainer.addEventListener('animationend', removeAnimationEnd);
      }, 750);
    }
  };

  useEffect(() => {
    if (isOpen && !loading) {
      const modalBox = document.getElementById('modal__box-details');
      const modalBoxContainer = document.getElementById('modal__container');
      setDetailsModal('modal__box-open');
      modalBox.style.animation = 'fadeIn 250ms ease-in-out 0ms forwards';
      modalBoxContainer.style.animation = 'fadeIn 500ms ease-in-out 250ms forwards';
    } else if (detailsModal !== '') detailsModalClose();
  }, [isOpen, loading]);

  return (
    <>
      {
        !loading && !error && (
          <div className={`modal__box-details ${detailsModal}`} id="modal__box-details">
            <div className="modal__container" id="modal__container">
              <div className="details__head">
                <button type="button" className="btn__transparent btn__back" onClick={handleClose}>
                  <BsArrowLeft />
                  {'  '}
                  BACK
                </button>
                <div className="image__box">
                  <img src={project.main_image} alt={`${project.title}'s work main`} />
                  <div className="image__box-shadow" />
                </div>
                <div className="description__box">
                  <h2 className="title">{project.title}</h2>
                  <span className="category">{project.category}</span>
                </div>
                <div className="icon__mouse">
                  <AnimatedMouse />
                </div>
              </div>
              <div className="details__body">
                <div className="body__group">
                  <span className="group__number">01</span>
                  <h3 className="group__heading">CONCEPT</h3>
                  <p className="group__text">{project.concept}</p>
                </div>
                <div className="body__group group__buttons">
                  <a href={project.live_url} target="_blank" rel="noreferrer" className="btn link__btn">LIVE DEMO</a>
                  <a href={project.source_url} target="_blank" rel="noreferrer" className="btn link__btn">SOURCE</a>
                </div>
                <div className="image__box">
                  <img src={project.concept_image} alt={`${project.title}'s work concept`} />
                </div>
                <div className="body__group">
                  <span className="group__number">02</span>
                  <h3 className="group__heading">TOOLS</h3>
                  <ul className="group__list list-horizontal">
                    {
                      project.tools.map((tid) => (
                        <li key={tid}><img src={getToolIcon(tid)} alt={tid} /></li>
                      ))
                    }
                  </ul>
                </div>
                <div className="body__group">
                  <span className="group__number">03</span>
                  <h3 className="group__heading">FONTS</h3>
                  <ul className="group__list list-vertical">
                    {
                      project.fonts.map((font) => (
                        <li key={uuidv4()}>{font}</li>
                      ))
                    }
                  </ul>
                </div>
                <div className="body__group">
                  <span className="group__number">04</span>
                  <h3 className="group__heading">COLORS</h3>
                  <ul className="group__list list-vertical">
                    {
                      project.colors.map((color) => (
                        <li key={uuidv4()}>
                          <div className="circle" style={{ backgroundColor: color }} />
                          {color}
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <button type="button" className="btn__transparent btn__back" onClick={handleClose}>
                  <BsArrowLeft />
                  {'  '}
                  BACK
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

WorkDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default WorkDetails;
