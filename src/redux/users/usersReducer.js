const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST';
const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
const USER_SIGNIN_FAIL = 'USER_SIGNIN_FAIL';
const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST';
const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
const USER_SIGNUP_FAIL = 'USER_SIGNUP_FAIL';
const USER_CONFSIGNUP_REQUEST = 'USER_CONFSIGNUP_REQUEST';
const USER_CONFSIGNUP_SUCCESS = 'USER_CONFSIGNUP_SUCCESS';
const USER_CONFSIGNUP_FAIL = 'USER_CONFSIGNUP_FAIL';
const USER_CONFSIGNUP_CLEAN = 'USER_CONFSIGNUP_CLEAN';
const USER_SIGNOUT = 'USER_SIGNOUT';
const USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST';
const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS';
const USER_DETAILS_FAIL = 'USER_DETAILS_FAIL';
const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
const USER_UPDATE_FAIL = 'USER_UPDATE_FAIL';
const USER_UPDATE_RESET = 'USER_UPDATE_RESET';

const baseURL = `${process.env.REACT_APP_PORTFOLIO_SERVER}/api/users`;

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const signinUser = (signinData) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: signinData });

  await fetch(`${baseURL}/signin`, {
    method: 'POST',
    body: JSON.stringify(signinData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => {
      if (response.status >= 500 && response.status <= 599) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (!data.message) {
        dispatch({
          type: USER_SIGNIN_SUCCESS,
          payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
      } else {
        dispatch({
          type: USER_SIGNIN_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : [error.message],
      });
    });
};

const signoutUser = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({
    type: USER_SIGNOUT,
  });
};

const signupUser = (signupData) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST, payload: signupData });

  await fetch(`${baseURL}/signup`, {
    method: 'POST',
    body: JSON.stringify(signupData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => {
      if (response.status >= 500 && response.status <= 599) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (data.message.success) {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
          payload: Object.values(data.message),
        });
      } else {
        dispatch({
          type: USER_SIGNUP_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : [error.message],
      });
    });
};

const confSignupUser = (code) => async (dispatch) => {
  dispatch({ type: USER_CONFSIGNUP_REQUEST, payload: code });

  await fetch(`${baseURL}/confirm/${code}`)
    .then((response) => {
      if (response.status >= 500 && response.status <= 599) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (data.message.success) {
        dispatch({
          type: USER_CONFSIGNUP_SUCCESS,
          payload: Object.values(data.message),
        });
      } else {
        dispatch({
          type: USER_CONFSIGNUP_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: USER_CONFSIGNUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : [error.message],
      });
    });
};

const cleanConfSignupUser = () => async (dispatch) => {
  dispatch({
    type: USER_CONFSIGNUP_CLEAN,
  });
};

const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const { userSigninReducer: { userInfo } } = getState();

  await fetch(`${baseURL}/${userId}`, {
    headers: { authorization: `gabyse ${userInfo.accessToken}` },
  })
    .then((response) => {
      if (response.status >= 500 && response.status <= 599) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (!data.message) {
        dispatch({
          type: USER_DETAILS_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: USER_DETAILS_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : [error.message],
      });
    });
};

const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_REQUEST, payload: user });
  const { userSigninReducer: { userInfo } } = getState();

  await fetch(`${baseURL}/edit`, {
    method: 'POST',
    body: JSON.stringify(user),
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
          type: USER_UPDATE_SUCCESS,
          payload: data,
        });
        dispatch({
          type: USER_SIGNIN_SUCCESS,
          payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
      } else {
        dispatch({
          type: USER_UPDATE_FAIL,
          payload: Object.values(data.message),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : [error.message],
      });
    });
};

const userSigninReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

const userSignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userConfSignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CONFSIGNUP_REQUEST:
      return { loading: true };
    case USER_CONFSIGNUP_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_CONFSIGNUP_FAIL:
      return { loading: false, error: action.payload };
    case USER_CONFSIGNUP_CLEAN:
      return {};
    default:
      return state;
  }
};

const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export {
  signinUser,
  signoutUser,
  signupUser,
  confSignupUser,
  cleanConfSignupUser,
  detailsUser,
  updateUser,
  userSigninReducer,
  userSignupReducer,
  userConfSignupReducer,
  userDetailsReducer,
  userUpdateReducer,
};
