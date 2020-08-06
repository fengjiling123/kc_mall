import http from "@/util/http";

export const CARTS_INFO = "CARTS_INFO";

export const CARTS_SELECT_ALL = "CARTS_SELECT_ALL";

export const CARTS_SELECT_LIST = "CARTS_SELECT_LIST";

export const CARTS_SELECT_ADD = "CARTS_SELECT_ADD";

export function cartInfo() {
  return dispatch => {
    http({
      url: "/order.count",
      method: "get"
    }).then(res => {
      if (res.data.data) {
        dispatch({
          type: CARTS_INFO,
          data: res.data.data
        });
      }
    });
  };
}

export function selectAll(selectAll) {
  return {
    type: CARTS_SELECT_ALL,
    data: selectAll
  };
}

export function selectList(list) {
  return {
    type: CARTS_SELECT_LIST,
    data: list
  };
}

export function selectListAdd(list) {
  return {
    type: CARTS_SELECT_ADD,
    data: list
  };
}
