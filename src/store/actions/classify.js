import http from "../../util/http";

export const GET_CLASSIFY_LIST = "GET_CLASSIFY_LIST";

export const CHANGE_ACTIVE_CLASSIFY = "CHANGE_ACTIVE_CLASSIFY";

export function getClassify(params) {
  return dispatch => {
    http({
      url: "/category.list",
      params
    }).then(res => {
      dispatch({
        type: GET_CLASSIFY_LIST,
        data: res.data.data
      });
    });
  };
}

export function changeActivityClassify(activeClassify) {
  return {
    type: CHANGE_ACTIVE_CLASSIFY,
    data: activeClassify
  };
}
