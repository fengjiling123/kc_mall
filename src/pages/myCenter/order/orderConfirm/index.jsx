import React from "react";
import history from "@/util/history";
import http from "@/util/http";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";

import storeRight from "@/assets/images/ic_order_store_right.png";
import icAddress from "@/assets/images/ic_address.png";
import { connect } from "react-redux";
import { Modal, Toast } from "antd-mobile";
import * as actions from "@/store/actions/address";
import * as orderActions from "@/store/actions/order";
import "./index.less";
import qs from "qs";
import { ORDER_CLEARED, ORDER_FLAG } from "../../../../store/actions/order";
import { setCookie, getCookie, url_request } from "@/util/methods";
import Auth from "@/components/auth";
import coupon_bg from "@/assets/images/bj-youhuiquan.png";
import coupon_selected from "@/assets/images/icon-xuanzhong.png";
import coupon_not_selected from "@/assets/images/icon-weixuanzhong.png";
import moment from "moment";

let ua = navigator.userAgent.toLowerCase();
let isWeixin = ua.indexOf("micromessenger") != -1;

//优惠券类型
const COUPON_ATTRIBUTE = {
  1: "康策良品平台券",
  2: "店铺优惠券",
  3: "新人专享券",
  4: "邀请新人奖励券"
};

@connect(state => ({
  ...state.address,
  ...state.order
}))
@Auth
class OrderConfirm extends React.Component {
  state = {
    number: "",
    storeItem: [],
    remark: "",
    pay_type: 0,
    totalPrice: 0,
    address: {},
    invalid: false,
    errorMsg: "",
    couponsDialog: false,
    couponsArray: [],
    storeItemTemp: null,
    selectedCoupon: null, //切换优惠券时选择的优惠券
    couponCode: "" // 兑换优惠券码
  };

  componentDidMount() {
    this.requestPreviewOrder();
  }

  componentWillUnmount() {
    this.props.dispatch(actions.selectAddress({}));
  }

  requestPreviewOrder() {
    // this.search = qs.parse(window.location.search.split("?")[1]);
    this.params = this.props.match.params;

    // 根据参数，判断从详情页来，还是购物车
    // goodsid_1234  是产品详情来
    // 因为微信支付 会丢失参数，所以要这样传参
    if (this.params.idWithName) {
      let name = this.params.idWithName.split("_")[0];
      let value = this.params.idWithName.split("_")[1];
      if (name === "goodsid") {
        this.search = {
          goods_id: value
        };
      } else {
        this.search = {
          demand_ids: value
        };
      }
    } else {
      this.search = {
        goods_id: 0
      };
    }

    this.props.dispatch(actions.getDefaultAddress());
    //从商品详情页直接下单，不经过购物车
    if (this.search.goods_id) {
      let goods = this.search.goods_id;
      let data = {
        goods_id: goods,
        count: url_request("count"),
        product_id: url_request("product_id") || 0
      };

      if (getCookie(ORDER_FLAG) === ORDER_CLEARED) {
        this.setState({
          invalid: true,
          errorMsg: "该订单已提交或已失效!"
        });
        return;
      }

      http({
        url: "/goods.preview",
        method: "post",
        data,
        loading: true
      })
        .then(res => {
          let result = res.data.data.data;
          let temp = res.data.data.user_coupons;
          this.setState(
            {
              storeItem: [
                {
                  number: 1,
                  id: res.data.data.store_id,
                  store_name: res.data.data.store_name,
                  goods: [result],
                  price: res.data.data.price,
                  freight: res.data.data.freight,
                  user_coupons: temp,
                  activity_reduction: res.data.data.activity_reduction,
                  select_coupons:
                    temp.length > 0
                      ? {
                          id: temp[0].id,
                          money: temp[0].money,
                          text: `${temp[0].name} ￥${temp[0].money}`
                        }
                      : {
                          id: 0,
                          money: 0,
                          text: ""
                        }
                }
              ]
            },
            () => {
              this.calculMoney();
            }
          );
        })
        .catch(error => {
          this.setState({
            invalid: true,
            errorMsg: error.data.msg
          });
        });
    } else {
      //从购物车下单
      let demandArray = [];
      if (this.search.demand_ids) {
        demandArray = this.search.demand_ids.split(",");
      }
      let params = {
        demand_ids: demandArray
      };

      if (getCookie(ORDER_FLAG) === ORDER_CLEARED) {
        this.setState({
          invalid: true,
          errorMsg: "该订单已提交或已失效!"
        });
        return;
      }

      http({
        url: "/order.preview",
        params,
        loading: true
      })
        .then(res => {
          let result = res.data.data.store;
          let array = [];

          Object.keys(result).map(value => {
            let coupons = result[value].user_coupons;
            let temp = [];
            Object.keys(coupons).map(value => {
              temp.push({
                ...coupons[value]
              });
            });
            array.push({
              id: value,
              ...result[value],
              user_coupons: temp,
              select_coupons:
                temp.length > 0
                  ? {
                      id: temp[0].id,
                      money: temp[0].money,
                      text: `${temp[0].name} ￥${temp[0].money}`
                    }
                  : {
                      id: 0,
                      money: 0,
                      text: ""
                    }
            });
          });
          this.setState(
            {
              storeItem: array
            },
            () => {
              this.calculMoney();
            }
          );
        })
        .catch(error => {
          if (error.code == 4001) {
            this.setState({
              invalid: true,
              errorMsg: "该订单已提交或已失效!"
            });
          }
        });
    }
  }

