(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{1142:function(e,n,t){var a=t(1143);"string"===typeof a&&(a=[[e.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};t(46)(a,i);a.locals&&(e.exports=a.locals)},1143:function(e,n,t){(e.exports=t(45)(!1)).push([e.i,".applyInfo {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n}\n.applyInfo .topBar {\n  height: 44px;\n  width: 100%;\n}\n.applyInfo .content {\n  flex: 1;\n  overflow: scroll;\n  background: #fff;\n}\n.applyInfo .content .item {\n  display: flex;\n  padding: 20px;\n  background: #fff;\n  justify-content: space-between;\n  align-items: center;\n  color: #2D343B;\n  font-size: 14px;\n}\n.applyInfo .content .item .input {\n  width: 2.00rem;\n}\n.applyInfo .content .item .rightView {\n  display: flex;\n  align-items: center;\n}\n.applyInfo .content .item .code-btn {\n  margin-left: 0.1rem;\n  background: #3776EC;\n  height: 0.25rem;\n  width: 0.77rem;\n  line-height: 0.25rem;\n  text-align: center;\n  color: #FFFFFF;\n  font-size: 0.12rem;\n  flex-shrink: 0;\n  border-radius: 0.125rem;\n}\n.applyInfo .content .item .code-btn.countDown {\n  color: #FE1954;\n}\n.applyInfo .content .lineView {\n  height: 1px;\n  margin-left: 7px;\n  margin-right: 7px;\n  background: #F5F6F8;\n}\n.applyInfo .content .listInput .mobileDesc {\n  padding: 10px 20px 20px 20px;\n  color: #A1ADB9;\n  font-size: 12px;\n}\n.applyInfo .content .idUpload .title {\n  color: #2D343B;\n  font-size: 0.14rem;\n  margin-left: 0.15rem;\n}\n.applyInfo .content .idUpload .idUploadk {\n  padding: 0.15rem;\n  display: flex;\n  justify-content: space-between;\n}\n.applyInfo .content .idUpload .idUploadk .uploadView {\n  border: 1px dashed #A1ADB9;\n  width: 1.6rem;\n  height: 1.05rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n}\n.applyInfo .content .idUpload .idUploadk .uploadView .image {\n  height: 100%;\n  width: 100%;\n}\n.applyInfo .content .idUpload .idUploadk .uploadView .imageUp {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 1.6rem;\n  height: 1.05rem;\n  opacity: 0;\n}\n.applyInfo .content .idUpload .idUploadk .uploadView .centerT {\n  color: #A1ADB9;\n}\n.applyInfo .content .license_image_div {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.15rem;\n}\n.applyInfo .content .license_image_div .license_imageView .title {\n  color: #2D343B;\n  margin-bottom: 0.1rem;\n}\n.applyInfo .content .license_image_div .license_imageView .uploadView {\n  border: 1px dashed #A1ADB9;\n  width: 1.6rem;\n  height: 1.05rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n}\n.applyInfo .content .license_image_div .license_imageView .uploadView .image {\n  height: 100%;\n  width: 100%;\n}\n.applyInfo .content .license_image_div .license_imageView .uploadView .imageUp {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 1.6rem;\n  height: 1.05rem;\n  opacity: 0;\n}\n.applyInfo .content .license_image_div .license_imageView .uploadView .centerT {\n  color: #A1ADB9;\n}\n.applyInfo .content .agreeDiv {\n  margin-bottom: 0.3rem;\n}\n.applyInfo .content .agreeDiv .agreeView {\n  display: flex;\n  justify-content: center;\n}\n.applyInfo .content .agreeDiv .agreeView .agree {\n  display: flex;\n  align-items: center;\n}\n.applyInfo .content .agreeDiv .agreeView .agree .queding {\n  width: 0.12rem;\n  height: 0.12rem;\n}\n.applyInfo .content .agreeDiv .xieyi {\n  margin-top: 0.1rem;\n  justify-content: center;\n  display: flex;\n  color: #3776EC;\n  font-size: 0.12rem;\n}\n.applyInfo .content .agreeDiv .commitBtn {\n  margin-top: 0.1rem;\n  margin-left: 0.42rem;\n  margin-right: 0.42rem;\n  height: 0.45rem;\n  border-radius: 0.225rem;\n  background-color: #3776EC;\n  color: #fff;\n  font-size: 16px;\n  font-weight: bold;\n  line-height: 0.45rem;\n  text-align: center;\n}\n",""])},1207:function(e,n,t){"use strict";t.r(n);t(304);var a,i=t(212),l=t.n(i),c=(t(303),t(107)),o=t.n(c),r=t(99),s=t(21),m=t(22),p=t(24),d=t(23),u=t(25),g=t(42),h=t(0),f=t.n(h),v=t(19),b=t(127),y=t(11),E=t(63),w=t(769),x=t(214),_=t(47),N=t.n(_),A=(t(1142),t(159)),C=t.n(A),k=t(842),I=t.n(k),V=t(783),D=Object(E.b)(function(e){return Object(g.a)({},e.seller,e.login)})(a=function(e){function n(e){var t;return Object(s.a)(this,n),(t=Object(p.a)(this,Object(d.a)(n).call(this,e))).callAction=function(){console.log("\u6253\u7535\u8bdd"),t.setState({phoneVisible:!0})},t.cancelAction=function(){t.setState({phoneVisible:!1})},t.confirmAction=function(){t.setState({phoneVisible:!1})},t.inputOnChange=function(e,n){t.setState(Object(r.a)({},e,n.target.value))},t.saveAction=function(){var e=t.state,n={type:e.type,btntext:e.btntext,nickname:e.nickname,store_name:e.store_name,identity_card_number:e.identity_card_number,phone:e.phone,code:e.code,identity_card_image:e.identity_card_image,identity_card_rear_image:e.identity_card_rear_image,business_license_image:e.business_license_image,business_license_number:e.business_license_number,business_license_expires:e.business_license_expires,open_account_licence_image:e.open_account_licence_image},a="/seller.add";t.props.seller&&2==t.props.seller.check_status&&(a="/seller.edit",n.store_id=t.props.seller.id),t.setState({animating:!0}),Object(y.a)({url:a,data:n,method:"post"}).then(function(e){t.setState({animating:!1}),(0,t.props.dispatch)(x.b()),v.a.go(-3)}).catch(function(e){t.setState({animating:!1})})},t.uploadFile=function(e,n){console.log("file",e.target.files[0]);var a=new FormData;a.append("file",e.target.files[0]),console.log(V.a),C()({url:V.a+"/upload",header:{"content-type":"multipart/form-data"},method:"post",data:a}).then(function(e){console.log(e);var a=e.data.data[0].url;t.setState(Object(r.a)({},n,a))})},t.state={btntext:"\u83b7\u53d6\u9a8c\u8bc1\u7801",countDown:!1,type:3,animating:!1,phoneVisible:!1},t}return Object(u.a)(n,e),Object(m.a)(n,[{key:"componentWillMount",value:function(){var e=N.a.parse(window.location.search.split("?")[1]);e&&e.type&&this.setState({type:e.type})}},{key:"handleSendCode",value:function(){var e=this;if(this.state.phone&&11==this.state.phone.length){var n={phone:this.state.phone};this.setState({animating:!0}),Object(y.a)({url:"/platform.code",params:n}).then(function(n){e.sendCodeCountDown(),e.setState({animating:!1})}).catch(function(n){e.setState({animating:!1})})}else o.a.fail("\u624b\u673a\u53f7\u683c\u5f0f\u4e0d\u6b63\u786e",1)}},{key:"sendCodeCountDown",value:function(){var e=this,n=60;this.setState({btntext:--n+"s",countDown:!0});var t=setInterval(function(){e.setState({btntext:--n+"s",countDown:!0}),-1==n&&(clearInterval(t),e.setState({btntext:"\u83b7\u53d6\u9a8c\u8bc1\u7801",countDown:!1}))},1e3)}},{key:"chengnuo",value:function(){v.a.push("/applyopenshop/commitment")}},{key:"xieyi",value:function(){v.a.push("/applyopenshop/agreement")}},{key:"render",value:function(){var e=this,n=this.state,t=n.type,a=n.countDown,i=n.btntext,c=n.nickname,o=n.store_name,r=n.identity_card_number,s=n.phone,m=n.code,p=n.identity_card_image,d=n.identity_card_rear_image,u=n.business_license_image,g=n.business_license_number,h=(n.business_license_expires,n.open_account_licence_image),v=f.a.createElement("div",null,f.a.createElement("div",{className:"item"},f.a.createElement("div",null,"\u7edf\u4e00\u793e\u4f1a\u4fe1\u7528\u4ee3\u7801"),f.a.createElement("div",null,f.a.createElement("input",{type:"text",value:g,placeholder:"\u8bf7\u8f93\u5165",className:"input",style:{textAlign:"right"},onChange:this.inputOnChange.bind(this,"business_license_number")}))),f.a.createElement("div",{className:"lineView",style:{marginBottom:"0.2rem"}}));return f.a.createElement("div",{className:"applyInfo"},f.a.createElement(b.b,{className:"topBar",name:"\u5165\u9a7b\u4fe1\u606f\u586b\u5199",rightTitle:"\u8054\u7cfb\u5ba2\u670d",onRightClick:this.callAction}),f.a.createElement("div",{className:"content"},f.a.createElement("div",{className:"listInput"},f.a.createElement("div",{className:"item"},f.a.createElement("div",null,"\u5e97\u94fa\u540d\u79f0"),f.a.createElement("div",null,f.a.createElement("input",{type:"text",value:o,placeholder:"\u8bf7\u8f93\u5165\u4f60\u7684\u5e97\u94fa\u540d\u79f0",className:"input",style:{textAlign:"right"},onChange:this.inputOnChange.bind(this,"store_name")}))),f.a.createElement("div",{className:"lineView"}),f.a.createElement("div",{className:"item"},f.a.createElement("div",null,"\u59d3\u540d"),f.a.createElement("div",null,f.a.createElement("input",{type:"text",value:c,placeholder:"\u8bf7\u8f93\u5165\u5e97\u4e3b\u59d3\u540d",style:{textAlign:"right"},onChange:this.inputOnChange.bind(this,"nickname")}))),f.a.createElement("div",{className:"lineView"}),f.a.createElement("div",{className:"item"},f.a.createElement("div",null,"\u8eab\u4efd\u8bc1\u53f7\u7801"),f.a.createElement("div",null,f.a.createElement("input",{type:"text",value:r,placeholder:"\u8bf7\u8f93\u5165\u5e97\u4e3b\u7684\u8eab\u4efd\u8bc1\u53f7\u7801",className:"input",style:{textAlign:"right"},onChange:this.inputOnChange.bind(this,"identity_card_number")}))),f.a.createElement("div",{className:"lineView"}),f.a.createElement("div",{className:"item"},f.a.createElement("div",null,"\u624b\u673a\u53f7\u7801"),f.a.createElement("div",null,f.a.createElement("input",{type:"text",value:s,placeholder:"\u8bf7\u8f93\u5165\u5e97\u4e3b\u7684\u624b\u673a\u53f7\u7801",style:{textAlign:"right"},onChange:this.inputOnChange.bind(this,"phone")}))),f.a.createElement("div",{className:"lineView"}),f.a.createElement("div",{className:"item"},f.a.createElement("div",null,"\u9a8c\u8bc1\u7801"),f.a.createElement("div",{className:"rightView"},f.a.createElement("input",{type:"text",value:m,placeholder:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",style:{textAlign:"right"},onChange:this.inputOnChange.bind(this,"code")}),f.a.createElement("div",{className:"code-btn "+(a?"countDown":""),onClick:this.handleSendCode.bind(this)},i))),f.a.createElement("div",{className:"lineView"}),f.a.createElement("div",{className:"mobileDesc"},"\u6b64\u624b\u673a\u53f7\u7801\u5c06\u7528\u4e8e\u767b\u5f55\u5546\u5bb6\u7aef\u540e\u53f0\uff0c\u8bf7\u51c6\u786e\u586b\u5199")),3==t&&v,f.a.createElement("div",{className:"idUpload"},f.a.createElement("div",{className:"title"},3==t?"\u4e0a\u4f20\u8eab\u4efd\u8bc1":"\u4e0a\u4f20\u6cd5\u4eba\u8eab\u4efd\u8bc1"),f.a.createElement("div",{className:"idUploadk"},f.a.createElement("div",{className:"uploadView"},f.a.createElement("input",{type:"file",className:"imageUp",accept:"image/*",onChange:function(n){return e.uploadFile(n,"identity_card_image")}}),p?f.a.createElement("img",{className:"image",src:p}):f.a.createElement("div",{className:"centerT"},"\u6b63\u9762\u4e0a\u4f20")),f.a.createElement("div",{className:"uploadView"},f.a.createElement("input",{type:"file",className:"imageUp",accept:"image/*",onChange:function(n){return e.uploadFile(n,"identity_card_rear_image")}}),d?f.a.createElement("img",{className:"image",src:d}):f.a.createElement("div",{className:"centerT"},"\u53cd\u9762\u4e0a\u4f20")))),1!=t&&f.a.createElement("div",{className:"license_image_div"},f.a.createElement("div",{className:"license_imageView"},f.a.createElement("div",{className:"title"},2==t?"\u4e0a\u4f20\u4e2a\u4f53\u5de5\u5546\u6237\u8425\u4e1a\u6267\u7167":"\u4e0a\u4f20\u4f01\u4e1a\u8425\u4e1a\u6267\u7167"),f.a.createElement("div",{className:"uploadView"},f.a.createElement("input",{type:"file",className:"imageUp",accept:"image/*",onChange:function(n){return e.uploadFile(n,"business_license_image")}}),u?f.a.createElement("img",{className:"image",src:u}):f.a.createElement("div",{className:"centerT"},"\u70b9\u51fb\u4e0a\u4f20"))),3==t&&f.a.createElement("div",{className:"license_imageView"},f.a.createElement("div",{className:"title"},"\u4e0a\u4f20\u4f01\u4e1a\u5f00\u6237\u8bb8\u53ef\u8bc1"),f.a.createElement("div",{className:"uploadView"},f.a.createElement("input",{type:"file",className:"imageUp",accept:"image/*",onChange:function(n){return e.uploadFile(n,"open_account_licence_image")}}),h?f.a.createElement("img",{className:"image",src:h}):f.a.createElement("div",{className:"centerT"},"\u70b9\u51fb\u4e0a\u4f20")))),f.a.createElement("div",{className:"agreeDiv"},f.a.createElement("div",{className:"agreeView"},f.a.createElement("div",{className:"agree"},f.a.createElement("img",{src:I.a,className:"queding"}),f.a.createElement("div",null,"\u6211\u5df2\u9605\u8bfb\u5e76\u540c\u610f"))),f.a.createElement("div",{className:"xieyi"},f.a.createElement("div",{onClick:this.chengnuo},"\u300a\u5546\u5bb6\u8bda\u4fe1\u7ecf\u8425\u627f\u8bfa\u4e66\u300b"),f.a.createElement("div",{onClick:this.xieyi},"\u300a\u5eb7\u7b56\u826f\u54c1\u5e73\u53f0\u5408\u4f5c\u534f\u8bae\u300b")),f.a.createElement("div",{className:"commitBtn",onClick:this.saveAction},"\u63d0\u4ea4\u7533\u8bf7")),f.a.createElement(w.a,{visible:this.state.phoneVisible,phone:this.props.service_phone,onCancel:this.cancelAction,onConfirm:this.confirmAction}),f.a.createElement(l.a,{toast:!0,text:"Loading...",animating:this.state.animating})))}}]),n}(f.a.Component))||a;n.default=D},769:function(e,n,t){"use strict";t(762);var a=t(763),i=t.n(a),l=t(21),c=t(22),o=t(24),r=t(23),s=t(25),m=t(0),p=t.n(m),d=(t(770),function(e){function n(e){return Object(l.a)(this,n),Object(o.a)(this,Object(r.a)(n).call(this,e))}return Object(s.a)(n,e),Object(c.a)(n,[{key:"render",value:function(){var e=this.props,n=e.visible,t=e.onCancel,a=e.onConfirm,l=e.title,c=e.cancelTitle,o=e.okTitle,r=e.phone;return console.log("phone",r),p.a.createElement(i.a,{maskClosable:!1,popup:!0,visible:n,animationType:"slide-up"},p.a.createElement("div",{className:"alertContent"},p.a.createElement("div",{className:"title"},r?"\u662f\u5426\u62e8\u6253\u5ba2\u670d\u7535\u8bdd "+r:l),p.a.createElement("div",{className:"buttons"},p.a.createElement("div",{className:"cancel",onClick:t},c||"\u53d6\u6d88"),p.a.createElement("div",{className:"confirm",onClick:a},r?p.a.createElement("a",{className:"a",href:"tel:"+r},o||"\u786e\u5b9a"):p.a.createElement("div",null,o||"\u786e\u5b9a")))))}}]),n}(p.a.Component));n.a=d},770:function(e,n,t){var a=t(771);"string"===typeof a&&(a=[[e.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};t(46)(a,i);a.locals&&(e.exports=a.locals)},771:function(e,n,t){(e.exports=t(45)(!1)).push([e.i,".alertContent {\n  height: 1.42rem;\n  width: 100%;\n  background: #fff;\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n  color: #2D343B;\n}\n.alertContent .title {\n  font-weight: bold;\n  text-align: center;\n  font-size: 16px;\n  margin: 30px 0px 20px 0px;\n}\n.alertContent .buttons {\n  display: flex;\n  padding-left: 0.2rem;\n  padding-right: 0.2rem;\n  font-size: 14px;\n  justify-content: space-between;\n}\n.alertContent .buttons .cancel {\n  width: 1.4rem;\n  height: 0.4rem;\n  border-radius: 0.2rem;\n  text-align: center;\n  line-height: 0.4rem;\n  border: 1px solid #DBE0E5;\n}\n.alertContent .buttons .confirm {\n  width: 1.4rem;\n  height: 0.4rem;\n  border-radius: 0.2rem;\n  text-align: center;\n  line-height: 0.4rem;\n  background: #FFB516;\n}\n.alertContent .buttons .confirm .a {\n  color: #fff;\n  height: 100%;\n  width: 100%;\n  display: block;\n}\n.am-modal-body {\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n}\n.am-modal-content {\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n}\n",""])},783:function(e,n,t){"use strict";var a="";a=window.location.href.indexOf("mall.kangcemall.cn")>-1?"https://commonapi.e6kang.cn":window.location.href.indexOf("mall.kangcemall.net")>-1?"http://commonapi.e6kang.net":window.location.href.indexOf("mall.kangcemall.top")>-1?"http://commonapi.e6kang.top":"https://commonapi.e6kang.com",n.a=a},842:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAnhJREFUWAnNmDFoFEEUhv+3dyS53CUBhUAEUUSrAwsLE4sgiE0qSa1dksb0MVgKSkinoIV6nVjYJGUKTaFFkiqgpBFBLCSNCSh3iZ7ejfPPZuBuvb3bzd7s+Yq9mzez73375u3b4QmORCklVxb3Z/VwBlBFpVCwcy5+RVAGZEfbLm0snXguIop+hJfJu5Wxau3wBRSucZy6CNb7Mrlb7x7kdz1GpqcwfHodCDKQRSbu7M3pP09Tj0qDw8KA4OKZLD58qd3Oar3Omd5J8XQWD2eGUMh52P78574GUsVe4RDm0ewQ8gOeQRgdlhGdQ27fprCHDcLU6wpP1g48Hy3sLkd6u002MoS596qMN++rSB3IwjBnKBZmbbtqxqkCdYIhUWpAUWBSA4oKkwpQHBjnQHFhDNDZ0QzmpwZx6RyLdveEMCx6YW9TmCf5+PW3unAqC/09w/JKBStbv8LWRtZbmGCdsa92O0PeYdUcQ6DPI1iYzmN6vL/d+o5zdpuOA0Pj3vJqBd8rdeMoKZSNTNxtanxK79NuDfPPfiSGShoZC2UKY1IoC5MkMk1AHBwXqpsw5Gj6dMSF6jbMP0BURIVyAdMSKAqUKxj6lvGFb34h4igg58cyeDw3jJG8v7Msni/f/sSNy/2xK3DAdOiwKYeCq1pt382rOWcw9N8WiAuCUNRRgic9X5v82hGILoJQrmDoKxJQI9R+uW4O5FE+lLwvrrRN6lbGBvuAA/883mo6sc7zuxDR7biEIYveMtMSiU7kdKXsMIdKTn3EM14StkAmFvde96w3ZIF1j2hz6eR1nUOi2CzSrat1O5f671HDiiymg0YARup/aOn9BYC0mxoV4Y+1AAAAAElFTkSuQmCC"}}]);
//# sourceMappingURL=40.d22af96f.chunk.js.map