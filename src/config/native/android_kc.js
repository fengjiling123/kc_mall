// 打电话
export const telephone = phone => {
  window.app.telephone(phone);
}

// 强制退出h5
export const forceCloseCurrentView = () => {
  window.app.finish();
}

// 没有历史退出h5
export const canBack = () => {
  window.app.canBack();
}

