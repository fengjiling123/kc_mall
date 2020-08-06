import * as actions from "../actions/cart";
import { CARTS_INFO } from "../actions/cart";

const initState = {
  countInfo: {},
  selectAll: false,
  selectList: [],
  version: ""
};

const detafutAction = {
  type: "doNothing"
};

const cart = (state = initState, action = detafutAction) => {
  switch (action.type) {
    case actions.CARTS_INFO:
      return Object.assign({}, state, { countInfo: action.data });
      break;
    case actions.CARTS_SELECT_ALL:
      return Object.assign({}, state, {
        selectAll: action.data,
        version: Math.ceil(Math.random() * 1000)
      });
    case actions.CARTS_SELECT_LIST:
      return Object.assign({}, state, { selectList: action.data });
    case actions.CARTS_SELECT_ADD:
      return Object.assign({}, state, {
        selectList: state.selectList.concat(action.data)
      });
    default:
      return state;
  }
};

export default cart;
