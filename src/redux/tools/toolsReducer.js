/* eslint no-underscore-dangle: 0 */

const baseURL = `${process.env.REACT_APP_PORTFOLIO_SERVER}/api/tools`;

const TOOL_LIST_REQUEST = 'TOOL_LIST_REQUEST';
const TOOL_LIST_SUCCESS = 'TOOL_LIST_SUCCESS';
const TOOL_LIST_FAIL = 'TOOL_LIST_FAIL';
const TOOL_ADD_REQUEST = 'TOOL_ADD_REQUEST';
const TOOL_ADD_SUCCESS = 'TOOL_ADD_SUCCESS';
const TOOL_ADD_FAIL = 'TOOL_ADD_FAIL';
const TOOL_DETAILS_REQUEST = 'TOOL_DETAILS_REQUEST';
const TOOL_DETAILS_SUCCESS = 'TOOL_DETAILS_SUCCESS';
const TOOL_DETAILS_FAIL = 'TOOL_DETAILS_FAIL';
const TOOL_UPDATE_REQUEST = 'TOOL_UPDATE_REQUEST';
const TOOL_UPDATE_SUCCESS = 'TOOL_UPDATE_SUCCESS';
const TOOL_UPDATE_FAIL = 'TOOL_UPDATE_FAIL';
const TOOL_DELETE_REQUEST = 'TOOL_DELETE_REQUEST';
const TOOL_DELETE_SUCCESS = 'TOOL_DELETE_SUCCESS';
const TOOL_DELETE_FAIL = 'TOOL_DELETE_FAIL';

const getToolList = () => async (dispatch) => {
  dispatch({ type: TOOL_LIST_REQUEST });
  console.log('------RUTA:', baseURL);

  await fetch(baseURL)
    .then((response) => {
      if (response.status >= 500 && response.status <= 599) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (!data.message) {
        dispatch({
          type: TOOL_LIST_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: TOOL_LIST_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TOOL_LIST_FAIL,
        payload: [error.message],
      });
    });
};

const getToolDetails = (pyId) => async (dispatch) => {
  dispatch({ type: TOOL_DETAILS_REQUEST, payload: pyId });

  await fetch(`${baseURL}/${pyId}`)
    .then((response) => {
      if (response.status >= 500 && response.status <= 599) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (!data.message) {
        dispatch({
          type: TOOL_DETAILS_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: TOOL_DETAILS_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TOOL_DETAILS_FAIL,
        payload: [error.message],
      });
    });
};

const addTool = (tool) => async (dispatch, getState) => {
  dispatch({ type: TOOL_ADD_REQUEST, payload: tool });

  const { userSigninReducer: { userInfo } } = getState();

  await fetch(baseURL, {
    method: 'POST',
    body: JSON.stringify(tool),
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
          type: TOOL_ADD_SUCCESS,
          payload: data,
        });
        dispatch(getToolList());
      } else {
        dispatch({
          type: TOOL_ADD_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TOOL_ADD_FAIL,
        payload: [error.message],
      });
    });
};

const updateTool = (pyId, fields) => async (dispatch, getState) => {
  dispatch({ type: TOOL_UPDATE_REQUEST, payload: { pyId, fields } });

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
          type: TOOL_UPDATE_SUCCESS,
          payload: data,
        });
        dispatch(getToolList());
      } else {
        dispatch({
          type: TOOL_UPDATE_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TOOL_UPDATE_FAIL,
        payload: [error.message],
      });
    });
};

const deleteTool = (pyId) => async (dispatch, getState) => {
  dispatch({ type: TOOL_DELETE_REQUEST, payload: pyId });

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
          type: TOOL_DELETE_SUCCESS,
          payload: data,
        });
        dispatch(getToolList());
      } else {
        dispatch({
          type: TOOL_DELETE_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TOOL_DELETE_FAIL,
        payload: [error.message],
      });
    });
};

const toolListReducer = (state = { loading: true, toolList: [] }, action) => {
  switch (action.type) {
    case TOOL_LIST_REQUEST:
      return { loading: true };
    case TOOL_LIST_SUCCESS:
      return { loading: false, toolList: action.payload };
    case TOOL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const toolDetailsReducer = (state = { loading: true, tool: {} }, action) => {
  switch (action.type) {
    case TOOL_DETAILS_REQUEST:
      return { loading: true };
    case TOOL_DETAILS_SUCCESS:
      return { loading: false, tool: action.payload };
    case TOOL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const toolAddReducer = (state = {}, action) => {
  switch (action.type) {
    case TOOL_ADD_REQUEST:
      return { loading: true };
    case TOOL_ADD_SUCCESS:
      return { loading: false, success: true, tool: action.payload };
    case TOOL_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const toolUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TOOL_UPDATE_REQUEST:
      return { loading: true };
    case TOOL_UPDATE_SUCCESS:
      return { loading: false, success: true, tool: action.payload };
    case TOOL_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const toolDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TOOL_DELETE_REQUEST:
      return { loading: true };
    case TOOL_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TOOL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export {
  getToolList,
  getToolDetails,
  addTool,
  updateTool,
  deleteTool,
  toolListReducer,
  toolDetailsReducer,
  toolAddReducer,
  toolUpdateReducer,
  toolDeleteReducer,
};
