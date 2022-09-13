import { PropTypes } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { updateProject } from '../../redux/projects/projectsReducer';
import getImageAWSUrl from '../../helpers/getImageAWSUrl';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

/* eslint no-underscore-dangle: 0 */

const EditProject = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { toolList } = useSelector((state) => state.toolListReducer);
  const { loading, error, project } = useSelector((state) => state.projectDetailsReducer);
  const projectUpdateR = useSelector((state) => state.projectUpdateReducer);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = projectUpdateR;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
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
    if (project) {
      setTitle(project.title);
      setCategory(project.category);
      setConcept(project.concept);
      setTools(project.tools);
      setFonts(project.fonts.join(', '));
      setColors(project.colors.join(', '));
      setMainImage(null);
      setConceptImage(null);
      setLiveUrl(project.live_url);
      setSourceUrl(project.source_url);
    }
  }, [project]);

  useEffect(() => {
    if (successUpdate) {
      setMainImage(null);
      setConceptImage(null);
      mainImageRef.current.value = null;
      conceptImageRef.current.value = null;
      handleClose();
    }
  }, [successUpdate]);

  const handleChange = (e) => {
    setTools(Array.from(e.target.selectedOptions, (item) => item.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newProject = {
      title,
      category,
      concept,
      tools,
      fonts: fonts.split(',').map((f) => f.trim()),
      colors: colors.split(',').map((c) => c.trim()),
      main_image: project.main_image,
      concept_image: project.concept_image,
      live_url: liveUrl,
      source_url: sourceUrl,
      highlighted: project.highlighted,
    };

    if (mainImage !== null) {
      const mainImageUrl = await getImageAWSUrl(mainImage);
      newProject = { ...newProject, main_image: mainImageUrl.url.split('?')[0] };
    }

    if (conceptImage !== null) {
      const conceptImageUrl = await getImageAWSUrl(conceptImage);
      newProject = { ...newProject, concept_image: conceptImageUrl.url.split('?')[0] };
    }
    dispatch(updateProject(project._id, newProject));
  };

  const buildSelectOptions = (toolObj) => {
    if (tools && tools.find((toolId) => toolId === toolObj._id)) {
      return (<option key={toolObj._id} value={toolObj._id} defaultChecked>{toolObj.name}</option>);
    } return (<option key={toolObj._id} value={toolObj._id}>{toolObj.name}</option>);
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
            <h2 className="form-title">EDIT PROJECT</h2>
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
                  toolList && toolList.map((tool) => buildSelectOptions(tool))
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

EditProject.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default EditProject;
