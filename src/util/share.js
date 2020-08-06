import http from "./http";
import { getUserId } from "./methods";
import qs from "qs";

export function getShareUrl(shareHomePage) {
  let params = qs.parse(window.location.search.split("?")[1]);
  if (params.inviter_id) {
    delete params.inviter_id;
  }
  if (params.token) {
    delete params.token;
  }
  if (params.code) {
    delete params.code;
  }
  let url;
  if (shareHomePage) {
    url = window.location.origin;
  } else {
    url = window.location.origin + window.location.pathname;
  }

  if (qs.stringify(params)) {
    url = url + "?" + qs.stringify(params) + `&inviter_id=${getUserId()}`;
  } else {
    url = url + `?inviter_id=${getUserId()}`;
  }
  return url;
}

export function shareHomePage() {
  let title = "康策良品";
  let desc =
    "康策良品，聚合万千健康好货，一站式生活健康采购平台，100%正品保障，100%优质货源";
  let url = getShareUrl(true);
  let logo =
    // "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2Fshare_logo.png";
    "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fshare_logo.png?";
  share(title, desc, url, logo);
}

export function share(title, desc, url, logo) {
  let configUrl = window.location.href;
  console.log(url);
  console.log(configUrl);
  http({
    url: "/platform.share",
    params: { url: configUrl }
  }).then(res => {
    let result = JSON.parse(res.data.data);
    window.wx.config({
      appId: result.appId, // 必填，公众号的唯一标识
      timestamp: result.timestamp, // 必填，生成签名的时间戳
      nonceStr: result.nonceStr, // 必填，生成签名的随机串
      signature: result.signature, // 必填，签名，见附录1
      jsApiList: [
        "updateAppMessageShareData",
        "updateTimelineShareData",
        "onMenuShareTimeline",
        "onMenuShareAppMessage"
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    window.wx.ready(function() {
      if (window.wx.updateAppMessageShareData) {
        window.wx.updateAppMessageShareData({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: url,
          imgUrl: logo // 分享图标
        });
      } else {
        window.wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: url,
          imgUrl: logo // 分享图标
        });
      }
      //分享给朋友圈
      if (window.wx.updateTimelineShareData) {
        window.wx.updateTimelineShareData({
          title: title, // 分享标题
          link: url,
          imgUrl: logo // 分享图标
        });
      } else {
        window.wx.onMenuShareTimeline({
          title: title, // 分享标题
          link: url,
          imgUrl: logo // 分享图标
        });
      }
    });
  });
}

