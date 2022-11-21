import { TRIGGER_USER_DETAILS } from "../actions/actionTypes";

const initialState = {
  userDetails: {},
};

const userDetailsReducer = function (state = initialState, action) {
  switch (action.type) {
    case TRIGGER_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    default:
      return state;
  }
};

export default userDetailsReducer;
