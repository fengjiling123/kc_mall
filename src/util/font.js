(function() {
  function setSize() {
    //获取浏览器窗口文档显示区域的宽度，不包括滚动条:document.documentElement.clientWidth
    var html = document.documentElement;
    //控制分辨率在某个范围内，超过了该范围，我们就不再增加根元素的字体大小
    var windowWidth = html.clientWidth;
    html.style.fontSize = windowWidth / 3.75 + "px";
    // 等价于html.style.fontSize = windowWidth / 375 * 100 + 'px';
  }
  setSize();
  window.onresize = function() {
    setSize();
  };
})();
