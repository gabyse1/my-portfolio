/* eslint no-underscore-dangle: 0 */

const baseURL = `${process.env.REACT_APP_PORTFOLIO_SERVER}/api/projects`;

const PROJECT_LIST_REQUEST = 'PROJECT_LIST_REQUEST';
const PROJECT_LIST_SUCCESS = 'PROJECT_LIST_SUCCESS';
const PROJECT_LIST_FAIL = 'PROJECT_LIST_FAIL';
const PROJECT_ADD_REQUEST = 'PROJECT_ADD_REQUEST';
const PROJECT_ADD_SUCCESS = 'PROJECT_ADD_SUCCESS';
const PROJECT_ADD_FAIL = 'PROJECT_ADD_FAIL';
const PROJECT_DETAILS_REQUEST = 'PROJECT_DETAILS_REQUEST';
const PROJECT_DETAILS_SUCCESS = 'PROJECT_DETAILS_SUCCESS';
const PROJECT_DETAILS_FAIL = 'PROJECT_DETAILS_FAIL';
const PROJECT_UPDATE_REQUEST = 'PROJECT_UPDATE_REQUEST';
const PROJECT_UPDATE_SUCCESS = 'PROJECT_UPDATE_SUCCESS';
const PROJECT_UPDATE_FAIL = 'PROJECT_UPDATE_FAIL';
const PROJECT_DELETE_REQUEST = 'PROJECT_DELETE_REQUEST';
const PROJECT_DELETE_SUCCESS = 'PROJECT_DELETE_SUCCESS';
const PROJECT_DELETE_FAIL = 'PROJECT_DELETE_FAIL';

const getProjectList = () => async (dispatch) => {
  dispatch({ type: PROJECT_LIST_REQUEST });

  await fetch(baseURL)
    .then((response) => {
      if (response.status >= 500 && response.status <= 599) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (!data.message) {
        dispatch({
          type: PROJECT_LIST_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: PROJECT_LIST_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PROJECT_LIST_FAIL,
        payload: [error.message],
      });
    });
};

const getProjectDetails = (pyId) => async (dispatch) => {
  dispatch({ type: PROJECT_DETAILS_REQUEST, payload: pyId });

  await fetch(`${baseURL}/${pyId}`)
    .then((response) => {
      if (response.status >= 500 && response.status <= 599) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (!data.message) {
        dispatch({
          type: PROJECT_DETAILS_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: PROJECT_DETAILS_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PROJECT_DETAILS_FAIL,
        payload: [error.message],
      });
    });
};

const addProject = (project) => async (dispatch, getState) => {
  dispatch({ type: PROJECT_ADD_REQUEST, payload: project });

  const { userSigninReducer: { userInfo } } = getState();

  await fetch(baseURL, {
    method: 'POST',
    body: JSON.stringify(project),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      authorization: `gabyse ${userInfo.accessToken}`,
    },
  })
    .then((response) => {
      if (response.status >= 500 && response.status <= 599) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (!data.message) {
        dispatch({
          type: PROJECT_ADD_SUCCESS,
          payload: data,
        });
        dispatch(getProjectList());
      } else {
        dispatch({
          type: PROJECT_ADD_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PROJECT_ADD_FAIL,
        payload: [error.message],
      });
    });
};

const updateProject = (pyId, fields) => async (dispatch, getState) => {
  dispatch({ type: PROJECT_UPDATE_REQUEST, payload: { pyId, fields } });

  const { userSigninReducer: { userInfo } } = getState();

  await fetch(`${baseURL}/edit/${pyId}`, {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      authorization: `gabyse ${userInfo.accessToken}`,
    },
  })
    .then((response) => {
      if (response.status >= 500 && response.status <= 599) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (!data.message) {
        dispatch({
          type: PROJECT_UPDATE_SUCCESS,
          payload: data,
        });
        dispatch(getProjectList());
      } else {
        dispatch({
          type: PROJECT_UPDATE_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PROJECT_UPDATE_FAIL,
        payload: [error.message],
      });
    });
};

const deleteProject = (pyId) => async (dispatch, getState) => {
  dispatch({ type: PROJECT_DELETE_REQUEST, payload: pyId });

  const { userSigninReducer: { userInfo } } = getState();

  await fetch(`${baseURL}/delete/${pyId}`, {
    method: 'DELETE',
    headers: { authorization: `gabyse ${userInfo.accessToken}` },
  })
    .then((response) => {
      if (response.status >= 500 && response.status <= 599) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (!data.message) {
        dispatch({
          type: PROJECT_DELETE_SUCCESS,
          payload: data,
        });
        dispatch(getProjectList());
      } else {
        dispatch({
          type: PROJECT_DELETE_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PROJECT_DELETE_FAIL,
        payload: [error.message],
      });
    });
};

const projectListReducer = (state = { loading: true, projectList: [] }, action) => {
  switch (action.type) {
    case PROJECT_LIST_REQUEST:
      return { loading: true };
    case PROJECT_LIST_SUCCESS:
      return { loading: false, projectList: action.payload };
    case PROJECT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const projectDetailsReducer = (state = { loading: true, project: {} }, action) => {
  switch (action.type) {
    case PROJECT_DETAILS_REQUEST:
      return { loading: true };
    case PROJECT_DETAILS_SUCCESS:
      return { loading: false, project: action.payload };
    case PROJECT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const projectAddReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_ADD_REQUEST:
      return { loading: true };
    case PROJECT_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        project: action.payload,
      };
    case PROJECT_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const projectUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_UPDATE_REQUEST:
      return { loading: true };
    case PROJECT_UPDATE_SUCCESS:
      return { loading: false, success: true, project: action.payload };
    case PROJECT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const projectDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_DELETE_REQUEST:
      return { loading: true };
    case PROJECT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PROJECT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export {
  getProjectList,
  getProjectDetails,
  addProject,
  updateProject,
  deleteProject,
  projectListReducer,
  projectDetailsReducer,
  projectAddReducer,
  projectUpdateReducer,
  projectDeleteReducer,
};
