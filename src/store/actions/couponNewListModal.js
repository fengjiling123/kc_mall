import http from "../../util/http";
import { setCookie, getCookie } from "@/util/methods";

export const CHANGE_SHOW_PAGE = "CHANGE_SHOW_PAGE";

export const GET_COUPON_NEW_LIST = "GET_COUPON_NEW_LIST";

export function changeShowPage(data) {
  return {
    type: CHANGE_SHOW_PAGE,
    data
  };
}

export function getCouponNewList() {
  return dispatch => {
    http({
      url: "/coupon.new.list"
    }).then(res => {
      dispatch({
        type: CHANGE_SHOW_PAGE,
        data: true
      });
      dispatch({
        type: GET_COUPON_NEW_LIST,
        data: res.data.data
      });
    });
  };
}