  onAddressSelect = () => {
    history.push("/myaddress");
  };

  onRemark = (storeItem, remark) => {
    if (this.search.goods_id) {
      //从商品详情页直接下单，不经过购物车
      this.setState({
        remark: remark
      });
    } else {
      //过购物车
      let stateRemark = this.state.remark;
      stateRemark = Object.assign({}, stateRemark, { [storeItem.id]: remark });
      this.setState(
        {
          remark: stateRemark
        },
        () => {
          console.log(this.state.remark);
        }
      );
    }
  };

  onConfirm = () => {
    if (this.state.number !== "") {
      this.toPay();
      return;
    }

    if (getCookie(ORDER_FLAG) === ORDER_CLEARED) {
      return;
    }

    let { address } = this.state;
    if (typeof address.id == "undefined") {
      Toast.show("亲，请选择收货地址！", 1);
      return;
    }
    let inviter_id = getCookie("inviter_id");
    //从商品详情页直接下单，不经过购物车
    if (this.search.goods_id) {
      let goods_id = this.search.goods_id;
      let { remark, storeItem } = this.state;
      let data = {
        goods_id: goods_id,
        remark: remark,
        receiving_id: address.id,
        coupon_id: storeItem.length > 0 ? storeItem[0].select_coupons.id : 0,
        delivery_type: 1,
        count: url_request("count"),
        inviter_id,
        product_id: url_request("product_id") || 0
      };
      http({
        url: "/order.add",
        method: "post",
        data,
        loading: true
      }).then(res => {
        this.setState(
          {
            number: res.data.data.number,
            flag: res.data.data.flag
          },
          () => {
            this.toPay();
          }
        );
      });
    } else {
      let { remark, storeItem } = this.state;
      let goods_data = [];

      storeItem.map(item => {
        let goods = [];
        item.goods.map(good => {
          goods.push({
            cart_id: good.demand_id,
            goods_id: good.goods_id,
            number: good.count,
            inviter_id: good.inviter_id ? good.inviter_id : inviter_id,
            product_id: good.product_id
          });
        });
        goods_data.push({
          store_id: item.id,
          coupon_id: item.select_coupons.id != 0 ? item.select_coupons.id : 0,
          delivery_type: 1,
          remark: remark[item.id],
          goods: goods,
          activity_id: item.activity_reduction ? item.activity_reduction.id : 0
        });
      });

      let data = {
        type: 1,
        receiving_id: address.id,
        goods_data: goods_data
      };

      http({
        url: "/order.create",
        method: "post",
        data,
        loading: true
      }).then(res => {
        this.setState(
          {
            number: res.data.data.number,
            flag: res.data.data.flag
          },
          () => {
            this.toPay();
          }
        );
      });
    }
  };

  toPay = () => {
    let state = {
      number: this.state.number,
      totalPrice: this.state.flag ? this.state.totalPrice : 0
    };
    this.props.dispatch(orderActions.clearNewOrder());
    if (isWeixin) {
      this.doWxAuthorization(JSON.stringify(state));
    } else {
      history.push(`/mycenter/order/pay/index?state=${JSON.stringify(state)}`);
    }
  };

