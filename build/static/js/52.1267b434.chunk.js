(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{1172:function(e,t,n){"use strict";n.r(t);n(760);var a,i=n(761),o=n.n(i),r=n(21),s=n(22),m=n(24),l=n(23),c=n(25),d=n(42),g=n(0),u=n.n(g),p=n(11),f=n(19),h=n(106),w=n(127),y=n(925),v=n.n(y),b=(n(926),n(1158)),x=n(215),D=n(47),N=n.n(D),E=(n(928),n(63)),G=n(164),P=n.n(G),j=n(159),C=n.n(j),B=n(783),S=n(9),k=n(756),A=Object(E.b)(function(e){return Object(d.a)({},e.message,{face:e.login.face})})(a=Object(k.a)(a=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(m.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(i)))).page=1,n.limit=20,n.state={height:0,store:{},refreshing:!1,haveSend:!1,message:[]},n.reSizeHeight=function(){var e=document.body.clientHeight;if(document.getElementById("roundTopBar")&&document.getElementById("bottomGroup")){var t=document.getElementById("roundTopBar").offsetHeight,a=document.getElementById("bottomGroup").offsetHeight;n.setState({height:e-t-a})}},n.toBottom=function(){var e=document.getElementsByClassName("messageBottom")[0];e&&e.scrollIntoView()},n.onLoadMore=function(){n.page=n.page+1,n.loadMessage()},n.loadMessage=function(){var e,t=n.state.message;t.length>0&&(e=t[0].id),0==e&&(e=null),Object(p.a)({url:"/chat.get",method:"post",data:{store_id:n.params.id,limit:n.limit,recall_from_id:e}}).then(function(e){var t=e.data.data,a=e.data.data.sdialogues.reverse();n.setState({refreshing:!1,store:t.store,titleName:t.store.name,message:a.concat(n.state.message)},function(){n.toBottom(),n.params.goods_id&&!n.hasSend&&n.loadGoods(n.params.goods_id)})})},n.loadNew=function(){n.isDistory||setTimeout(function(){n.loadNew(),n.loadNewMessage()},5e3)},n.loadNewMessage=function(){var e,t=n.state.message;e=t.length>0?t[t.length-1].id:0,Object(p.a)({url:"/chat.get",method:"post",data:{store_id:n.params.id,outlook_from_id:e}}).then(function(e){var t=e.data.data,a=e.data.data.sdialogues;n.setState({refreshing:!1,store:t.store,titleName:t.store?t.store.name:"",message:n.state.message.concat(a)},function(){a.length>0&&n.toBottom()})})},n.onSend=function(){var e=n.myInput.innerText,t=n.state.store;t&&n.props.dispatch(x.b(t.id,e))},n.addEmoji=function(e){},n.loadGoods=function(e){var t={goods_id:e};Object(p.a)({url:"/goods.get",params:t}).then(function(e){var t=e.data.data,a={id:t.id,img:t.cover,name:t.name,price:t.price,sales:t.sales},i=n.state.message,o={id:i.length>0?i[i.length-1].id:0,from:0};n.inList||(i.push(o),n.inList=!0),n.setState({goods:a})})},n.onSendGoods=function(){Object(p.a)({url:"/chat.send",method:"post",data:{store_id:n.state.store?n.state.store.id:0,content:JSON.stringify(n.state.goods),resource_type:3}}).then(function(e){n.setState({haveSend:!0},function(){n.loadNewMessage()})})},n.toDetail=function(e){f.a.push("/goodsdetail/".concat(e.id))},n.getChatView=function(e){var t;switch(3===e.resource_type&&(t=JSON.parse(e.content)),e.from){case 0:var a=n.state,i=a.goods,o=a.haveSend;return i&&!o?u.a.createElement("div",{className:"sendView"},u.a.createElement("div",{className:"drugGroup"},u.a.createElement(h.b,{src:i.img,style:{width:"0.6rem",height:"0.6rem",flex:"none"}}),u.a.createElement("div",{className:"drugContent"},u.a.createElement("div",null,i.name),u.a.createElement("div",{className:"amountGroup"},u.a.createElement("div",{className:"priceGroup"},u.a.createElement("div",{className:"pricePrefix"},"\uffe5"),u.a.createElement("div",null,parseFloat(i.price)),u.a.createElement("div",{className:"sales"},i.sales,"\u4eba\u5df2\u8d2d\u4e70")))),u.a.createElement("div",{className:"send",onClick:function(){n.onSendGoods()}},"\u53d1\u9001"))):u.a.createElement("div",null);case 1:return u.a.createElement("div",{className:"messageBody"},u.a.createElement("div",{className:"time"},P.a.unix(e.create_time).format("MM-DD HH:mm")),u.a.createElement("div",{className:"messageGroup right"},1===e.resource_type&&u.a.createElement("div",{className:"messageContent right"},e.content),2===e.resource_type&&u.a.createElement(h.b,{src:e.content,style:{width:"1.2rem",height:"0.8rem",marginRight:"0.05rem"},onClick:function(){Object(S.e)(e.content)}}),3===e.resource_type&&u.a.createElement("div",{className:"drugGroup",onClick:function(){n.toDetail(t)}},u.a.createElement(h.b,{src:t.img,style:{width:"0.6rem",height:"0.6rem",flex:"none"}}),u.a.createElement("div",{className:"drugContent"},u.a.createElement("div",null,t.name),u.a.createElement("div",{className:"amountGroup"},u.a.createElement("div",{className:"priceGroup"},u.a.createElement("div",{className:"pricePrefix"},"\uffe5"),u.a.createElement("div",null,parseFloat(t.price)),u.a.createElement("div",{className:"sales"},t.sales,"\u4eba\u5df2\u8d2d\u4e70"))))),u.a.createElement(h.a,{src:n.props.face,style:{width:"0.2rem",height:"0.2rem"}})));case 2:return u.a.createElement("div",{className:"messageBody "},u.a.createElement("div",{className:"time"},P.a.unix(e.create_time).format("MM-DD HH:mm")),u.a.createElement("div",{className:"messageGroup left"},u.a.createElement(h.a,{src:n.state.store?n.state.store.logo:"",style:{width:"0.2rem",height:"0.2rem"}}),1===e.resource_type&&u.a.createElement("div",{className:"messageContent left"},e.content),2===e.resource_type&&u.a.createElement(h.b,{src:e.content,style:{width:"1.2rem",height:"0.8rem",marginLeft:"0.05rem"},onClick:function(){Object(S.e)(e.content)}})))}},n.uploadFile=function(e){var t=new FormData;t.append("file",e.target.files[0]),C()({url:B.a+"/upload",header:{"content-type":"multipart/form-data"},method:"post",data:t}).then(function(e){var t=e.data.data[0].url,a=n.state.store;a&&n.props.dispatch(x.b(a.id,t,2))})},n.inputFocus=function(){window.scroll(0,0)},n}return Object(c.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.params=N.a.parse(window.location.search.split("?")[1]),this.reSizeHeight(),this.loadMessage(),this.loadNew();var e=this;document.documentElement.clientHeight||document.body.clientHeight;window.onresize=function(){document.documentElement.clientHeight||document.body.clientHeight;e.reSizeHeight(),e.toBottom()}}},{key:"componentWillUnmount",value:function(){this.isDistory=!0,Object(S.d)()}},{key:"componentWillReceiveProps",value:function(e,t){this.props.version!=e.version&&e.sendSuccess&&(this.myInput.innerText="",this.loadNewMessage())}},{key:"render",value:function(){var e=this,t=this.state,n=t.titleName;t.goods,t.haveSend;return u.a.createElement("div",{className:"--messageDetailPage"},u.a.createElement(w.a,{id:"roundTopBar",name:n,style:{background:"#ffffff"}}),u.a.createElement(o.a,{damping:60,ref:function(t){return e.ptr=t},style:{height:this.state.height,overflow:"auto"},indicator:{},direction:"down",refreshing:this.state.refreshing,onRefresh:function(){e.onLoadMore(),e.setState({refreshing:!0})}},u.a.createElement("div",{id:"messages"},this.state.message.map(function(t,n){return e.getChatView(t,n)}),u.a.createElement("div",{className:"messageBottom"}))),u.a.createElement("div",{id:"bottomGroup",className:"bottomGroup"},u.a.createElement("div",{className:"inputParent"},u.a.createElement("div",{className:"inputImg"},u.a.createElement("input",{type:"file",className:"imageUp",accept:"image/*",onBlur:this.inputFocus,onFocus:this.inputFocus,onChange:function(t){return e.uploadFile(t)}}),u.a.createElement(h.b,{src:v.a,style:{position:"absolute",marginLeft:"0.12rem",marginRight:"0.12rem",width:"0.2rem",height:"0.35rem"}})),u.a.createElement("div",{className:"inputGroup"},u.a.createElement("div",{ref:function(t){e.myInput=t},className:"input",contenteditable:"true",onBlur:this.inputFocus,onFocus:this.inputFocus})),u.a.createElement("div",{className:"inputSend",onClick:function(){e.onSend()}},"\u53d1\u9001")),u.a.createElement("div",{className:"emoji"},u.a.createElement(b.a,{onSelect:this.addEmoji}))))}}]),t}(u.a.Component))||a)||a;t.default=A},756:function(e,t,n){"use strict";var a=n(21),i=n(22),o=n(24),r=n(23),s=n(25),m=n(0),l=n.n(m),c=n(283),d=(n(63),n(80));t.a=function(e){var t,n;return n=t=function(t){function n(e){var t;return Object(a.a)(this,n),(t=Object(o.a)(this,Object(r.a)(n).call(this,e))).componentDidCache=function(){t.setState({render:!1})},t.componentDidRecover=function(){t.setState({render:!0})},t.state={render:!0},e.cacheLifecycles&&e.cacheLifecycles.didCache(t.componentDidCache),e.cacheLifecycles&&e.cacheLifecycles.didRecover(t.componentDidRecover),t}return Object(s.a)(n,t),Object(i.a)(n,[{key:"render",value:function(){return!d.a.getState().login.isLogin&&this.state.render?l.a.createElement(c.a,{to:"/login"}):l.a.createElement(e,this.props)}}]),n}(l.a.Component),t.displayName=e.displayName||e.name+"_HOC"||"Component_HOC",n}},783:function(e,t,n){"use strict";var a="";a=window.location.href.indexOf("mall.kangcemall.cn")>-1?"https://commonapi.e6kang.cn":window.location.href.indexOf("mall.kangcemall.net")>-1?"http://commonapi.e6kang.net":window.location.href.indexOf("mall.kangcemall.top")>-1?"http://commonapi.e6kang.top":"https://commonapi.e6kang.com",t.a=a},925:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA2CAYAAACbZ/oUAAAAAXNSR0IArs4c6QAABaRJREFUaAXtml9MHEUYwGfmjisiV62GhIZI/VfFoCY++LdWqTH6VI3aEGtSjWnKWYvEUISSAC7QWsDSRKpVIJpq1FYeSKO+aIhUebDVB7U+2Bhb0QZi/RNKr8U79nY/vzmcdm937nb3/tDl2kn2Zueb2fm+387O7DffHiEXWKKC9/kt26/XQb8OYnpQyBZ6znwkBoROlhaVHVaUZyOchw4NDflGDh55Dwg8tdABk9pP6W/MTx7t7277gY0cOrI5r2H5XQBYBjHYxweXYWld0juTRxUApOLAt+MlDIDelEdcqVFodIkfR9hnbsUoqzPLFloZiP4kjuo9Rrs1zUcR2Jr6e1t3WaULS1JT316JFicAcwKcwxdWugic7+N9cYTzfYSlq7QXoBVl1D9xZmwF08mNQEkAdPr7En9gtKenKZyJfZ4DVhRgk6c7aydOjbWgj1CiczqY+zkZi0Zr6jsGfYGCtje7mqfSAffUHH6hr2/RZLhzP+jwGoc1A6HPvwiPWk1VD9U2dF5jrndS9hRwZHzqDQBYbWc4tlke1eGTGqW/yK6tud4zwBsbt96Fxq03G5i8DJUkfOLF5PXyGs8AxzQ9ZDWRAqV0Px7vEEqtixWA5BprL0aJZ4DRqPuNhsXPKakd6G17DI/16PWvoISqxja4lpW7ncueAaZASo0w/PzSYPBDIRvobvsRFzI8EpNKwHJdYovEUtZeS5uaX7lSU2FpafHynxWlejZRjX0JR+sUtrrE2DJ6JnwLlse4rLGxOzgVi1zNzxMS+KcTyjaFjIE3btl+bUxVB2ej6gNc10T4p0hoc8e2pcGVXYqyKmaj/1w1Jd/j+/bhcwJCNJ18EHqpowVX5X9OapFGrLvCWI8RyNOBZcVHjTK784we6ecatt0cm1UPYswoDhtXBqRQB+icCI/t5d6SnQGinhK2V5yLHEGv0jV4F3TyKW7m7xNykWNEcnhXXV1UlJ3kaQNzWE3XvpA5CHHFAGvcQD945w3vE0oOOzGat8HRnfEHCtpl7Wuaui5Dd/RuWV1awLawQpML6Orqao0y9jiinBCXJ8spJTFK2Tp0L4+Z28Rh1ejnOD1uNdfxsmtgx7BCmwvogVdbjxYQdju+fr4Ul1tySn8lPvIQhqGGzXVnYQm5w1wnyq6AU8HiI3YMHYRmHKG4qy8UxHMX0Lt3thwf2NlW5WNsFYL3ocPxGeajmO8hjK4tC1ZUDPS8PJrQPxacwPJrHC8qdrB+4qva3dtyPNTQ+Zeuk0Gc23gPDGkOmuBCttbJ6v3WjtYDeDU/bJNTWN6RoxF2BIsjwzvs39H6NmN0Q6YjzftyktzA8v5sgd3ACgPnC9otrC1wOrDzBZ0KFufSDK4n3wlbjHnSEc4EVijI1UjbwTLGVqMz9I2ww5hLgbMBK5RkG9oJLC546BDJkxQ4mQfFXz3x1fj/BUrepVWaLehMYbllUmCZu5gurMDPFDobsCmAhZlzeaaword0obMF6wg4W7DpQmcT1hY427BuobMNmxI4V7BOoSfDYx8B3/VINgJo2wx/9aRajYUecy5dtHINK4xINadx849bReuuJxNYrlcKHPAXruS7FmFYLvNU0Ga9mcLy/qTAr/c0TZqV5bLsBBq3iP+m+xgbbZcCGxvM17kdNG42vy4tvverTO3xDDAHSQmNgUI3MbJkN8ZTwA6gXQUGZdCeA841tCeBcwlNN9S3W4JujJFHZI/D+ZDhXx2ewY/gT8h04yZ/mFLYI6vTgW7CPXHClwxGCyoxiMejjIkBNwzCfSzr5PzILONx1gzunOAXCe6gSJL8OoZB7V8krfNSRAv1afw3LVgC2vlIi47LxG3lJX+yssXlCj7W8U+S+QjKmXCuT2Po+OlQKKSie0owOA7sj8jWKlBJJc6Jy7ksLxIFFVen8cXFRSO9SsPfnOk/XCErV7xnYJsAAAAASUVORK5CYII="},928:function(e,t,n){var a=n(929);"string"===typeof a&&(a=[[e.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(46)(a,i);a.locals&&(e.exports=a.locals)},929:function(e,t,n){(e.exports=n(45)(!1)).push([e.i,".\\--messageDetailPage {\n  display: flex;\n  flex-direction: column;\n  background: #f5f6f8;\n  width: 100vw;\n  height: 100vh;\n}\n.\\--messageDetailPage .sendView {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  top: 0.5rem;\n  width: 100%;\n  margin-top: 0.2rem;\n  margin-bottom: 0.2rem;\n}\n.\\--messageDetailPage .sendView .drugGroup {\n  display: flex;\n  justify-content: center;\n  flex-direction: row;\n  width: 85%;\n  background: white;\n  border-radius: 0.05rem;\n  padding: 0.1rem;\n}\n.\\--messageDetailPage .sendView .drugGroup .drugContent {\n  display: flex;\n  flex: auto;\n  flex-direction: column;\n  justify-content: space-between;\n  margin-left: 0.1rem;\n  margin-top: 0.03rem;\n}\n.\\--messageDetailPage .sendView .drugGroup .drugContent .amountGroup {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n.\\--messageDetailPage .sendView .drugGroup .drugContent .amountGroup .priceGroup {\n  display: flex;\n  flex-direction: row;\n  color: #FF5000;\n  align-items: flex-end;\n}\n.\\--messageDetailPage .sendView .drugGroup .drugContent .amountGroup .priceGroup .pricePrefix {\n  font-size: 0.12rem;\n  margin-bottom: 0.01rem;\n}\n.\\--messageDetailPage .sendView .drugGroup .drugContent .amountGroup .priceGroup .sales {\n  margin-left: 0.1rem;\n  font-size: 0.12rem;\n  margin-bottom: 0.01rem;\n  color: #657281;\n}\n.\\--messageDetailPage .sendView .send {\n  background: #ffb516;\n  color: white;\n  border-radius: 0.05rem;\n  margin: auto;\n  width: 0.6rem;\n  text-align: center;\n  line-height: 0.2rem;\n  height: 0.2rem;\n}\n.\\--messageDetailPage .bottomGroup {\n  display: flex;\n  position: absolute;\n  flex-direction: column;\n  width: 100%;\n  bottom: 0;\n}\n.\\--messageDetailPage .inputParent {\n  padding-top: 0.1rem;\n  padding-bottom: 0.1rem;\n  display: flex;\n  flex-direction: row;\n  background: white;\n  width: 100%;\n  height: auto;\n}\n.\\--messageDetailPage .inputParent .inputImg {\n  marginleft: 0.12rem;\n  marginright: 0.12rem;\n  width: 0.4rem;\n  height: 0.35rem;\n  position: relative;\n  overflow: hidden;\n  flex: none;\n}\n.\\--messageDetailPage .inputParent .inputImg .imageUp {\n  position: absolute;\n  opacity: 0;\n  height: 100%;\n  width: 100%;\n  left: 0;\n  top: 0;\n  z-index: 1;\n}\n.\\--messageDetailPage .inputParent .inputGroup {\n  min-height: 0.25rem;\n  flex: auto;\n  height: auto;\n  background: #f5f6f8;\n  border-radius: 0.18rem;\n  margin-right: 0.12rem;\n  padding: 0rem 0.2rem 0rem 0.05rem;\n}\n.\\--messageDetailPage .inputParent .inputGroup .input {\n  width: 100%;\n  word-break: break-all;\n  padding: 0.1rem 0.1rem 0.1rem 0.1rem;\n}\n.\\--messageDetailPage .inputParent .inputSend {\n  flex: none;\n  height: 0.35rem;\n  line-height: 0.35rem;\n  margin-right: 0.2rem;\n  color: #3776ec;\n  font-size: 0.14rem;\n}\n.\\--messageDetailPage .messages {\n  display: flex;\n  flex-direction: column;\n}\n.\\--messageDetailPage .messageBody {\n  display: flex;\n  flex-direction: column;\n  flex: none;\n}\n.\\--messageDetailPage .messageBody .time {\n  text-align: center;\n  height: 0.4rem;\n  line-height: 0.4rem;\n}\n.\\--messageDetailPage .messageBody .messageGroup {\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 0.1rem;\n}\n.\\--messageDetailPage .messageBody .messageGroup.left {\n  margin-left: 0.1rem;\n}\n.\\--messageDetailPage .messageBody .messageGroup.right {\n  margin-right: 0.1rem;\n  justify-content: flex-end;\n}\n.\\--messageDetailPage .messageBody .drugGroup {\n  display: flex;\n  flex-direction: row;\n  width: 80%;\n  margin-right: 0.1rem;\n  background: white;\n  border-radius: 0.05rem;\n  padding: 0.1rem;\n}\n.\\--messageDetailPage .messageBody .drugGroup .drugContent {\n  display: flex;\n  flex: auto;\n  flex-direction: column;\n  justify-content: space-between;\n  margin-left: 0.1rem;\n  margin-top: 0.03rem;\n}\n.\\--messageDetailPage .messageBody .drugGroup .drugContent .amountGroup {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n.\\--messageDetailPage .messageBody .drugGroup .drugContent .amountGroup .priceGroup {\n  display: flex;\n  flex-direction: row;\n  color: #FF5000;\n  align-items: flex-end;\n}\n.\\--messageDetailPage .messageBody .drugGroup .drugContent .amountGroup .priceGroup .pricePrefix {\n  font-size: 0.12rem;\n  margin-bottom: 0.01rem;\n}\n.\\--messageDetailPage .messageBody .drugGroup .drugContent .amountGroup .priceGroup .sales {\n  margin-left: 0.1rem;\n  font-size: 0.12rem;\n  margin-bottom: 0.01rem;\n  color: #657281;\n}\n.\\--messageDetailPage .messageBody .messageContent {\n  word-break: break-all;\n  padding: 0.05rem 0.1rem;\n}\n.\\--messageDetailPage .messageBody .messageContent.left {\n  margin-left: 0.1rem;\n  margin-right: 0.4rem;\n  background: #ffffff;\n  border: 0.05rem solid #ffffff;\n  border-radius: 0.05rem;\n}\n.\\--messageDetailPage .messageBody .messageContent.right {\n  margin-right: 0.1rem;\n  margin-left: 0.4rem;\n  color: white;\n  background: #3776ec;\n  border: 0.1rem solid rgba(55, 118, 236, 0.1);\n  border-radius: 0.05rem;\n}\n.\\--messageDetailPage .emoji {\n  display: none;\n}\n.\\--messageDetailPage .emoji-mart {\n  width: 100% !important;\n}\n.\\--messageDetailPage .emoji-mart-search {\n  display: none;\n  overflow: hidden !important;\n}\n.\\--messageDetailPage .emoji-mart-category:nth-child(2) {\n  display: none;\n}\n.\\--messageDetailPage .emoji-mart-category-label {\n  display: none;\n  overflow: hidden !important;\n}\n.\\--messageDetailPage .emoji-mart-bar {\n  display: none;\n  overflow: hidden !important;\n}\n",""])}}]);
//# sourceMappingURL=52.1267b434.chunk.js.map