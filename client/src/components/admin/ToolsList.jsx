import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToolList } from '../../redux/tools/toolsReducer';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import ToolItem from './ToolItem';

/* eslint no-underscore-dangle: 0 */

const ToolsList = ({ modalShowHandler }) => {
  const dispatch = useDispatch();
  const { loading, error, toolList } = useSelector((store) => store.toolListReducer);
  const toolDeleteR = useSelector((store) => store.toolDeleteReducer);
  const { loading: loadingDelete, error: errorDelete } = toolDeleteR;

  useEffect(() => {
    dispatch(getToolList());
  }, []);

  return (
    <>
      { loading && <LoadingBox /> }
      { !loading && error && (
        <MessageBox variant="danger">{error.map((err) => <span key={uuidv4()}>{err}</span>)}</MessageBox>
      )}
      {
        !loading && !error && (
          <>
            <h1 className="section__title">TOOLS</h1>
            <div className="section__submenu">
              <button type="button" className="btn" onClick={() => modalShowHandler('add-tool')}>NEW TOOL</button>
            </div>
            <div className="action__state">
              {loadingDelete && <LoadingBox />}
              {!loadingDelete && errorDelete && (
                <MessageBox variant="danger">{errorDelete.map((err) => <span key={uuidv4()}>{err}</span>)}</MessageBox>
              )}
            </div>
            <ul className="records__list records__list-tools">
              {
                toolList && toolList.map((tool) => (
                  <ToolItem key={tool._id} toolItem={tool} modalShowHandler={modalShowHandler} />
                ))
              }
              {
                toolList && toolList.length === 0 && (
                  <h3>
                    There are not tools yet.
                    Create a new one by clicking on the &quot;NEW TOOL&quot; button.
                  </h3>
                )
              }
            </ul>
          </>
        )
      }
    </>
  );
};

ToolsList.propTypes = {
  modalShowHandler: PropTypes.func.isRequired,
};

export default ToolsList;
