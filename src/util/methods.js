//查看大图
import http from "./http";

export function renderBigImg(bigImgUrl) {
  let div = document.createElement("div");
  let img = document.createElement("img");
  let divText = document.createElement("div");
  div.addEventListener("click", () => {
    removeBigImg();
  });
  div.setAttribute("id", "big-image-container");
  div.setAttribute(
    "style",
    `
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.65);
      top: 0;
      left: 0;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `
  );
  img.setAttribute("src", bigImgUrl);
  img.setAttribute(
    "style",
    `
      max-height: 80%;
      max-width: 80%;
      margin-top:0.5rem;
    `
  );
  divText.setAttribute(
    "style",
    `
      color: #fff;
      position:absolute;
      width:100%;
      text-align: center;
      top:0.2rem;
    `
  );
  divText.innerHTML = "长按保存图片";
  div.appendChild(img);
  div.appendChild(divText);
  document.body.appendChild(div);
}

//移除大图
export function removeBigImg() {
  let div = document.getElementById("big-image-container");
  if (div) {
    div.remove();
  }
}

export function getUserId() {
  let user_id = getCookie("user_id");
  if (user_id) {
    return user_id;
  } else {
    http({
      url: "/self.get"
    }).then(res => {
      if (res.data.data) {
        setCookie("user_id", res.data.data.id);
      }
    });
    return "";
  }
}

//设置cookie
export function setCookie(c_name, value, expiredays) {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie =
    c_name +
    "=" +
    escape(value) +
    // (expiredays == null ? "" : ";expires=" + exdate.toGMTString()) +
    ";path=/";
}

//取回cookie
export function getCookie(c_name) {
  if (window.location.pathname !== "/") {
    delCookie(c_name);
  }
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      let token = unescape(document.cookie.substring(c_start, c_end));
      // console.log("getCookie", token);
      return token;
    }
  }
  return "";
}

//删除主路径以外的cookie
function delCookie(c_name) {
  let exdate = new Date();
  exdate.setDate(exdate.getDate());

  let path = window.location.pathname;
  let subPath = path.substring(0, path.lastIndexOf("/"));

  document.cookie =
    c_name + "=" + "" + ";expires=" + exdate.toGMTString() + ";path=" + path;

  if (subPath && subPath !== "/") {
    document.cookie =
      c_name +
      "=" +
      "" +
      ";expires=" +
      exdate.toGMTString() +
      ";path=" +
      subPath;
  }
}

export function tabIndex() {
  let index = 0;
  switch (window.location.pathname) {
    case "/":
      index = 0;
      break;
    case "/classifypage":
      index = 1;
      break;
    case "/mycenter/cart":
      index = 2;
      break;
    case "/mycenter":
      index = 3;
      break;
    default:
      index = -1;
      break;
  }
  return index;
}

export function rem2px(rem) {
  let html = document.documentElement;
  let fontSize = html.style.fontSize.replace("px", "");
  return fontSize * rem;
}

export const _czc = window._czc || [];

export function setEvent(category, action, label) {
  _czc.push(["_trackEvent", category, action, label]);
}

export function setPage(content_url, referer_url) {
  _czc.push(["_trackPageview", content_url, referer_url]);
}

export function setPageFalse() {
  _czc.push(["_setAutoPageview", false]);
}

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
