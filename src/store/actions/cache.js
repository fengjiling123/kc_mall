import http from "@/util/http";

export const GET_CACHE = "GET_CACHE";

export const SET_CACHE = "SET_CACHE";

export const CLEAR_CACHE = "CLEAR_CACHE";

//获取缓存
export function getCache(key) {
  return dispatch => {
    http({
      url: "/self.cache.get",
      data: { key },
      method: "post"
    }).then(res => {
      dispatch({
        type: GET_CACHE,
        data: { [key]: JSON.parse(res.data.data) }
      });
    });
  };
}

//设置缓存 data={key:value}
export function setCache(data) {
  let saveValue = {};
  Object.keys(data).map(key => {
    saveValue.key = key;
    saveValue.value = JSON.stringify(data[key]);
  });
  return dispatch => {
    http({
      url: "/self.cache.set",
      data: saveValue,
      method: "post"
    }).then(res => {
      dispatch({
        type: SET_CACHE,
        data
      });
    });
  };
}

//清空所有缓存
export function clearCache() {
  return dispatch => {
    http({
      url: "/self.cache.clear",
      method: "post"
    }).then(res => {
      dispatch({
        type: CLEAR_CACHE
      });
    });
  };
}
