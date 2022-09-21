import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../../redux/projects/projectsReducer';
import getImageAWSUrl from '../../helpers/getImageAWSUrl';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';

/* eslint no-underscore-dangle: 0 */

const AddProject = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { toolList } = useSelector((state) => state.toolListReducer);
  const { loading, error, success } = useSelector((state) => state.projectAddReducer);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('website');
  const [concept, setConcept] = useState('');
  const [tools, setTools] = useState([]);
  const [fonts, setFonts] = useState('');
  const [colors, setColors] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [conceptImage, setConceptImage] = useState(null);
  const [liveUrl, setLiveUrl] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');

  const mainImageRef = useRef();
  const conceptImageRef = useRef();

  useEffect(() => {
    if (success) {
      setTitle('');
      setCategory('website');
      setConcept('');
      setTools([]);
      setFonts('');
      setColors('');
      setMainImage(null);
      setConceptImage(null);
      setLiveUrl('');
      setSourceUrl('');
      mainImageRef.current.value = null;
      conceptImageRef.current.value = null;
      handleClose();
    }
  }, [success]);

  const handleChange = (e) => {
    setTools(Array.from(e.target.selectedOptions, (item) => item.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // post request to my server to store any extra data
    let newProject = {
      title,
      category,
      concept,
      tools,
      fonts: fonts.split(',').map((f) => f.trim()),
      colors: colors.split(',').map((c) => c.trim()),
      main_image: mainImage,
      concept_image: conceptImage,
      live_url: liveUrl,
      source_url: sourceUrl,
    };
    if (mainImage !== null) {
      const mainImageUrl = await getImageAWSUrl(mainImage);
      newProject = { ...newProject, main_image: mainImageUrl.url.split('?')[0] };
    }

    if (conceptImage !== null) {
      const conceptImageUrl = await getImageAWSUrl(conceptImage);
      newProject = { ...newProject, concept_image: conceptImageUrl.url.split('?')[0] };
    }
    dispatch(addProject(newProject));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <h2 className="form-title">NEW PROJECT</h2>
      </div>
      <div className="form-group">
        <label htmlFor="title">
          Title
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="category">
          Category
          <select
            className="form-control"
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            required
          >
            <option value="website">Website</option>
            <option value="app">App</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="concept">
          Concept
          <textarea
            className="form-control"
            name="concept"
            id="concept"
            onChange={(e) => setConcept(e.target.value)}
            value={concept}
            rows="5"
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="tools">
          Tools
          <select
            className="form-control"
            name="tools"
            id="tools"
            onChange={handleChange}
            value={tools}
            multiple
            required
          >
            {
              toolList && toolList.map((tool) => (
                <option key={tool._id} value={tool._id}>{tool.name}</option>
              ))
            }
          </select>
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="fonts">
          Fonts (use &quot;,&quot; as separator)
          <input
            type="text"
            className="form-control"
            name="fonts"
            id="fonts"
            onChange={(e) => setFonts(e.target.value)}
            value={fonts}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="colors">
          Colors (use &quot;,&quot; as separator)
          <input
            type="text"
            className="form-control"
            name="colors"
            id="colors"
            onChange={(e) => setColors(e.target.value)}
            value={colors}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="main_image">
          Main Image
          <input
            type="file"
            className="form-control"
            name="main_image"
            id="main_image"
            accept="image/*"
            ref={mainImageRef}
            onChange={(e) => setMainImage(e.target.files[0])}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="concept_image">
          Concept Image
          <input
            type="file"
            className="form-control"
            name="concept_image"
            id="concept_image"
            accept="image/*"
            ref={conceptImageRef}
            onChange={(e) => setConceptImage(e.target.files[0])}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="live_url">
          Live Url
          <input
            type="url"
            className="form-control"
            name="live_url"
            id="live_url"
            onChange={(e) => setLiveUrl(e.target.value)}
            value={liveUrl}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="source_url">
          Source Url
          <input
            type="url"
            className="form-control"
            name="source_url"
            id="source_url"
            onChange={(e) => setSourceUrl(e.target.value)}
            value={sourceUrl}
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

AddProject.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default AddProject;
