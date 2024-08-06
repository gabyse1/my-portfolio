import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {
  userSigninReducer,
  userSignupReducer,
  userConfSignupReducer,
  userDetailsReducer,
  userUpdateReducer,
} from './users/usersReducer';
import {
  projectListReducer,
  projectDetailsReducer,
  projectAddReducer,
  projectUpdateReducer,
  projectDeleteReducer,
} from './projects/projectsReducer';
import {
  toolListReducer,
  toolDetailsReducer,
  toolAddReducer,
  toolUpdateReducer,
  toolDeleteReducer,
} from './tools/toolsReducer';

const rootReducer = combineReducers({
  userSigninReducer,
  userSignupReducer,
  userConfSignupReducer,
  userDetailsReducer,
  userUpdateReducer,
  projectListReducer,
  projectDetailsReducer,
  projectAddReducer,
  projectUpdateReducer,
  projectDeleteReducer,
  toolListReducer,
  toolDetailsReducer,
  toolAddReducer,
  toolUpdateReducer,
  toolDeleteReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger)),
);

export default store;
