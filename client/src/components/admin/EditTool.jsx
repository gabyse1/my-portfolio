import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTool } from '../../redux/tools/toolsReducer';
import getImageAWSUrl from '../../helpers/getImageAWSUrl';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

/* eslint no-underscore-dangle: 0 */

const EditTool = ({ handleClose }) => {
  const dispatch = useDispatch();

  const { loading, error, tool } = useSelector((state) => state.toolDetailsReducer);
  const toolUpdateR = useSelector((state) => state.toolUpdateReducer);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = toolUpdateR;

  const [name, setName] = useState('');
  const [icon, setIcon] = useState(null);
  const iconRef = useRef();

  useEffect(() => {
    if (tool) {
      setName(tool.name);
      setIcon(null);
    }
  }, [tool]);

  useEffect(() => {
    if (successUpdate) {
      setIcon(null);
      iconRef.current.value = null;
      handleClose();
    }
  }, [successUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newTool = { name, icon: tool.icon };
    if (icon !== null) {
      const iconUrl = await getImageAWSUrl(icon);
      newTool = { ...newTool, icon: iconUrl.url.split('?')[0] };
    }
    dispatch(updateTool(tool._id, newTool));
  };

  return (
    <>
      {loading && (<LoadingBox />)}
      {!loading && error && (
        <MessageBox variant="danger">{error.map((err) => <span key={uuidv4()}>{err}</span>)}</MessageBox>
      )}
      {!loading && !error && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h2 className="form-title">EDIT TOOL</h2>
          </div>
          <div className="form-group">
            <label htmlFor="name">
              name
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="icon">
              Icon
              <input
                type="file"
                className="form-control"
                name="icon"
                id="icon"
                accept="image/*"
                ref={iconRef}
                onChange={(e) => setIcon(e.target.files[0])}
              />
            </label>
          </div>
          <div className="form-group form-group-buttons">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="form-group">
            {loadingUpdate && <LoadingBox />}
            {!loadingUpdate && errorUpdate && (
              <MessageBox variant="danger">
                { errorUpdate.map((err) => <span key={uuidv4()}>{err}</span>) }
              </MessageBox>
            )}
          </div>
        </form>
      )}
    </>
  );
};

EditTool.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default EditTool;
