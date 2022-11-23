import { TRIGGER_LEAD_DETAILS } from "../actions/actionTypes";

const initialState = {
  leadDetails: {},
};

const leadDetailsReducer = function (state = initialState, action) {
  switch (action.type) {
    case TRIGGER_LEAD_DETAILS:
      return {
        ...state,
        leadDetails: action.leadDetails,
      };
    default:
      return state;
  }
};

export default leadDetailsReducer;
