import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/login";
import * as seller from "../../store/actions/seller";
import history from "@/util/history";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";
import "./index.less";
import qs from "qs";
import orderItemImg from "../../assets/images/orderItem.png";
import unPayItemImg from "../../assets/images/unPayItem.png";
import unReceiveItemImg from "../../assets/images/unReceiveItem.png";
import unSendItemImg from "../../assets/images/unSendItem.png";
import storeRight from "@/assets/images/ic_order_store_right.png";
import backWhite from "../../assets/images/backWhite.png";
import right_arror from "../../assets/images/right_arror@3x.png";
import touxiang from "../../assets/images/touxiang.png";
import http from "@/util/http";
import { setEvent } from "../../util/methods";
import { RoundImageView } from "../../components/imageView";

let userVip =
  "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fic_user_vip.png";
let userNormal =
  "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fic_user_normal.png";

@connect(state => ({
  ...state.login,
  ...state.seller
}))
class MyCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModalVisible: false
    };
  }
  componentWillMount() {
    const { dispatch, isLogin } = this.props;
    dispatch(actions.getUserInfo());
    isLogin && dispatch(seller.getSeller());
  }
  componentDidMount() {
    this.getOrderCount();
  }

  getOrderCount() {
    var url = "/order.count";
    http({
      url
    }).then(res => {
      this.setState({
        ...res.data.data
      });
    });
  }

  onNameClick = () => {
    if (this.props.isLogin) {
      this.goUserInfoPage();
    } else {
      history.push("/login");
    }
  };

  goMyCollectionPage() {
    setEvent("我的页面", "收藏");
    history.push("/mycenter/mycollection");
  }
  goCouponPage = () => {
    setEvent("我的页面", "优惠券");
    history.push("/mycenter/mycoupon");
  };
  goWallet = () => {
    setEvent("我的页面", "钱包");
    history.push("/wallet");
  };
  goUserInfoPage() {
    history.push("/mycenter/userinfo");
  }
  goCartPage() {
    history.push("/mycenter/cart");
  }
  goAddressPage() {
    history.push("/myaddress?type=edit");
  }
  //订单列表
  goOrderPage(index) {
    setEvent("我的页面", "我的订单");
    history.push(`/mycenter/order?index=${index}`);
  }

  toRefundListPage = () => {
    history.push("/mycenter/order/refundlist");
  };

  //下面列表跳转
  goListPage(url) {
    if ((url === "")) {
      window.location.href = "http://mall.kangcemall.com/activity/normal?id=25";
    } else if (url == "/applyopenshop") {
      const { dispatch } = this.props;
      dispatch(seller.getSeller());
      if (this.props.seller && this.props.seller.check_status == 1) {
        history.push("/applyopenshop/result");
        return;
      } else {
        setEvent("我的页面", "入驻开店");
        history.push("/applyopenshop");
      }
    } else {
      if (url == "/cooperation") {
        setEvent("我的页面", "平台合作");
      }
      history.push(url);
    }
  }
  goback() {
    history.goBack();
  }
  getBadge(index) {
    if (index === 3) {
      // return 0;
      if (this.state.refund_count) {
        return this.state.refund_count;
      }
    } else if (index === 0) {
      if (this.state.no_pay_count) {
        return this.state.no_pay_count;
      }
    } else if (index === 1) {
      if (this.state.stock_count) {
        return this.state.stock_count;
      }
    } else if (index === 2) {
      if (this.state.receiving_count) {
        return this.state.receiving_count;
      }
    }
    return 0;
  }
  toUpLevel = () => {
    history.push("/myvip/upgrade");
  };
  toVipPage = () => {
    history.push("/myvip");
  };

  render() {
    const {
      face,
      nickname,
      isLogin,
      history,
      level,
      goods_collection_count,
      seller
    } = this.props;
    const orderItems = [
      {
        name: "未付款",
        img: unPayItemImg,
        index: 1,
        imgSize: { width: "24px", height: "21px" }
      },
      {
        name: "未发货",
        img: unSendItemImg,
        index: 2,
        imgSize: { width: "24px", height: "21px" }
      },
      {
        name: "未收货",
        index: 3,
        img: unReceiveItemImg,
        imgSize: { width: "24px", height: "20px" }
      },
      {
        name: "售后订单",
        index: -1,
        img: orderItemImg,
        imgSize: { width: "20px", height: "24px" }
      }
    ];
    const listItems = [
      { name: "入驻开店", url: "/applyOpenShop" },
      { name: "平台合作", url: "/cooperation" },
      { name: "帮助反馈", url: "/myCenter/helpCenter" },
      // { name: "关于康策良品", url: "/aboutUs" }
      { name: "关于康策良品", url: "" }
    ];
    const userVipView = (
      <div
        className="userVip"
        onClick={() => {
          this.toVipPage();
        }}
      >
        <div className="group">
          <ImageView src={userVip} />
          <div className="userVipGroup">
            <div className="text">
              <div className="label1">邀请专属粉丝，获取终生收益</div>
              <div className="label2">点击收益明细</div>
            </div>
            <div className="textRight">
              <div className="label">立即邀请</div>
              <ImageView
                style={{
                  width: "0.07rem",
                  height: "0.1rem"
                }}
                src={storeRight}
              />
            </div>
          </div>
        </div>
      </div>
    );
    const userNormalView = (
      <div
        className="userVip"
        onClick={() => {
          this.toUpLevel();
        }}
      >
        <div className="group">
          <ImageView src={userNormal} />
          <div className="userVipGroup">
            <div className="text">
              <div className="label1">升级钻石会员</div>
              <div className="label2">自购省钱，分享赚佣</div>
            </div>
            <div className="textRight">
              <div className="label">立即升级</div>
              <ImageView
                style={{
                  width: "0.07rem",
                  height: "0.1rem"
                }}
                src={storeRight}
              />
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="myCenter">
        {/* 个人信息 & 订单选项*/}
        {/* 已登录 */}
        <div className="infoOrder">
          <div className="topBg">
            <div
              className="userInfo"
              onClick={() => {
                this.onNameClick();
              }}
            >
              <RoundImageView
                src={face ? face : touxiang}
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "white",
                  overflow: "hidden"
                }}
              />
              <div className="name">{isLogin ? nickname : "登录"}</div>

              {level == 1 && <div className="label">钻石会员</div>}
            </div>
            <div className="userCollect">
              <div
                className="numberTag"
                onClick={() => {
                  isLogin ? this.goMyCollectionPage() : history.push("/login");
                }}
              >
                <div className="number">{goods_collection_count}</div>
                <div className="name">收藏</div>
              </div>

              <div
                className="numberTag"
                onClick={() => {
                  isLogin ? this.goCouponPage() : history.push("/login");
                }}
              >
                <div className="number">{this.props.conpon_count}</div>
                <div className="name">优惠券</div>
              </div>

              <div
                className="numberTag"
                onClick={() => {
                  isLogin ? this.goWallet() : history.push("/login");
                }}
              >
                <div className="number">
                  {parseFloat(this.props.balance ? this.props.balance : 0)}
                </div>
                <div className="name">钱包</div>
              </div>
            </div>
          </div>
          {this.props.level == 1 ? userVipView : userNormalView}

          <div
            className="allOrder"
            onClick={() => {
              this.goOrderPage(0);
            }}
          >
            <div className="text">我的订单</div>
            <div className="auto" />
            <div className="value">查看全部订单</div>
            <ImageView
              src={storeRight}
              style={{
                width: "0.07rem",
                height: "0.1rem",
                marginRight: "0.2rem"
              }}
            />
          </div>
          <div
            style={{
              height: "1px",
              background: "#F5F6F8",
              marginLeft: "0.15rem",
              marginRight: "0.15rem"
            }}
          />
          {/* 订单选项 */}
          <div className="order">
            {orderItems.map((item, index) => {
              return (
                <div
                  className="orderItem"
                  key={item.name}
                  onClick={() => {
                    if (index === 3) {
                      this.toRefundListPage();
                    } else {
                      this.goOrderPage(item.index);
                    }
                  }}
                >
                  {this.getBadge(index) !== 0 && (
                    <div className="badge">{this.getBadge(index)}</div>
                  )}
                  {/*<img src={item.img} style={item.imgSize} />*/}
                  <ImageView
                    src={item.img}
                    style={{
                      width: "24px",
                      height: "21px"
                    }}
                  />

                  <div className="orderTitle">{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lineView" />
        {/* 操作列表 */}

        <div className="listView">
          <div className="listItem" onClick={this.goAddressPage.bind(this)}>
            <div>我的收货地址</div>
            <img src={storeRight} className="goImg" />
          </div>
          <div className="itemLineView" />
          {listItems.map((item, index) => {
            return (
              <div>
                <div
                  className="listItem"
                  key={index}
                  onClick={this.goListPage.bind(this, item.url)}
                >
                  <div>{item.name}</div>
                  <div>
                    {item.name === "入驻开店" &&
                    seller &&
                    seller.check_status !== -1 ? (
                      <span
                        style={{
                          marginRight: ".1rem",
                          color: "#A1ADB9",
                          font: ".14rem"
                        }}
                      >
                        {seller.check_status === 0
                          ? "申请中"
                          : seller.check_status === 1
                          ? "已开通"
                          : "审核不通过"}
                      </span>
                    ) : null}
                    <img src={storeRight} className="goImg" />
                  </div>
                </div>
                <div className="itemLineView" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default MyCenter;
