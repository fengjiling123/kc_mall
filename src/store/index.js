import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import classify from "./reducers/classify";
import cart from "./reducers/cart";
import cache from "./reducers/cache";
// import commendGoods from "./reducers/commendGoods";
import login from "./reducers/login";
import address from "./reducers/address";
import seller from "./reducers/seller";
import message from "./reducers/message";
import order from "./reducers/order";
import couponNewListModal from "./reducers/couponNewListModal";

const reducer = combineReducers({
  classify,
  cart,
  message,
  cache,
  // commendGoods,
  login,
  address,
  seller,
  order,
  couponNewListModal
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);

export default createStore(reducer, enhancer);
