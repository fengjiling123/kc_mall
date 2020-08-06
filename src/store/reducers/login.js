import * as actions from "../actions/login";

const initialState = {
  token: "",
  username: "",
  nickname: "",
  face: "", //用户头像
  drugstoreName: "",
  isLogin: false,
  goods_collection_count: 0,
  conpon_count: 0,
  loading: false
};

const defaultAction = {
  type: "doNothing"
};

const login = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case actions.WEXINLOGIN:
      const { token } = action.data;
      return Object.assign({}, state, { token });
    case actions.GET_USER_INFO:
      return Object.assign({}, state, {
        ...action.data,
        isLogin: action.data ? true : false
      });
    case actions.GET_PLATFROM_INFO:
      return Object.assign({}, state, {
        ...action.data
      });

    case actions.CHNAGE_IS_LOGIN:
      return Object.assign({}, state, {
        isLogin: action.data
      });

    default:
      return state;
  }
};

export default login;
