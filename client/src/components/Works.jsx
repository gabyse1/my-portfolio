import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import WorkDetails from './WorkDetails';
import { getProjectDetails } from '../redux/projects/projectsReducer';

/* eslint no-underscore-dangle: 0 */

const Works = ({ anim }) => {
  const dispatch = useDispatch();
  const { projectList } = useSelector((state) => state.projectListReducer);
  const [highlightedList, setHighlightedList] = useState([]);
  const [numSlides, setNumSlides] = useState(0);
  const [displayControls, setDisplayControls] = useState('');
  const [progPercent, setProgPercent] = useState(0);
  const [activeIndexSlide, setActiveIndexSlide] = useState(0);
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  // console.log('----------------------', numSlides);

  const resetProgBar = (nroSlides) => {
    if (nroSlides > 0) {
      const progThumb = document.getElementById('prog__thumb');
      progThumb.style.width = `${100 / nroSlides}%`;
      setProgPercent(100 / nroSlides);
    }
  };

  const restSlider = () => {
    if (highlightedList.length > 0) {
      let contIterations = 1;
      const pagSlider = document.getElementById('slides__container-pg');

      if (activeIndexSlide === 1) pagSlider.insertBefore(pagSlider.firstChild, null);
      else if (activeIndexSlide > 2) {
        while (contIterations < (activeIndexSlide - 1)) {
          pagSlider.insertBefore(pagSlider.lastChild, pagSlider.firstChild);
          contIterations += 1;
        }
      }
      pagSlider.style.marginLeft = '0%';

      resetProgBar(numSlides);
    }
  };

  useEffect(() => {
    const newList = projectList.filter((el) => el.highlighted === true);
    if (newList.length > 1) setDisplayControls('display__controls');
    setHighlightedList(newList);
  }, []);

  useEffect(() => {
    if (anim !== '') {
      const slidesContainer = document.getElementById('slides__container-py');
      const nroSlides = slidesContainer.childNodes.length;
      const slidesContainerPg = document.getElementById('slides__container-pg');
      slidesContainerPg.style.width = `${nroSlides * 100}%`;

      if (nroSlides > 2) {
        slidesContainerPg.insertBefore(slidesContainerPg.lastChild, slidesContainerPg.firstChild);
        slidesContainerPg.style.marginLeft = '-100%';
      }

      resetProgBar(nroSlides);
      setNumSlides(nroSlides);
      setActiveIndexSlide(1);
    } else if (activeIndexSlide > 0) restSlider();
  }, [anim]);

  const updateProgBar = (direction) => {
    const progThumb = document.getElementById('prog__thumb');
    let newPercent = progPercent;
    if (direction === 'next') {
      if (activeIndexSlide >= numSlides) newPercent = 100 / numSlides;
      else newPercent = ((activeIndexSlide + 1) * 100) / numSlides;
    }
    if (direction === 'prev') {
      if (activeIndexSlide <= 1) newPercent = 100;
      else newPercent = ((activeIndexSlide - 1) * 100) / numSlides;
    }

    setProgPercent(newPercent);
    progThumb.animate({ width: `${newPercent}%` }, 1000);
    setTimeout(() => {
      progThumb.style.width = `${newPercent}%`;
    }, 1000);
  };

  const updateActiveSlide = (direction) => {
    if (direction === 'next') {
      if (activeIndexSlide >= numSlides) setActiveIndexSlide(1);
      else setActiveIndexSlide(activeIndexSlide + 1);
    }
    if (direction === 'prev') {
      if (activeIndexSlide <= 1) setActiveIndexSlide(numSlides);
      else setActiveIndexSlide(activeIndexSlide - 1);
    }
  };

  const handlePrevNextS2 = () => {
    const slidesContainerPg = document.getElementById('slides__container-pg');
    slidesContainerPg.animate({ marginLeft: '-100%' }, 1000);
    setTimeout(() => {
      slidesContainerPg.insertBefore(slidesContainerPg.firstChild, null);
      slidesContainerPg.style.marginLeft = '0%';
    }, 1000);
  };

  const nextSlide = (nodeContainer) => {
    if (numSlides > 2) {
      const slidesContainer = nodeContainer;
      slidesContainer.animate({ marginLeft: '-200%' }, 1000);
      setTimeout(() => {
        slidesContainer.insertBefore(slidesContainer.firstChild, null);
        slidesContainer.style.marginLeft = '-100%';
      }, 1000);
    } else handlePrevNextS2();
  };

  const prevSlide = (nodeContainer) => {
    const slidesContainer = nodeContainer;
    if (numSlides > 2) {
      slidesContainer.animate({ marginLeft: '0%' }, 1000);
      setTimeout(() => {
        slidesContainer.insertBefore(slidesContainer.lastChild, slidesContainer.firstChild);
        slidesContainer.style.marginLeft = '-100%';
      }, 1000);
    } else handlePrevNextS2();
  };

  const handleNextSlide = () => {
    const slidesContainerPg = document.getElementById('slides__container-pg');
    updateActiveSlide('next');
    nextSlide(slidesContainerPg);
    updateProgBar('next');
  };

  const handlePrevSlide = () => {
    const slidesContainerPg = document.getElementById('slides__container-pg');
    updateActiveSlide('prev');
    prevSlide(slidesContainerPg);
    updateProgBar('prev');
  };

  const modalShowHandler = (e) => {
    e.preventDefault();
    dispatch(getProjectDetails(e.target.dataset.pyid));
    setModalDetailsOpen(true);
  };

  const modalCloseHandler = () => setModalDetailsOpen(false);

  return (
    <section className={`page__section works__section ${anim}`} id="works" data-index="2">
      <div className="section__container">
        <div className="slider__box">
          <div className="slides__container slides__container-py" id="slides__container-py">
            {
              highlightedList && highlightedList.map((py, index) => (
                py.highlighted && (
                  <div className={`slide slide__work ${(index + 1) === activeIndexSlide ? 'slide__active' : ''}`} key={py._id}>
                    <div className="image__box">
                      <img src={py.main_image} alt={`${py.title}`} />
                      <div className="image__box-shadow" />
                    </div>
                    <div className="description__box">
                      <h2 className="title">{py.title}</h2>
                      <span className="category">{py.category}</span>
                      <button type="button" className="btn btn__details" id={py._id} data-pyid={py._id} onClick={modalShowHandler}>DETAILS</button>
                    </div>
                  </div>
                )
              ))
            }
          </div>
          <div className={`slides__controls ${displayControls}`}>
            <button type="button" className="btn__transparent" onClick={handlePrevSlide}>
              <BsArrowLeft />
            </button>
            <div className="pagination">
              <div className="pag__current slider__box">
                <div className="slides__container" id="slides__container-pg">
                  {
                    highlightedList && highlightedList.map((py, index) => (
                      py.highlighted && (
                        <div key={py._id} className="slide">{index <= 8 ? `0${index + 1}` : (index + 1)}</div>
                      )
                    ))
                  }
                </div>
              </div>
              <div className="pag__progress">
                <div className="prog__track" />
                <div className="prog__thumb" id="prog__thumb" />
              </div>
              <div className="pag__total">{numSlides <= 9 ? `0${numSlides}` : numSlides}</div>
            </div>
            <button type="button" className="btn__transparent" onClick={handleNextSlide}>
              <BsArrowRight />
            </button>
          </div>
        </div>
      </div>
      <WorkDetails isOpen={modalDetailsOpen} handleClose={modalCloseHandler} />
    </section>
  );
};

Works.propTypes = {
  anim: PropTypes.string.isRequired,
};

export default Works;
