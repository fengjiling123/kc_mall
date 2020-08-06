/**
 * 获取 url 的参数值
 * @param {String} key
 * @param {String?} targetStr 需要被查找的字符串范围
 */
export function url_request(key, targetStr = "") {
  let args = {};
  let query;
  let index;
  if (targetStr) {
    index = targetStr.indexOf("?");
    query = targetStr.substring(index + 1);
  } else {
    // eslint-disable-next-line no-restricted-globals
    index = location.href.indexOf("?");
    // eslint-disable-next-line no-restricted-globals
    query = location.href.substring(index + 1);
  }

  let pairs = query.split("&"); // Break at ampersand
  for (let i = 0; i < pairs.length; i++) {
    let pos = pairs[i].indexOf("=");
    if (pos == -1) continue;
    let argname = pairs[i].substring(0, pos);
    let value = pairs[i].substring(pos + 1);
    value = decodeURIComponent(value);
    args[argname] = value;
  }
  return args[key];
}

let ua = navigator.userAgent.toLowerCase();
let isWeixin = ua.indexOf("micromessenger") != -1;
export default isWeixin;