  doWxAuthorization(state) {
    let redirect_uri = encodeURIComponent(
      window.location.origin + "/myCenter/order/pay/index"
    );
    window.location.href =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1310dfcee8268057&redirect_uri=" +
      redirect_uri +
      `&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
  }

  checkAddress = (defaultAddress, selectAddress) => {
    let { address } = this.state;
    if (
      typeof address.id == "undefined" &&
      defaultAddress != null &&
      typeof defaultAddress.id != "undefined"
    ) {
      this.setState({
        address: defaultAddress
      });
    } else if (
      selectAddress != null &&
      selectAddress.id != null &&
      selectAddress.id != address.id
    ) {
      this.setState({
        address: selectAddress
      });
    }
  };

  //去选择优惠券
  toSelectCoupon = (item, array) => {
    // if (!array || array.length == 0) return;

    this.setState({
      couponsDialog: true,
      couponsArray: array,
      storeItemTemp: item,
      selectedCoupon: item.select_coupons
    });
  };

  //切换弹窗中选中的优惠券
  changeModalSelectedCoupon(item) {
    if (this.state.selectedCoupon && item.id === this.state.selectedCoupon.id) {
      //取消选中优惠券
      this.setState({ selectedCoupon: null });
    } else {
      this.setState({ selectedCoupon: item });
    }
  }

  //保存最终选中的优惠券
  onCouponsSelect = item => {
    if (this.state.storeItemTemp) {
      this.state.storeItemTemp.select_coupons = {
        id: item ? item.id : 0,
        text: item ? `${item.name} ￥${item.money}` : "",
        money: item ? item.money : 0
      };
    }
    let { storeItem } = this.state;

    let idTemp = item ? item.id : 0; //优惠券ID
    storeItem.map(i => {
      let id = i.select_coupons.id != 0 ? i.select_coupons.id : 0;
      if (idTemp == id && i.id != this.state.storeItemTemp.id) {
        i.select_coupons.id = 0;
      }
    });

    if (item == null) {
      this.setState({
        couponsDialog: false,
        storeItemTemp: null
      });
    } else {
      this.setState({
        couponsDialog: false
      });
    }
    this.calculMoney();
  };

  calculMoney = () => {
    let { storeItem } = this.state;
    let ids = [];
    storeItem.map(item => {
      let id = item.select_coupons.id != 0 ? item.select_coupons.id : 0;
      if (ids.indexOf(id) != -1) {
        item.select_coupons.id = 0;
      } else {
        ids.push(id);
      }
    });

    let goods_data = [];
    storeItem.map(item => {
      let goods = [];
      item.goods.map(good => {
        if (url_request("product_id")) {
          // 如果是产品详情直接过来
          goods.push({
            goods_id: good.goods_id,
            number: good.count,
            product_id: url_request("product_id")
          });
        } else {
          // 如果是购物车列表过来的
          goods.push({
            goods_id: good.goods_id,
            number: good.count,
            product_id: good.product_id
          });
        }
      });
      goods_data.push({
        store_id: item.id,
        coupon_id: item.select_coupons.id != 0 ? item.select_coupons.id : 0,
        delivery_type: 1,
        goods: goods,
        activity_id: item.activity_reduction ? item.activity_reduction.id : 0
      });
    });

    let data = {
      goods_data: goods_data
    };

    http({
      url: "/order.money",
      method: "post",
      data,
      loading: true
    }).then(res => {
      let result = res.data.data;
      storeItem.forEach(item => {
        result.store.forEach(storeTemp => {
          if (item.id == storeTemp.store_id) {
            item.totalPrice = storeTemp.price;
          }
        });
      });
      this.setState(
        {
          totalPrice: result.total_money,
          storeItem
        },
        () => {
          console.log(this.state.storeItem);
        }
      );
    });
  };

  closeCouponsDialog = () => {
    this.setState({
      couponsDialog: false,
      couponsArray: []
    });
  };

  // 兑换优惠券码
  exchangeCouponCode() {
    const { couponCode } = this.state;

    if (!couponCode) {
      return;
    }

    http({
      url: "/coupon.exchange",
      params: {
        code: couponCode
      }
    }).then(res => {
      Toast.success("兑换成功");
      this.setState({ couponCode: "", couponsDialog: false });
      setTimeout(() => this.requestPreviewOrder(), 1000);
    });
  }

  // 键盘落下页面被撑起来不回去
  inputFocus = () => {
    window.scroll(0, 0);
  };

  render() {
    let state = this.state;
    let {
      address,
      invalid,
      errorMsg,
      selectedCoupon,
      storeItemTemp
    } = this.state;
    let { defaultAddress, selectAddress } = this.props;

    this.checkAddress(defaultAddress, selectAddress);
    return (
      <div className="--orderConfirmPage">
        <TopBar name="确认订单" style={{ background: "#f5f6f8" }} />
        <div className="scrollView">
          {/**地址**/}
          <div className="addressCard">
            <ImageView
              src={icAddress}
              style={{
                width: "0.25rem",
                height: "0.25rem",
                marginLeft: "0.15rem",
                marginRight: "0.15rem"
              }}
            />
            <div
              className="addressGroup"
              onClick={() => {
                this.onAddressSelect();
              }}
            >
              <div className="people">
                {address.name ? address.name : "请选择地址"} {address.phone}
              </div>
              <div className="address">
                {address.province_name} {address.city_name}{" "}
                {address.county_name} {address.address}
              </div>
            </div>
            <ImageView
              src={storeRight}
              style={{
                width: "0.07rem",
                height: "0.10rem",
                marginLeft: "0.15rem",
                marginRight: "0.15rem"
              }}
            />
          </div>
          {/**顶部状态**/}

          {invalid && (
            <div
              style={{ width: "90%", margin: "auto 5%", textAlign: "center" }}
            >
              {this.state.errorMsg}
            </div>
          )}

          {state.storeItem &&
            state.storeItem.map(storeItem => (
              <div key={storeItem.id} className="orderCard">
                {/**药店**/}
                <div className="storeGroup">
                  <div className="store">
                    <div className="storeName">{storeItem.store_name}</div>
                    <ImageView
                      src={storeRight}
                      style={{ width: "0.07rem", height: "0.1rem" }}
                    />
                  </div>
                </div>
                {/**药品**/}
                {storeItem.goods &&
                  storeItem.goods.map(drug => (
                    <div
                      key={`${drug.demand_id}-${storeItem.id}`}
                      className="drugGroup"
                    >
                      <ImageView
                        src={drug.image}
                        style={{
                          width: "0.8rem",
                          height: "0.8rem",
                          flex: "none"
                        }}
                      />
                      <div className="drugContent">
                        <div>{drug.name}</div>
                        <div>
                          {drug.product_id != 0 ? (
                            <span className="drug-spec">
                              {drug.attributes.join(" ")}
                            </span>
                          ) : null}

                          <div className="amountGroup">
                            <div className="priceGroup">
                              <div className="pricePrefix">￥</div>
                              <div>{parseFloat(drug.money)}</div>
                            </div>
                            <div>x{drug.count}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                <div style={{ height: "0.05rem" }} />
                <div className="orderTipsGroup">
                  <div className="name">配送方式</div>
                  <div className="value">
                    <div>普通配送</div>
                    <div style={{ color: "#2D343B" }}>
                      快递 {storeItem.freight == 0 ? "免邮" : storeItem.freight}
                    </div>
                  </div>
                </div>
                <div className="orderTipsGroup">
                  <div className="name">优惠券</div>
                  <div
                    className="value line-clamp-one"
                    onClick={() => {
                      this.toSelectCoupon(storeItem, storeItem.user_coupons);
                    }}
                  >
                    {storeItem.select_coupons.id === 0
                      ? "暂无"
                      : storeItem.select_coupons.text}
                  </div>
                </div>
                <div className="orderTipsGroup">
                  <div className="name">活动满减</div>
                  <div className="value line-clamp-one">
                    {storeItem.activity_reduction != null &&
                    typeof storeItem.activity_reduction != "undefined" &&
                    typeof storeItem.activity_reduction.id != "undefined"
                      ? `满${storeItem.activity_reduction.reach_money}减${storeItem.activity_reduction.reduce_money}`
                      : `暂无`}
                  </div>
                </div>
                <div className="orderTipsGroup">
                  <div className="name">备注</div>
                  <div className="value">
                    <input
                      placeholder="请输入备注"
                      onChange={e => {
                        this.onRemark(storeItem, e.target.value);
                      }}
                    />
                  </div>
                </div>

                {/**底部按钮**/}
                <div className="bottomGroup">
                  <div className={"auto"} />
                  <div className={"number"}>共{storeItem.number}件</div>
                  <div>小计</div>
                  <div className={"price"}>
                    ￥{parseFloat(storeItem.totalPrice)}
                    {storeItem.freight > 0
                      ? `(含邮费：${parseFloat(storeItem.freight)}元)`
                      : ""}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="bottomCard">
          <div className="auto" />
          <div style={{ textAlign: "center", lineHeight: "0.28rem" }}>
            合计：
          </div>
          <div className="priceGroup">
            <div className="pricePrefix">￥</div>
            <div>{parseFloat(this.state.totalPrice)}</div>
          </div>
          <div className="pay" onClick={this.onConfirm}>
            提交订单
          </div>
        </div>

        <div>
          <Modal
            popup
            maskClosable
            visible={state.couponsDialog}
            animationType="slide-up"
            onClose={this.closeCouponsDialog}
            className="modalCard"
          >
            <div className="modalContent">
              <div className="title">选择优惠券</div>

              <div
                style={{
                  flex: "auto",
                  overflow: "scroll",
                  maxHeight: "3.4rem"
                }}
              >
                {this.state.couponsArray.map(item => (
                  <div
                    className="coupon-item"
                    onClick={() => {
                      this.changeModalSelectedCoupon(item);
                    }}
                  >
                    <div>
                      <img
                        src={
                          this.state.selectedCoupon &&
                          this.state.selectedCoupon.id === item.id
                            ? coupon_selected
                            : coupon_not_selected
                        }
                        style={{ width: "16px", height: "16px" }}
                        className="coupon-select-img"
                      />
                    </div>

                    <div className="content">
                      <div className="name">
                        {item.attribute === 2
                          ? item.store_name
                          : COUPON_ATTRIBUTE[item.attribute]}
                      </div>
                      <div className="money">
                        {Number(item.reach_money)
                          ? `满${Number(item.reach_money)}`
                          : "无门槛"}
                        减 {Number(item.money)}
                      </div>
                      <div className="time">
                        {item.period === 1 ? (
                          <div
                            style={{ fontSize: ".12rem", marginTop: ".02rem" }}
                          >
                            {moment.unix(item.start_time).format("YYYY.MM.DD")}
                            &nbsp;-&nbsp;
                            {moment.unix(item.end_time).format("YYYY.MM.DD")}
                          </div>
                        ) : (
                          <div
                            style={{ fontSize: ".12rem", marginTop: ".02rem" }}
                          >
                            {moment().format("YYYY.MM.DD")}
                            &nbsp;-&nbsp;
                            {moment()
                              .add(item.expiry_day, "days")
                              .format("YYYY.MM.DD")}
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ color: "#DEBF81", fontSize: ".18rem" }}>
                      ￥
                      <span style={{ fontSize: ".4rem", fontWeight: "bold" }}>
                        {Number(item.money)}
                      </span>
                    </div>
                    <img src={coupon_bg} className="coupon-bg-img" />
                  </div>
                ))}
              </div>

              <div className="get-coupon">
                <input
                  placeholder="输入兑换码"
                  value={this.state.couponCode}
                  onChange={e =>
                    this.setState({ couponCode: e.target.value.trim() })
                  }
                  onBlur={this.inputFocus}
                  onFocus={this.inputFocus}
                />
                <span
                  style={{ flex: 1 }}
                  onClick={() => this.exchangeCouponCode()}
                >
                  兑换
                </span>
              </div>

              <div
                className="save-button"
                onClick={() => {
                  if (
                    storeItemTemp &&
                    selectedCoupon &&
                    storeItemTemp.select_coupons.id !== selectedCoupon.id
                  ) {
                    this.onCouponsSelect(selectedCoupon);
                  } else if (!selectedCoupon) {
                    this.onCouponsSelect(null);
                  } else {
                    this.setState({ couponsDialog: false });
                  }
                }}
              >
                <div>确定</div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default OrderConfirm;
