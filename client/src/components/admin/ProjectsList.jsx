import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getProjectList } from '../../redux/projects/projectsReducer';
import { getToolList } from '../../redux/tools/toolsReducer';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import ProjectItem from './ProjectItem';

/* eslint no-underscore-dangle: 0 */

const ProjectList = ({ modalShowHandler }) => {
  const dispatch = useDispatch();
  const toolListR = useSelector((state) => state.toolListReducer);
  const { loading: loadingTool, error: errorTool } = toolListR;
  const { loading, error, projectList } = useSelector((state) => state.projectListReducer);
  const projectDeleteR = useSelector((state) => state.projectDeleteReducer);
  const { loading: loadingDelete, error: errorDelete } = projectDeleteR;

  useEffect(() => {
    dispatch(getToolList());
  }, []);

  useEffect(() => {
    if (!loadingTool && !errorTool) dispatch(getProjectList());
  }, [loadingTool]);

  return (
    <>
      {loading && (<LoadingBox />)}
      {!loading && error && (
        <MessageBox variant="danger">{error.map((err) => <span key={uuidv4()}>{err}</span>)}</MessageBox>
      )}
      {!loading && !error && (
        <>
          <h1 className="section__title">PROJECTS</h1>
          <div className="section__submenu">
            <button type="button" className="btn" onClick={() => modalShowHandler('add-project')}>NEW PROJECT</button>
          </div>
          <div className="action__state">
            {loadingDelete && <LoadingBox />}
            {!loadingDelete && errorDelete && (
              <MessageBox variant="danger">{errorDelete.map((err) => <span key={uuidv4()}>{err}</span>)}</MessageBox>
            )}
          </div>
          <ul className="records__list">
            {
              projectList && projectList.map((py) => (
                <ProjectItem key={py._id} pyItem={py} modalShowHandler={modalShowHandler} />
              ))
            }
            {
              projectList && projectList.length === 0 && (
                <h3>
                  There are not projects yet.
                  Create a new one by clicking on the &quot;NEW PROJECT&quot; button.
                </h3>
              )
            }
          </ul>
        </>
      )}
    </>
  );
};

ProjectList.propTypes = {
  modalShowHandler: PropTypes.func.isRequired,
};

export default ProjectList;
