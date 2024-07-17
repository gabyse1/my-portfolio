import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteTool, getToolDetails } from '../../redux/tools/toolsReducer';

/* eslint no-underscore-dangle: 0 */

const ToolItem = ({ toolItem, modalShowHandler }) => {
  const dispatch = useDispatch();

  const displayToolModal = () => {
    dispatch(getToolDetails(toolItem._id));
    modalShowHandler('update-tool', toolItem._id);
  };

  const deleteHandle = () => dispatch(deleteTool(toolItem._id));

  return (
    <li className="list__item">
      <div className="item__group item__group-description">
        <div className="list__item-title">
          <h2>{ toolItem.name }</h2>
        </div>
        <div className="list__item-tool-icon">
          <img src={toolItem.icon} alt={''.concat(toolItem.name, ' icon')} />
        </div>
      </div>
      <div className="item__group item__group-buttons">
        <button type="button" className="btn" onClick={displayToolModal}>
          UPDATE
        </button>
        <button type="button" className="btn" onClick={deleteHandle}>
          DELETE
        </button>
      </div>
    </li>
  );
};

ToolItem.propTypes = {
  toolItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  modalShowHandler: PropTypes.func.isRequired,
};

export default ToolItem;
