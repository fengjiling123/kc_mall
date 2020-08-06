import React from "react";
import "./index.less";
import * as classnames from "classnames";

import icHome from "@/assets/images/ic_home.png";
import icHomeActive from "@/assets/images/ic_home_active.png";

import icHomeCart from "@/assets/images/ic_home_cart.png";
import icHomeCartActive from "@/assets/images/ic_home_cart_active.png";

import icHomeCategory from "@/assets/images/ic_home_category.png";
import icHomeCategoryActive from "@/assets/images/ic_home_category_active.png";

import icHomeMyCenter from "@/assets/images/ic_home_mycenter.png";
import icHomeMyCenterActive from "@/assets/images/ic_home_mycenter_active.png";

import ImageView from "@/components/imageView";
import http from "@/util/http";
import history from "@/util/history";
import { setEvent } from "@/util/methods";
import { connect } from "react-redux";
import * as actions from "../../store/actions/login";
import icTabMoney from "@/assets/images/ic_tab_money.png";
// import icTabMoney from "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fic_tab_money.png"

@connect(state => ({
  ...state.cart,
  ...state.login,
  ...state.seller
}))
class HomeTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.getUserInfo());
  }

  componentDidMount() {
    if (this.props.isLogin) {
      this.goUserInfoPage();
    }
  }

  toHomePage = () => {
    if (window.location.pathname === "/") return;
    setEvent("底部tab", "首页");
    history.push("/");
    this.setState({ index: 0 });
  };

  toCategory = () => {
    if (window.location.pathname === "/classifypage") return;
    setEvent("底部tab", "分类");
    history.push("/classifypage");
    this.setState({ index: 1 });
  };

  toCart = () => {
    if (window.location.pathname === "/mycenter/cart") return;
    setEvent("底部tab", "购物车");
    history.push("/mycenter/cart");
    this.setState({ index: 2 });
  };

  toMyCenter = () => {
    if (window.location.pathname === "/mycenter") return;
    setEvent("底部tab", "我的");
    history.push("/mycenter");
    this.setState({ index: 3 });
  };

  toUpLevel = () => {
    history.push("/myvip/upgrade");
  };
  toVipPage = () => {
    history.push("/myvip");
  };

  render() {
    let tabIndex = this.props.index;
    return (
      <div className="--homeTab">
        {tabIndex >= 0 && (
          <div>
            <div className="homeNav">
              <div
                className="navGroup"
                onClick={() => {
                  this.toHomePage();
                }}
              >
                <ImageView
                  src={tabIndex == 0 ? icHomeActive : icHome}
                  style={{ width: "0.3rem", height: "0.3rem" }}
                />
                <div
                  className={classnames({
                    name: true,
                    active: tabIndex == 0
                  })}
                >
                  首页
                </div>
              </div>
              <div
                className="navGroup"
                onClick={() => {
                  this.toCategory();
                }}
              >
                <ImageView
                  src={tabIndex == 1 ? icHomeCategoryActive : icHomeCategory}
                  style={{ width: "0.3rem", height: "0.3rem" }}
                />
                <div
                  className={classnames({
                    name: true,
                    active: tabIndex == 1
                  })}
                >
                  分类
                </div>
              </div>
              <div style={{ width: "16%" }} />
              <div
                className="navGroup"
                onClick={() => {
                  this.toCart();
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "0.3rem",
                    height: "0.3rem"
                  }}
                >
                  <ImageView
                    src={tabIndex == 2 ? icHomeCartActive : icHomeCart}
                  />
                  {this.props.countInfo.cart_count > 0 && (
                    <span className="cart-number">
                      {this.props.countInfo.cart_count}
                    </span>
                  )}
                </div>
                <div
                  className={classnames({
                    name: true,
                    active: tabIndex == 2
                  })}
                >
                  购物车
                </div>
              </div>
              <div
                className="navGroup"
                onClick={() => {
                  this.toMyCenter();
                }}
              >
                <ImageView
                  src={tabIndex == 3 ? icHomeMyCenterActive : icHomeMyCenter}
                  style={{ width: "0.3rem", height: "0.3rem" }}
                />
                <div
                  className={classnames({
                    name: true,
                    active: tabIndex == 3
                  })}
                >
                  我的
                </div>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "0",
                width: "0.64rem",
                height: "0.61rem",
                left: "50%",
                transform: "translate(-50%,0)",
                zIndex: 2
              }}
              onClick={() => {
                setEvent("底部tab", "赚佣");
                if (this.props.level == 1) {
                  this.toVipPage();
                } else {
                  this.toUpLevel();
                }
              }}
            >
              <img
                src={icTabMoney}
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HomeTab;
