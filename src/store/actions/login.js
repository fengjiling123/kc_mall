import http from "@/util/http";

export const WEXINLOGIN = "LOGIN";
export const GET_USER_INFO = "GET_USER_INFO";
export const GET_PLATFROM_INFO = "GET_USER_INFO";

export const CHNAGE_IS_LOGIN = "CHNAGE_IS_LOGIN";

export function wxlogin(token) {
  return { type: WEXINLOGIN, data: token };
}
// 用户信息
export function getUserInfo() {
  return dispatch => {
    http({
      url: "/self.get"
    }).then(res => {
      dispatch({
        type: GET_USER_INFO,
        data: res.data.data
      });
    });
  };
}

// 平台信息
export function getPlatformInfo() {
  return dispatch => {
    http({
      url: "/platform.get"
    }).then(res => {
      dispatch({
        type: GET_USER_INFO,
        data: res.data.data
      });
    });
  };
}

export function changeIsLogin(data) {
  return {
    type: CHNAGE_IS_LOGIN,
    data
  };
}
