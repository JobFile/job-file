import { combineReducers } from 'redux';

// import all reducers here
// import marketsReducer from './marketsReducer';


// combine reducers
const rootReducers = combineReducers({
  // if we had other reducers, they would go here
  jobs: newApplicationReducer,
});

// make the combined reducers available for import
export default rootReducers;

