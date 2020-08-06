import http from "@/util/http";


export const GET_SELLER = "GET_SELLER";



export function getSeller() {
  return dispatch => {
    http({
      url: "/seller.get"
    }).then(res => {
      dispatch({
        type: GET_SELLER,
        data: res.data.data
      });
    });
  };
}
