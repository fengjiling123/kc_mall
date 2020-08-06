let uploadUrl = "";

if (process.env.NODE_ENV === "production") {
  if (window.location.href.indexOf("mall.kangcemall.cn") > -1) {
    // 测试环境
    uploadUrl = "https://commonapi.e6kang.cn";
  } else if (window.location.href.indexOf("mall.kangcemall.net") > -1) {
    // 开发环境
    uploadUrl = "http://commonapi.e6kang.net";
  } else if (window.location.href.indexOf("mall.kangcemall.top") > -1) {
    // 产品环境
    uploadUrl = "http://commonapi.e6kang.top";
  } else {
    //生产环境
    uploadUrl = "https://commonapi.e6kang.com";
  }
} else if (process.env.NODE_ENV === "development") {
  // 本地环境
  uploadUrl = "http://commonapi.e6kang.net";
}
export default uploadUrl;
