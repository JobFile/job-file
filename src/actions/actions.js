
import * as types from '../constants/actionTypes.js';


export const newApplicationCreator = jobPayload => ({
  type: types.NEW_APPLICATION,
  payload: jobPayload,
});

export const deleteApplicationCreator = jobPayload => ({
  type: types.DELETE_APPLICATION,
  payload: jobPayload,
});

