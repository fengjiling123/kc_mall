(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{1035:function(e,t,n){"use strict";n(128),n(1036)},1036:function(e,t,n){var a=n(1037);"string"===typeof a&&(a=[[e.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(46)(a,i);a.locals&&(e.exports=a.locals)},1037:function(e,t,n){(e.exports=n(45)(!1)).push([e.i,'.am-switch {\n  display: inline-block;\n  vertical-align: middle;\n  box-sizing: border-box;\n  position: relative;\n  cursor: pointer;\n  align-self: center;\n}\n.am-switch .checkbox {\n  width: 51px;\n  height: 31px;\n  border-radius: 31px;\n  box-sizing: border-box;\n  background: #e5e5e5;\n  z-index: 0;\n  margin: 0;\n  padding: 0;\n  appearance: none;\n  border: 0;\n  cursor: pointer;\n  position: relative;\n  transition: all 300ms;\n}\n.am-switch .checkbox:before {\n  content: \' \';\n  position: absolute;\n  left: 1.5px;\n  top: 1.5px;\n  width: 48px;\n  height: 28px;\n  border-radius: 28px;\n  box-sizing: border-box;\n  background: #fff;\n  z-index: 1;\n  transition: all 200ms;\n  transform: scale(1);\n}\n.am-switch .checkbox:after {\n  content: \' \';\n  height: 28px;\n  width: 28px;\n  border-radius: 28px;\n  background: #fff;\n  position: absolute;\n  z-index: 2;\n  left: 1.5px;\n  top: 1.5px;\n  transform: translateX(0);\n  transition: all 200ms;\n  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.21);\n}\n.am-switch .checkbox.checkbox-disabled {\n  z-index: 3;\n}\n.am-switch input[type="checkbox"] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  border: 0 none;\n  appearance: none;\n}\n.am-switch input[type="checkbox"]:checked + .checkbox {\n  background: #4dd865;\n}\n.am-switch input[type="checkbox"]:checked + .checkbox:before {\n  transform: scale(0);\n}\n.am-switch input[type="checkbox"]:checked + .checkbox:after {\n  transform: translateX(20px);\n}\n.am-switch input[type="checkbox"]:disabled + .checkbox {\n  opacity: 0.3;\n}\n.am-switch.am-switch-android .checkbox {\n  width: 72px;\n  height: 23px;\n  border-radius: 3px;\n  background: #a7aaa6;\n}\n.am-switch.am-switch-android .checkbox:before {\n  display: none;\n}\n.am-switch.am-switch-android .checkbox:after {\n  width: 35px;\n  height: 21px;\n  border-radius: 2px;\n  box-shadow: none;\n  left: 1PX;\n  top: 1PX;\n}\n.am-switch.am-switch-android input[type="checkbox"]:checked + .checkbox {\n  background: #3776EC;\n}\n.am-switch.am-switch-android input[type="checkbox"]:checked + .checkbox:before {\n  transform: scale(0);\n}\n.am-switch.am-switch-android input[type="checkbox"]:checked + .checkbox:after {\n  transform: translateX(35px);\n}\n',""])},1038:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=u(n(41)),i=u(n(43)),r=u(n(31)),o=u(n(32)),c=u(n(26)),l=u(n(33)),s=u(n(20)),d=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0));function u(e){return e&&e.__esModule?e:{default:e}}var p=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&(n[a[i]]=e[a[i]])}return n},h=function(e){function t(){(0,r.default)(this,t);var e=(0,c.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.onChange=function(t){var n=t.target.checked;e.props.onChange&&e.props.onChange(n)},e.onClick=function(t){if(e.props.onClick){var n=void 0;n=t&&t.target&&void 0!==t.target.checked?t.target.checked:e.props.checked,e.props.onClick(n)}},e}return(0,l.default)(t,e),(0,o.default)(t,[{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=e.name,r=e.checked,o=e.disabled,c=e.className,l=e.platform,u=e.color,h=p(e,["prefixCls","name","checked","disabled","className","platform","color"]),m=(0,s.default)(t,c,(0,i.default)({},t+"-android","android"===l)),f=(0,s.default)("checkbox",(0,i.default)({},"checkbox-disabled",o)),b=Object.keys(h).reduce(function(e,t){return"aria-"!==t.substr(0,5)&&"data-"!==t.substr(0,5)&&"role"!==t||(e[t]=h[t]),e},{}),g=this.props.style||{};return u&&r&&(g.backgroundColor=u),d.createElement("label",{className:m},d.createElement("input",(0,a.default)({type:"checkbox",name:n,className:t+"-checkbox",disabled:o,checked:r,onChange:this.onChange,value:r?"on":"off"},o?{}:{onClick:this.onClick},b)),d.createElement("div",(0,a.default)({className:f,style:g},o?{onClick:this.onClick}:{})))}}]),t}(d.Component);t.default=h,h.defaultProps={prefixCls:"am-switch",name:"",checked:!1,disabled:!1,onChange:function(){},platform:"ios",onClick:function(){}},e.exports=t.default},1039:function(e,t,n){var a=n(1040);"string"===typeof a&&(a=[[e.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(46)(a,i);a.locals&&(e.exports=a.locals)},1040:function(e,t,n){(e.exports=n(45)(!1)).push([e.i,".addAddress {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n}\n.addAddress .topBar {\n  height: 44px;\n  width: 100%;\n}\n.addAddress .content {\n  flex: 1;\n  background: #F5F6F8;\n}\n.addAddress .content .item {\n  display: flex;\n  padding: 20px;\n  background: #fff;\n  justify-content: space-between;\n  align-items: center;\n  color: #2D343B;\n  font-size: 14px;\n}\n.addAddress .content .item .rightView {\n  display: flex;\n  align-items: center;\n}\n.addAddress .content .item .rightView .selectArea {\n  color: #A1ADB9;\n}\n.addAddress .content .item .input {\n  width: 2.2rem;\n}\n.addAddress .content .item .goImg {\n  width: 7px;\n  height: 10px;\n  margin-left: 10px;\n}\n.addAddress .content .lineView {\n  background: #F5F6F8;\n  height: 1px;\n  margin: 0px 4px;\n}\n.addAddress .am-list-item .am-list-line .am-list-content {\n  font-size: 14px;\n}\ninput::-webkit-input-placeholder {\n  /* placeholder\u989c\u8272  */\n  color: #A1ADB9;\n}\n",""])},1179:function(e,t,n){"use strict";n.r(t);n(304);var a=n(212),i=n.n(a),r=(n(308),n(309)),o=n.n(r),c=(n(1035),n(1038)),l=n.n(c),s=(n(843),n(863)),d=n.n(s),u=n(99),p=n(21),h=n(22),m=n(24),f=n(23),b=n(25),g=n(0),x=n.n(g),v=n(19),k=n(127),A=n(11),y=n(769),w=(n(1039),n(47)),E=n.n(w),C=n(754),O=n.n(C),S=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(m.a)(this,Object(f.a)(t).call(this,e))).addressPickerOnOk=function(e){console.log(e);var t=n.state.district.find(function(t){return t.value===e[0]}),a=t.children.find(function(t){return t.value===e[1]}),i=a.children.find(function(t){return t.value===e[2]});n.setState({areaValue:e,area:t.label+a.label+i.label})},n.inputOnChange=function(e,t){n.setState(Object(u.a)({},e,t.target.value))},n.deleteAction=function(){n.setState({deleteVisible:!0})},n.deleteCancel=function(){n.setState({deleteVisible:!1})},n.deleteConfirm=function(){n.setState({deleteVisible:!1}),n.deleteRequest()},n.saveAction=function(){var e=n.state,t=e.name,a=e.mobile,i=e.detailAddress,r=e.isDefault,o=e.doorplate,c=e.isEdit,l=e.areaValue,s={province_id:l[0],city_id:l[1],county_id:l[2],name:t,phone:a,address:i,doorplate:o,is_default:r?1:0},d="/receiving.add";c&&(d="/receiving.edit",s.id=n.id),n.setState({animating:!0}),Object(A.a)({url:d,params:s}).then(function(e){n.setState({animating:!1}),v.a.goBack()}).catch(function(e){n.setState({animating:!1})})},n.state={isEdit:!1,deleteVisible:!1,animating:!1,area:null,areaValue:[0,0,0]},n.id=null,n}return Object(b.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=E.a.parse(window.location.search.split("?")[1]);e&&e.id&&(this.getAddressDetailData(e.id),this.setState({isEdit:!0})),this.sendAreaRequest()}},{key:"sendAreaRequest",value:function(){var e=this;Object(A.a)({url:"/area.get"}).then(function(t){var n=t.data.data.map(function(e){var t={value:e.id,label:e.name},n=e.down.map(function(e){var t={value:e.id,label:e.name},n=e.down.map(function(e){return{value:e.id,label:e.name}});return t.children=n,t});return t.children=n,t});e.setState({district:n})}).catch(function(t){e.setState({animating:!1})})}},{key:"getAddressDetailData",value:function(e){var t=this;this.id=e;var n={id:e};this.setState({animating:!0}),Object(A.a)({url:"/receiving.get",params:n}).then(function(e){t.setState({animating:!1});var n=e.data.data,a=n.province_name+n.city_name+n.county_name;t.id=n.id,t.setState({name:n.name,mobile:n.phone,area:a,detailAddress:n.address,isDefault:n.is_default,doorplate:n.doorplate,areaValue:[n.province_id,n.city_id,n.county_id]})}).catch(function(e){t.setState({animating:!1})})}},{key:"checkParams",value:function(){}},{key:"deleteRequest",value:function(){var e=this,t={id:this.id};this.setState({animating:!0}),Object(A.a)({url:"/receiving.delete",data:t,method:"delete"}).then(function(t){e.setState({animating:!1}),v.a.goBack()}).catch(function(t){e.setState({animating:!1})})}},{key:"render",value:function(){var e=this,t=this.state,n=t.name,a=t.mobile,r=t.district,c=t.detailAddress,s=t.doorplate,u=t.isDefault,p=t.isEdit,h=t.deleteVisible,m=t.area,f=t.areaValue;return x.a.createElement("div",{className:"addAddress"},x.a.createElement(k.b,{name:p?"\u7f16\u8f91\u6536\u8d27\u5730\u5740":"\u6dfb\u52a0\u6536\u8d27\u5730\u5740",className:"topBar",rightTitle:"\u4fdd\u5b58",onRightClick:this.saveAction}),x.a.createElement("div",{className:"content"},x.a.createElement("div",{className:"item"},x.a.createElement("div",null,"\u8054\u7cfb\u4eba"),x.a.createElement("div",null,x.a.createElement("input",{type:"text",value:n,placeholder:"\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba\u59d3\u540d",className:"input",style:{textAlign:"right"},onChange:this.inputOnChange.bind(this,"name")}))),x.a.createElement("div",{className:"lineView"}),x.a.createElement("div",{className:"item"},x.a.createElement("div",null,"\u8054\u7cfb\u7535\u8bdd"),x.a.createElement("div",null,x.a.createElement("input",{type:"text",value:a,placeholder:"\u8bf7\u8f93\u5165\u8054\u7cfb\u7535\u8bdd",className:"input",style:{textAlign:"right"},onChange:this.inputOnChange.bind(this,"mobile")}))),x.a.createElement("div",{className:"lineView"}),x.a.createElement("div",{className:"item"},x.a.createElement("div",null,"\u6240\u5728\u5730\u533a"),x.a.createElement(d.a,{data:r,value:f,onOk:this.addressPickerOnOk},x.a.createElement("div",{className:"rightView"},x.a.createElement("div",{className:m?"area":"selectArea"},m||"\u8bf7\u9009\u62e9\u6240\u5728\u5730\u533a"),x.a.createElement("img",{className:"goImg",src:O.a})))),x.a.createElement("div",{className:"lineView"}),x.a.createElement("div",{className:"item"},x.a.createElement("div",null,"\u8be6\u7ec6\u5730\u5740"),x.a.createElement("div",null,x.a.createElement("input",{type:"text",value:c,placeholder:"\u8bf7\u8f93\u5165\u8be6\u7ec6\u5730\u5740",className:"input",style:{textAlign:"right"},onChange:this.inputOnChange.bind(this,"detailAddress")}))),x.a.createElement("div",{className:"lineView"}),x.a.createElement("div",{className:"item"},x.a.createElement("div",null,"\u90ae\u653f\u7f16\u7801"),x.a.createElement("div",null,x.a.createElement("input",{type:"text",value:s,placeholder:"\u8bf7\u8f93\u5165\u90ae\u653f\u7f16\u7801",className:"input",style:{textAlign:"right"},onChange:this.inputOnChange.bind(this,"doorplate")}))),x.a.createElement("div",{className:"lineView"}),x.a.createElement(o.a.Item,{style:{fontSize:"14px",marginTop:"10px",marginBottom:"10px"},extra:x.a.createElement(l.a,{platform:"ios",color:"#3776EC",checked:u,onChange:function(){e.setState({isDefault:!u})}})},"\u8bbe\u4e3a\u9ed8\u8ba4\u5730\u5740"),p&&x.a.createElement("div",{style:{background:"#fff",color:"#FFB516",fontSize:"14px",padding:"20px"},onClick:this.deleteAction},"\u5220\u9664\u8be5\u6536\u8d27\u5730\u5740")),x.a.createElement(y.a,{visible:h,title:"\u786e\u5b9a\u5220\u9664\u8be5\u6536\u8d27\u5730\u5740\u5417\uff1f",onCancel:this.deleteCancel,onConfirm:this.deleteConfirm}),x.a.createElement(i.a,{toast:!0,text:"Loading...",animating:this.state.animating}))}}]),t}(x.a.Component);t.default=S},754:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAeCAYAAADD0FVVAAAAAXNSR0IArs4c6QAAAX5JREFUSA2t0zFPg0AUB/B3h9aNxG9QRyc3h85+BgZxpWlMXKiDJiS2lkSH6mAcmroWBz6DU4cmbnZytN9AUxdtAk/gcoTIlXIHLAcv4Zc/7x/A6vYnZ70HHWq8KCCYP99fb5bttupyaQIh7gGE07Y9uPJ9X6uKM5TJGkLYe3l9n3YubppV4AzKGERohavVvH1+fawK59AYQgAdQ/RUSxSiaULFEovRJLZ8iZvRJDZKlVgSZQvhJXa6rpmuSHAjhcbvxyUGGEyKSpRG02BRib/Lz7noT1RHWeqm6E+shLLU+RKJZfejNdVzEYAlJdppDUnzgbbyI7UJITBrEHryOHQ+akBJQCi6R4f7A8MwgjhSJTTa4QKBmuOhMxtnPlB5pwTI846+e/B078wyXnIrnZQ3PLpzvP8Yf5ZCs2VwQHSWRPNliDA+24iuK4MDorO4KALeujJEGJ8Jk5YpgwOiM4fGZdDthjm6vVyIXigzy6ByZRThCapSRhFKQbGMIvQPdEmnBbQSlkwAAAAASUVORK5CYII="},769:function(e,t,n){"use strict";n(762);var a=n(763),i=n.n(a),r=n(21),o=n(22),c=n(24),l=n(23),s=n(25),d=n(0),u=n.n(d),p=(n(770),function(e){function t(e){return Object(r.a)(this,t),Object(c.a)(this,Object(l.a)(t).call(this,e))}return Object(s.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.visible,n=e.onCancel,a=e.onConfirm,r=e.title,o=e.cancelTitle,c=e.okTitle,l=e.phone;return console.log("phone",l),u.a.createElement(i.a,{maskClosable:!1,popup:!0,visible:t,animationType:"slide-up"},u.a.createElement("div",{className:"alertContent"},u.a.createElement("div",{className:"title"},l?"\u662f\u5426\u62e8\u6253\u5ba2\u670d\u7535\u8bdd "+l:r),u.a.createElement("div",{className:"buttons"},u.a.createElement("div",{className:"cancel",onClick:n},o||"\u53d6\u6d88"),u.a.createElement("div",{className:"confirm",onClick:a},l?u.a.createElement("a",{className:"a",href:"tel:"+l},c||"\u786e\u5b9a"):u.a.createElement("div",null,c||"\u786e\u5b9a")))))}}]),t}(u.a.Component));t.a=p},770:function(e,t,n){var a=n(771);"string"===typeof a&&(a=[[e.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(46)(a,i);a.locals&&(e.exports=a.locals)},771:function(e,t,n){(e.exports=n(45)(!1)).push([e.i,".alertContent {\n  height: 1.42rem;\n  width: 100%;\n  background: #fff;\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n  color: #2D343B;\n}\n.alertContent .title {\n  font-weight: bold;\n  text-align: center;\n  font-size: 16px;\n  margin: 30px 0px 20px 0px;\n}\n.alertContent .buttons {\n  display: flex;\n  padding-left: 0.2rem;\n  padding-right: 0.2rem;\n  font-size: 14px;\n  justify-content: space-between;\n}\n.alertContent .buttons .cancel {\n  width: 1.4rem;\n  height: 0.4rem;\n  border-radius: 0.2rem;\n  text-align: center;\n  line-height: 0.4rem;\n  border: 1px solid #DBE0E5;\n}\n.alertContent .buttons .confirm {\n  width: 1.4rem;\n  height: 0.4rem;\n  border-radius: 0.2rem;\n  text-align: center;\n  line-height: 0.4rem;\n  background: #FFB516;\n}\n.alertContent .buttons .confirm .a {\n  color: #fff;\n  height: 100%;\n  width: 100%;\n  display: block;\n}\n.am-modal-body {\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n}\n.am-modal-content {\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n}\n",""])}}]);
//# sourceMappingURL=26.d5c720ac.chunk.js.map