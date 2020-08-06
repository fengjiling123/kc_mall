import React from "react";
import { Provider } from "react-redux";
import store from "store/index";
import Router from "../router/index";
import "./App.less";
import { getUserInfo, changeIsLogin } from "../store/actions/login";
import "../util/style.less";
import qs from "qs";
import { setCookie, getCookie, setCzcAccount } from "@/util/methods";
import http from "../util/http";
import CouponNewListModal from "../components/couponNewListModal";
import HomeTab from "../components/homeTab";
import { withRouter } from "react-router-dom";
import * as classnames from "classnames";
import { cartInfo } from "../store/actions/cart";
import { setCache } from "@/store/actions/cache";
import { getCouponNewList } from "@/store/actions/couponNewListModal";
import RedpacketModal from "../components/redpacketModal";
import isWeixin from "@/util/tools";

@withRouter
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      countInfo: {},
      userInfo: {},
      showRedpacketModal: false
    };
  }

  componentDidMount() {
    this.saveInviterId();
    const params = qs.parse(window.location.search.split("?")[1]);
    if (!isWeixin) {
      if (params.token) {
        setCookie("token", params.token);
      }
    } else {
    }

    this.getUserInfo();
  }

  //记录分享人id
  saveInviterId() {
    const inviter_id = qs.parse(window.location.search.split("?")[1])
      .inviter_id;
    if (isWeixin) {
      if (this.props.history.length === 1) {
        setCookie("inviter_id", inviter_id || "");
      }
    } else {
      setCookie("inviter_id", inviter_id || "");
    }
  }

  //根据用户信息判断登录状态
  getUserInfo() {
    http({
      url: "/self.get"
    })
      .then(res => {
        setCookie("user_id", res.data.data ? res.data.data.id : "");
        this.setState({
          loading: false,
          showRedpacketModal: true,
          userInfo: res.data.data
        });
        let isLogin = false;
        if (res.data.data) {
          isLogin = true;
          this.getCountInfo();
          store.dispatch(cartInfo());
          if (res.data.data.is_first === 1) {
            this.getLoginCache();
          } else {
            store.dispatch(setCache({ not_first: true }));
          }
        } else {
          setCookie("notShowRedpacketModal", false);
        }
        store.dispatch(changeIsLogin(isLogin));
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  getLoginCache = () => {
    http({
      url: "self.cache.get",
      params: { key: "not_first" }
    }).then(res => {
      const inviter_id = qs.parse(window.location.search.split("?")[1])
        .inviter_id;

      if (!JSON.parse(res.data.data)) {
        //非邀请情况下：app.js中获取新人优惠券并弹窗
        if (!inviter_id) {
          store.dispatch(getCouponNewList());
        }

        //邀请情况下：微信go(-2)页面重新装载，在app.js中获取新人优惠券并弹窗
        if (
          isWeixin &&
          inviter_id &&
          JSON.parse(getCookie("notShowRedpacketModal"))
        ) {
          store.dispatch(getCouponNewList());
        }
      }
    });
  };

  //获取购物车商品数量
  getCountInfo = () => {
    http({
      url: "/order.count",
      method: "get"
    }).then(res => {
      if (res.data.data) this.setState({ countInfo: res.data.data });
    });
  };

  tabIndex = () => {
    let index = 0;
    switch (window.location.pathname) {
      case "/":
        index = 0;
        break;
      case "/classifypage":
        index = 1;
        break;
      case "/mycenter/cart":
        index = 2;
        break;
      case "/mycenter":
        index = 3;
        break;
      default:
        index = -1;
        break;
    }
    return index;
  };

  render() {
    const { loading, showRedpacketModal, userInfo } = this.state;
    if (loading) return null;
    return (
      <Provider store={store}>
        <div className="provider">
          <div
            className={classnames({
              router: true,
              fullScreen: this.tabIndex() == -1
            })}
          >
            <Router />
          </div>
          <CouponNewListModal />
          {/* {showRedpacketModal && (
            <RedpacketModal
              userInfo={userInfo}
              closeModal={() => {
                this.setState({ showRedpacketModal: false });
              }}
            />
          )} */}
          <HomeTab index={this.tabIndex()} />
        </div>
      </Provider>
    );
  }
}

export default App;
