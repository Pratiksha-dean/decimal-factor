import { TRIGGER_REVIEW_APPLICATION_DETAILS } from "../actions/actionTypes";

const initialState = {
  reviewApplicationDetails: {},
};

const reviewApplicationDetailsReducer = function (
  state = initialState,
  action
) {
  console.log(
    "🚀 ~ file: reviewApplicationDetailsReducer.js ~ line 11 ~ action",
    action
  );
  switch (action.type) {
    case TRIGGER_REVIEW_APPLICATION_DETAILS:
      return {
        ...state,
        reviewApplicationDetails: action.reviewApplicationDetails,
      };
    default:
      return state;
  }
};

export default reviewApplicationDetailsReducer;
