import * as actions from "../actions/order";
import { ORDER_NEW } from "../actions/order";

const initialState = {
  orderStatus: ORDER_NEW
};

const defaultAction = {
  type: "doNothing"
};

const order = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case actions.ORDER_FLAG:
      return Object.assign({}, state, { orderStatus: action.data });
    default:
      return state;
  }
};

export default order;
