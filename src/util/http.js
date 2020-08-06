/**
 * axios 请求封装
 * @param {Object} config axios 配置
 * @param {Boolean} isFormData 是否为FormData，true 不设置请求头
 */
import React from "react";
import history from "./history";
import { Toast } from "antd-mobile";
import axios from "axios";
import qs from "qs";
import { setCookie, getCookie } from "@/util/methods";

let baseUrl = "";

// 9002 ：活动不存在    （普通活动，新人专享活动）
// 4004 ：商品不存在（商品详情）
// 8003 : 优惠券不存在
let redirectCode = [9002, 4004, 8003];

if (process.env.NODE_ENV === "production") {
  if (window.location.href.indexOf("mall.kangcemall.cn") > -1) {
    // 测试环境
    baseUrl = "http://mallapi.kangcemall.cn";
  } else if (window.location.href.indexOf("mall.kangcemall.net") > -1) {
    // 开发环境
    baseUrl = "http://mallapi.kangcemall.net";
  } else if (window.location.href.indexOf("mall.kangcemall.top") > -1) {
    // 产品环境
    baseUrl = "http://mallapi.kangcemall.top";
  } else {
    // 生产环境
    baseUrl = "http://mallapi.kangcemall.com";
  }
} else if (process.env.NODE_ENV === "development") {
  // 本地环境
  // baseUrl = "http://mallapi.kangcemall.cn";
  baseUrl = "http://mallapi.kangcemall.cn"; //本地服务器(链接开发的)
  // baseUrl = "http://192.168.1.133"
}

// 拦截请求
axios.interceptors.request.use(function(config) {
  if (config.loading) {
    const loadingText = config.loadingText; //自定义loading提示语
    Toast.loading(loadingText || "加载中", 0);
  }
  return config;
});

// 拦截响应
axios.interceptors.response.use(function(config) {
  Toast.hide();
  return config;
});

const http = (config = {}) => {
  const isFormData =
    Object.prototype.toString.call(config.data) === "[object FormData]";
  let headers = {};
  headers["Authorization"] = getCookie("token");

  if (!(config.headers && config.headers["Content-Type"]) && !isFormData) {
    headers["Content-Type"] = "application/json";
  }

  headers = {
    ...headers,
    ...config.headers
  };

  let data = null;

  // Content-Type 为 application/x-www-form-urlencoded 并且 data 类型不为 formData 时序列化 data
  if (!isFormData) {
    data =
      !headers["Content-Type"] ||
      headers["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1
        ? qs.stringify(config.data)
        : config.data || "";
  } else {
    data = config.data;
  }

  const newRequest = new Promise((resolve, reject) => {
    axios(
      Object.assign({}, config, {
        baseURL: config.baseUrl || baseUrl,
        url: config.url,
        method: config.method || "get",
        headers: headers,
        data: data,
        params: config.params || "", //与url拼接
        timeout: config.timeout || 0
      })
    )
      .then(response => {
        if (response.data.code === 1001) {
          //不校验设置缓存
          if ("/self.cache.set".indexOf(config.url) !== -1) return;
          //商品详情页：加入购物车、领取优惠券、商品收藏
          if (
            "/cart.add,/coupon.add,/user.collection.add".indexOf(config.url) !==
            -1
          ) {
            history.push("/login");
          } else {
            //浏览过程中token 失效
            window.location.pathname !== "/login" && window.location.reload();
          }
        } else if (response.data.code !== 1000) {
          if (redirectCode.find(code => code === response.data.code)) {
            let params = qs.parse(window.location.search.split("?")[1]);
            let url;
            if (params.from) {
              url = `/invalidpage?from=${params.from}`;
            } else {
              url = `/invalidpage`;
            }
            history.replace(url);
          } else {
            Toast.fail(response.data.msg, 1);
          }
          reject({ code: response.data.code, data: response.data });
        } else {
          resolve(response);
        }
      })
      .catch(error => {
        console.log(error);
        Toast.fail("网络不给力，请稍候再试", 1);
        reject({ code: -10000, data: "网络不给力，请稍候再试" });
      });
  });

  return newRequest;
};

export default http;
