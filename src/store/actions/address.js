import http from "../../util/http";
import { GET_CLASSIFY_LIST } from "./classify";

export const DEFAULT_ADDRESS = "DEFAULT_ADDRESS";
export const SELECTADDRESS = "SELECTADDRESS";

export function getDefaultAddress() {
  return dispatch => {
    let params = {};
    http({
      url: "/receiving.default",
      params
    }).then(res => {
      dispatch({
        type: DEFAULT_ADDRESS,
        data: res.data.data
      });
    });
  };
}

export function selectAddress(data) {
  return { type: SELECTADDRESS, data: data };
}
