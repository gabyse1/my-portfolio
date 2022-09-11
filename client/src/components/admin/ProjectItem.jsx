import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectDetails, updateProject, deleteProject } from '../../redux/projects/projectsReducer';

/* eslint no-underscore-dangle: 0 */

const ProjectItem = ({ pyItem, modalShowHandler }) => {
  const dispatch = useDispatch();
  const { toolList } = useSelector((state) => state.toolListReducer);

  const [highlighted, setHighlighted] = useState(pyItem.highlighted);

  const toggleHighlighted = () => {
    dispatch(updateProject(pyItem._id, { highlighted: !highlighted }));
    setHighlighted(!highlighted);
  };

  const getToolObject = (id) => toolList.find((t) => t._id === id);

  const displayProjectModal = () => {
    dispatch(getProjectDetails(pyItem._id));
    modalShowHandler('update-project', pyItem._id);
  };

  const deleteHandle = () => dispatch(deleteProject(pyItem._id));

  return (
    <li className="list__item">
      <div className="list__item-title">
        <h2>{ pyItem.title }</h2>
      </div>
      <div className="list__item-admin">
        <div className="item__group">
          <label htmlFor={pyItem._id} className="label-highlighted">
            HIGHLIGHTED
            <input type="checkbox" className="input-highlighted" name={pyItem._id} id={pyItem._id} checked={highlighted} onChange={toggleHighlighted} />
            <span className="checkbox-mock" />
          </label>
        </div>
        <div className="item__group item__group-buttons">
          <button type="button" className="btn" onClick={displayProjectModal}>
            UPDATE
          </button>
          <button type="button" className="btn" onClick={deleteHandle}>
            DELETE
          </button>
        </div>
      </div>
      <div className="list__item-details">
        <div className="item__column">
          <div className="item__group">
            <h3 className="item__group-label">Category</h3>
            <p>{ pyItem.category }</p>
          </div>
          <div className="item__group">
            <h3 className="item__group-label">Concept</h3>
            <p>{ pyItem.concept }</p>
          </div>
        </div>
        <div className="item__column">
          <div className="item__group">
            <h3 className="item__group-label">Tools</h3>
            <ul className="list list-horizontal">
              {
                pyItem.tools.map((tool) => (
                  <li key={uuidv4()} className="list-item icon__box">
                    <img src={getToolObject(tool).icon} alt="tool icon" />
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="item__group">
            <h3 className="item__group-label">Fonts</h3>
            <ul className="list">
              {
                pyItem.fonts.map((font) => <li key={uuidv4()} className="list-item">{font}</li>)
              }
            </ul>
          </div>
          <div className="item__group">
            <h3 className="item__group-label">Colors</h3>
            <ul className="list list__colors">
              {
                pyItem.colors.map((color) => (
                  <li key={uuidv4()} className="list-item">
                    <div className="color-sample" style={{ background: color }} />
                    <span className="calor-name">{color}</span>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="item__group item__group-buttons">
            <a href={pyItem.live_url} target="_blank" className="btn link__btn" aria-label={'link to '.concat(pyItem.title, ' ', pyItem.category)} rel="noreferrer">Live Demo</a>
            <a href={pyItem.source_url} target="_blank" className="btn link__btn" aria-label={'link to '.concat(pyItem.title, ' github repository')} rel="noreferrer">Source</a>
          </div>
        </div>
        <div className="item__column item__column-images">
          <div className="item__group">
            <h3 className="item__group-label">Main image</h3>
            <div className="image__box">
              <img src={pyItem.main_image} alt={''.concat(pyItem.title, ' main image')} />
            </div>
          </div>
          <div className="item__group">
            <h3 className="item__group-label">Concept image</h3>
            <div className="image__box">
              <img src={pyItem.concept_image} alt={''.concat(pyItem.title, ' concept image')} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

ProjectItem.propTypes = {
  pyItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    concept: PropTypes.string.isRequired,
    tools: PropTypes.arrayOf(PropTypes.string).isRequired,
    fonts: PropTypes.arrayOf(PropTypes.string).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    main_image: PropTypes.string.isRequired,
    concept_image: PropTypes.string.isRequired,
    live_url: PropTypes.string.isRequired,
    source_url: PropTypes.string.isRequired,
    highlighted: PropTypes.bool.isRequired,
  }).isRequired,
  modalShowHandler: PropTypes.func.isRequired,
};

export default ProjectItem;
