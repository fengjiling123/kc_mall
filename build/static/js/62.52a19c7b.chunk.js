(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{1080:function(e,t,r){var n=r(1081);"string"===typeof n&&(n=[[e.i,n,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};r(46)(n,a);n.locals&&(e.exports=n.locals)},1081:function(e,t,r){(e.exports=r(45)(!1)).push([e.i,".\\--cashout-record {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.\\--cashout-record .scroll-view {\n  flex: 1;\n  overflow: auto;\n}\n.\\--cashout-record .scroll-view .text {\n  text-align: center;\n  color: #a1adb9;\n  font-size: 0.13rem;\n  line-height: 0.18rem;\n  margin: 0.1rem 0;\n}\n.\\--cashout-record .scroll-view .all-record {\n  background: #fff;\n  border-radius: 0.05rem;\n  margin: 0 0.15rem;\n}\n.\\--cashout-record .scroll-view .all-record .record-item {\n  display: flex;\n  padding: 0.15rem 0.17rem 0.15rem 0.1rem;\n  align-items: center;\n  border-bottom: 1px solid #f5f6f8;\n}\n.\\--cashout-record .scroll-view .all-record .record-item:last-child {\n  border-bottom: none;\n}\n.\\--cashout-record .scroll-view .all-record .record-item > div:first-child {\n  flex: 1;\n}\n.\\--cashout-record .scroll-view .all-record .record-item > div:first-child .name {\n  line-height: 0.21rem;\n  font-size: 0.15rem;\n  font-weight: bold;\n}\n.\\--cashout-record .scroll-view .all-record .record-item > div:first-child .time {\n  line-height: 0.18rem;\n  font-size: 0.13rem;\n  color: #657281;\n  margin-top: 3px;\n}\n.\\--cashout-record .scroll-view .all-record .money {\n  font-weight: bold;\n  font-size: 0.2rem;\n}\n",""])},1191:function(e,t,r){"use strict";r.r(t);r(304);var n=r(212),a=r.n(n),o=r(755),i=r(21),l=r(22),c=r(24),s=r(23),d=r(25),m=r(0),u=r.n(m),f=r(127),h=r(11),p=r(164),g=r.n(p),v=(r(1080),{0:"\u7533\u8bf7\u4e2d",1:"\u5df2\u6253\u6b3e",2:"\u62d2\u7edd"}),b=function(e){function t(e){var r;return Object(i.a)(this,t),(r=Object(c.a)(this,Object(s.a)(t).call(this,e))).getRecordList=function(){var e=r.state,t={page:e.page,limit:e.limit};Object(h.a)({url:"/payee.list",params:t}).then(function(e){r.setState({loading:!1,recordList:[].concat(Object(o.a)(r.state.recordList),Object(o.a)(e.data.data.data)),last_page:e.data.data.last_page})})},r.onScrollHandle=function(){var e=r.state,t=e.page,n=e.last_page,a=r.scrollRef.scrollTop,o=r.scrollRef.clientHeight;r.scrollRef.scrollHeight-(a+o)<200&&a&&n!==t&&r.setState({page:t+1},function(){r.getRecordList()})},r.state={recordList:[],loading:!0,page:1,limit:10,last_page:1},r}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getRecordList()}},{key:"render",value:function(){var e=this,t=this.state,r=t.loading,n=t.recordList,o=t.page;return u.a.createElement("div",{className:"--cashout-record"},u.a.createElement(f.b,{name:"\u63d0\u73b0\u8bb0\u5f55"}),u.a.createElement("div",{className:"scroll-view",onScrollCapture:function(){return e.onScrollHandle()},ref:function(t){e.scrollRef=t}},u.a.createElement("div",{className:"text"},u.a.createElement("div",null,"\u5df2\u6253\u6b3e\u7684\u8bb0\u5f55\u8bf7\u67e5\u6536\u8d26\u6237\u662f\u5426\u5230\u8d26"),u.a.createElement("div",null,"\u63d0\u73b0\u62d2\u7edd\u7684\u8bf7\u6838\u5bf9\u63d0\u73b0\u8d26\u6237\u540e\u91cd\u65b0\u7533\u8bf7")),u.a.createElement("div",{className:"all-record"},n&&n.length>0&&n.map(function(e){return u.a.createElement("div",{className:"record-item",key:e.id},u.a.createElement("div",null,u.a.createElement("div",{className:"name"},"\u7528\u6237\u63d0\u73b0\uff08",v[e.status],"\uff09"),u.a.createElement("div",{className:"time"},g.a.unix(e.create_time).format("YYYY.MM.DD HH:mm"),0!==e.status?"-":"",0!==e.status?g.a.unix(e.update_time).format("YYYY.MM.DD HH:mm"):"")),u.a.createElement("div",{className:"money"},parseFloat(e.money)))})),u.a.createElement("div",{style:{display:"flex",justifyContent:"center",padding:".1rem 0",height:"0.2rem"}},1!==o&&r&&u.a.createElement(a.a,{animating:!0}))))}}]),t}(u.a.Component);t.default=b},755:function(e,t,r){"use strict";function n(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}r.d(t,"a",function(){return n})}}]);
//# sourceMappingURL=62.52a19c7b.chunk.js.map