import * as ios_api from './native/ios_kc';
import * as android_api from './native/android_kc';


// 获取平台及监测方法

function getNativeApi () {
  let api;
  if (window.webkit) {
    api = ios_api
  } else if (window.app) {
    api = android_api
  }

  return {
    // 打电话
    telephone (phone) {
      api.telephone(phone)
    },

    // 强制退出h5
    forceCloseCurrentView () {
      api.forceCloseCurrentView();
      // console.log(111);
    },

    // 没有历史退出h5
    canBack () {
      api.canBack();
    }
  }
}

const native_api = getNativeApi();

export default native_api

