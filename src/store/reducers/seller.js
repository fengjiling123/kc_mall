import * as actions from "../actions/seller";

const initialState = {
  seller: null
};

const defaultAction = {
  type: "doNothing"
};

const seller = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case actions.GET_SELLER:
      return Object.assign({}, state, {
        seller: action.data
      });
    default:
      return state;
  }
};

export default seller;
