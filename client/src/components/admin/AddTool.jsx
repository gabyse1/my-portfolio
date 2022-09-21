import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTool } from '../../redux/tools/toolsReducer';
import getImageAWSUrl from '../../helpers/getImageAWSUrl';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';

const AddTool = ({ handleClose }) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.toolAddReducer);

  const [name, setName] = useState('');
  const [icon, setIcon] = useState(null);
  const iconRef = useRef();

  useEffect(() => {
    if (success) {
      setName('');
      setIcon(null);
      iconRef.current.value = null;
      handleClose();
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // post request to my server to store any extra data
    let newTool = { name, icon };
    if (icon !== null) {
      const iconUrl = await getImageAWSUrl(icon);
      newTool = { ...newTool, icon: iconUrl.url.split('?')[0] };
    }
    dispatch(addTool(newTool));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <h2 className="form-title">NEW TOOL</h2>
      </div>
      <div className="form-group">
        <label htmlFor="name">
          Name
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
            required
          />
        </label>
      </div>
      <div className="form-group form-group-buttons">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <div className="form-group">
        {loading && <LoadingBox />}
        {!loading && error && (
          <MessageBox variant="danger">
            { error.map((err) => <span key={uuidv4()}>{err}</span>) }
          </MessageBox>
        )}
      </div>
    </form>
  );
};

AddTool.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default AddTool;
