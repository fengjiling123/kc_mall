// 打电话
export const telephone = phone => {
  window.webkit.messageHandlers.telephone.postMessage(phone);
}

// 强制退出h5
export const forceCloseCurrentView = () => {
  window.webkit.messageHandlers.forceCloseCurrentView.postMessage(0);
}

// 没有历史退出h5
export const canBack = () => {
  window.webkit.messageHandlers.closeCurrentView.postMessage(0);
}