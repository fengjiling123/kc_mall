import * as actions from "../actions/address";

const initialState = {
  defaultAddress: {},
  selectAddress: {}
};

const defaultAction = {
  type: "doNothing"
};

const address = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case actions.DEFAULT_ADDRESS:
      return Object.assign({}, state, { defaultAddress: action.data });
    case actions.SELECTADDRESS:
      const selectAddress = action.data;
      return Object.assign({}, state, { selectAddress });

    default:
      return state;
  }
};

export default address;
