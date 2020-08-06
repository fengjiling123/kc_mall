import * as actions from "../actions/cache";

const initState = {};

const detafutAction = {
  type: "doNothing"
};

const cache = (state = initState, action = detafutAction) => {
  switch (action.type) {
    //获取缓存
    case actions.GET_CACHE:
      return Object.assign({}, state, action.data);

    //设置缓存
    case actions.SET_CACHE:
      return Object.assign({}, state, action.data);

    //晴空缓存
    case actions.CLEAR_CACHE:
      return {};
    default:
      return state;
  }
};

export default cache;
