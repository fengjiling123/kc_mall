(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{1171:function(e,n,t){"use strict";t.r(n);var a=t(21),r=t(22),o=t(24),s=t(23),i=t(25),c=t(0),p=t.n(c),l=(t(19),t(11)),d=t(127),m=(t(106),t(757),t(754),t(923),t(47)),h=t.n(m),f=t(20),g=function(e){function n(){var e,t;Object(a.a)(this,n);for(var r=arguments.length,i=new Array(r),c=0;c<r;c++)i[c]=arguments[c];return(t=Object(o.a)(this,(e=Object(s.a)(n)).call.apply(e,[this].concat(i)))).state={data:{},express_query:[]},t}return Object(i.a)(n,e),Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.params=h.a.parse(window.location.search.split("?")[1]);var n={order_id:this.params.id};Object(l.a)({url:"/order.logistics",params:n,loading:!0}).then(function(n){var t=n.data.data;e.setState({express_query:t.express_query,data:t})})}},{key:"render",value:function(){var e=this.state,n=e.data,t=e.express_query;return p.a.createElement("div",{className:"--expressPage"},p.a.createElement(d.b,{name:"\u7269\u6d41\u8be6\u60c5",style:{background:"#ffffff"}}),p.a.createElement("div",{className:"topLay"},p.a.createElement("div",{className:"name"},n.name),p.a.createElement("div",null,"|"),p.a.createElement("div",{className:"number"},n.number)),p.a.createElement("div",{className:"express"},t.map(function(e,n){return p.a.createElement("div",{className:"expressItem"},p.a.createElement("div",{className:f({round:!0,active:0==n})}),p.a.createElement("div",{className:f({content:!0,active:0==n})},e.content),p.a.createElement("div",{className:f({time:!0,active:0==n})},e.time))})))}}]),n}(p.a.Component);n.default=g},754:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAeCAYAAADD0FVVAAAAAXNSR0IArs4c6QAAAX5JREFUSA2t0zFPg0AUB/B3h9aNxG9QRyc3h85+BgZxpWlMXKiDJiS2lkSH6mAcmroWBz6DU4cmbnZytN9AUxdtAk/gcoTIlXIHLAcv4Zc/7x/A6vYnZ70HHWq8KCCYP99fb5bttupyaQIh7gGE07Y9uPJ9X6uKM5TJGkLYe3l9n3YubppV4AzKGERohavVvH1+fawK59AYQgAdQ/RUSxSiaULFEovRJLZ8iZvRJDZKlVgSZQvhJXa6rpmuSHAjhcbvxyUGGEyKSpRG02BRib/Lz7noT1RHWeqm6E+shLLU+RKJZfejNdVzEYAlJdppDUnzgbbyI7UJITBrEHryOHQ+akBJQCi6R4f7A8MwgjhSJTTa4QKBmuOhMxtnPlB5pwTI846+e/B078wyXnIrnZQ3PLpzvP8Yf5ZCs2VwQHSWRPNliDA+24iuK4MDorO4KALeujJEGJ8Jk5YpgwOiM4fGZdDthjm6vVyIXigzy6ByZRThCapSRhFKQbGMIvQPdEmnBbQSlkwAAAAASUVORK5CYII="},757:function(e,n,t){"use strict";t(760);var a=t(761),r=t.n(a),o=t(21),s=t(22),i=t(24),c=t(23),p=t(25),l=(t(764),t(765)),d=t.n(l),m=t(0),h=t.n(m),f=t(79),g=(t(758),t(9)),u=new d.a.DataSource({rowHasChanged:function(e,n){return e!==n}}),v=function(e){function n(){var e,t;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(t=Object(i.a)(this,(e=Object(c.a)(n)).call.apply(e,[this].concat(r)))).state={dataSource:u,refreshing:!0,isLoading:!0,height:document.documentElement.clientHeight},t.onRefresh=function(){t.setState({refreshing:!0,isLoading:!0}),t.props.onRefresh&&t.props.onRefresh(),t.setState({isLoading:!0})},t.onEndReached=function(e){t.state.isLoading&&!t.state.hasMore||(t.setState({isLoading:!0}),t.props.onEndReached&&t.props.onEndReached())},t}return Object(p.a)(n,e),Object(s.a)(n,[{key:"componentDidUpdate",value:function(){document.body.style.overflow="hidden"}},{key:"componentDidMount",value:function(){var e=this.props.offset?this.props.offset:0,n=this.state.height-f.findDOMNode(this.lv).offsetTop-Object(g.c)(e);this.setState({height:n}),this.onRefresh()}},{key:"componentWillReceiveProps",value:function(e,n){e.onDataChange&&(e.onDataChange.isRefresh?this.setState({dataSource:this.state.dataSource.cloneWithRows(e.onDataChange.data),refreshing:!1,isLoading:!!e.onDataChange.isLoading&&e.onDataChange.isLoading}):this.setState({dataSource:this.state.dataSource.cloneWithRows(e.onDataChange.data),isLoading:!!e.onDataChange.isLoading&&e.onDataChange.isLoading}))}},{key:"render",value:function(){var e=this,n=function(e,n){return h.a.createElement("div",{key:"".concat(e,"-").concat(n),style:{backgroundColor:"#F5F5F9",height:5}})};return this.props.separator&&(n=this.props.separator),h.a.createElement(d.a,{key:"1",ref:function(n){return e.lv=n},dataSource:this.state.dataSource,renderFooter:function(){return e.props.loadCompleteMsg?h.a.createElement("div",{style:{textAlign:"center",whiteSpace:"pre-line"}},e.state.isLoading?"\u52a0\u8f7d\u4e2d...":"undefined"!=typeof e.props.loadCompleteMsg?e.props.loadCompleteMsg:"\u52a0\u8f7d\u5b8c\u6210"):null},renderRow:this.props.row,renderSeparator:n,useBodyScroll:!1,style:{height:this.state.height},pullToRefresh:h.a.createElement(r.a,{refreshing:this.state.refreshing,onRefresh:this.onRefresh}),onEndReached:this.onEndReached,pageSize:5})}}]),n}(h.a.Component);n.a=v},758:function(e,n,t){var a=t(759);"string"===typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};t(46)(a,r);a.locals&&(e.exports=a.locals)},759:function(e,n,t){(e.exports=t(45)(!1)).push([e.i,'.am-list-view-scrollview {\n  margin: 0 !important;\n  overflow: scroll !important;\n  -webkit-overflow-scrolling: touch;\n}\n.am-list-body:before {\n  content: "" !important;\n  background-color: #f5f6f8 !important;\n}\n.am-list-body:after {\n  content: "" !important;\n  background-color: #f5f6f8 !important;\n}\n',""])},923:function(e,n,t){var a=t(924);"string"===typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};t(46)(a,r);a.locals&&(e.exports=a.locals)},924:function(e,n,t){(e.exports=t(45)(!1)).push([e.i,".\\--expressPage {\n  display: flex;\n  flex-direction: column;\n  background: #f5f6f8;\n  height: 100vh;\n}\n.\\--expressPage .topLay {\n  flex: none;\n  padding-top: 0.05rem;\n  padding-left: 0.1rem;\n  padding-bottom: 0.1rem;\n  margin-bottom: 0.05rem;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  background: #ffffff;\n  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 0 0 20px 20px;\n}\n.\\--expressPage .topLay .name {\n  font-size: 0.18rem;\n  margin-left: 0.2rem;\n  margin-right: 0.1rem;\n}\n.\\--expressPage .topLay .number {\n  font-size: 0.18rem;\n  margin-left: 0.1rem;\n}\n.\\--expressPage .express {\n  overflow: scroll;\n  -webkit-overflow-scrolling: touch;\n  flex: 1;\n  padding: 0.15rem;\n}\n.\\--expressPage .express .expressItem {\n  border-left: 3px solid #ccc;\n  padding-left: 0.1rem;\n  position: relative;\n}\n.\\--expressPage .express .expressItem .round {\n  position: absolute;\n  width: 0.12rem;\n  height: 0.12rem;\n  background: #cccccc;\n  border-radius: 50%;\n  z-index: 2;\n  left: -8px;\n  top: -1px;\n}\n.\\--expressPage .express .expressItem .round.active {\n  background: #333333;\n}\n.\\--expressPage .express .expressItem .content {\n  color: #999999;\n  line-height: .2rem;\n}\n.\\--expressPage .express .expressItem .content .active {\n  color: #333333;\n}\n.\\--expressPage .express .expressItem .time {\n  color: #999999;\n  font-size: 0.12rem;\n  padding-bottom: .3rem;\n  margin-top: .1rem;\n}\n.\\--expressPage .express .expressItem .time.active {\n  color: #333333;\n}\n.\\--expressPage .express .expressItem:last-child {\n  border-color: transparent;\n}\n",""])}}]);
//# sourceMappingURL=49.0afea394.chunk.js.map