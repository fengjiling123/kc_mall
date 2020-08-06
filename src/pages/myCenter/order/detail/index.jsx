import React from "react";
import history from "@/util/history";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";
import MyListView from "@/components/listView";
import storeRight from "@/assets/images/ic_order_store_right.png";
import icAddress from "@/assets/images/ic_address.png";
import icExpress from "@/assets/images/ic_express.png";
import icPayWx from "@/assets/images/ic_pay_wx.png";
import icPayAli from "@/assets/images/ic_pay_ali.png";
import icPayKc from "@/assets/images/ic_pay_kc.png";
import { ListView, Modal, PullToRefresh, Tabs, Toast } from "antd-mobile";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import OrderPay from "../orderPay";
import http from "@/util/http";
import "./index.less";
import moment from "moment";
import qs from "qs";
import { connect } from "react-redux";

import isWeixin from "@/util/tools";

//"operation": 1, #操作状态 ,0未付款，1待发货，3待收货,4确认收货,5已完成,6已取消
const ORDER_STATUS = [
  "未付款",
  "等待卖家发货",
  "",
  "卖家已发货",
  "交易完成",
  "交易完成",
  "交易关闭"
];

class Index extends React.Component {
  state = {
    payDialog: false,
    totalPrice: 0,
    pay_type: 0,
    showTime: "",
    orderInfo: {},
    drugs: []
  };

  componentDidMount() {
    this.params = this.props.match.params;
    let params = {
      id: this.params.id
    };
    http({
      url: "/order.get",
      params,
      loading: true
    }).then(res => {
      let result = res.data.data;
      this.setState({
        orderInfo: result,
        drugs: result.goods
      });
      if (result.operation == 0) {
        this.time = result.expire_time;
        this.caculTime();
      } else if (result.operation == 3) {
        this.time = result.send_time + 10 * 24 * 60 * 60;
        this.caculTime();
      }
    });
  }

  toPay = () => {
    let { orderInfo } = this.state;
    let state = {
      number: orderInfo.number,
      totalPrice: orderInfo.pay_money
    };
    if (isWeixin) {
      this.doWxAuthorization(JSON.stringify(state));
    } else {
      history.push(`/mycenter/order/pay/index?state=${JSON.stringify(state)}`);
    }
  };

  doWxAuthorization(state) {
    var redirect_uri = encodeURIComponent(
      window.location.origin + "/myCenter/order/pay/index"
    );
    window.location.href =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1310dfcee8268057&redirect_uri=" +
      redirect_uri +
      `&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
  }

  caculTime = () => {
    let deta = this.time * 1000 - new Date().getTime();
    if (deta < 0) {
      this.setState({
        showTime: "0分钟"
      });
    } else {
      let day = Math.floor(deta / (1000 * 60 * 60 * 24));
      if (day > 0) {
        day = day + "天";
      } else {
        day = "";
      }
      let hour = Math.floor((deta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if (hour > 0) {
        hour = hour + "小时";
      } else {
        hour = "";
      }

      let min = Math.floor(
        ((deta % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60)
      );
      if (min > 0) {
        min = min + "分钟";
      } else {
        min = "";
      }

      let second = Math.round((deta % (1000 * 60)) / 1000);
      if (second > 0) {
        second = second + "秒";
      } else {
        second = "";
      }
      if (day) {
        this.setState({
          showTime: day + hour
        });
      } else {
        this.setState({
          showTime: hour + min + second
        });
      }
    }
    if (deta > 0 && !this.isDistory) {
      setTimeout(() => {
        this.caculTime();
      }, 1000);
    }
  };

  componentWillUnmount() {
    this.isDistory = true;
  }

  linkStore = e => {
    e.stopPropagation();
    history.push(
      "/myCenter/message/detail?id=" + this.state.orderInfo.store_id
    );
  };

  remind = e => {
    e.stopPropagation();
    let data = {
      order_id: this.state.orderInfo.id
    };
    http({
      url: "/order.notice",
      method: "post",
      data
    }).then(res => {
      Toast.success("提醒发货成功！", 1);
    });
  };

  cancelOrder = e => {
    e.stopPropagation();
    history.push("/mycenter/order/ordercancel?id=" + this.state.orderInfo.id);
  };

  orderConfirm = e => {
    e.stopPropagation();
    let data = {
      id: this.state.orderInfo.id
    };
    Modal.alert("提示", "是否确认收货？", [
      { text: "取消", onPress: () => {} },
      {
        text: "确认",
        onPress: () => {
          http({
            url: "/order.receipt",
            method: "post",
            data
          }).then(res => {
            this.componentDidMount();
            Toast.success("收货成功！", 1);
          });
        }
      }
    ]);
  };

  orderRefund = (item, e) => {
    e.stopPropagation();
    if (this.state.orderInfo.operation == 5) {
      Modal.alert("提示", "已超过可售后时间，请联系平台客服解决", [
        {
          text: "确认",
          onPress: () => {}
        }
      ]);
      return;
    }
    if (item.refund_id) {
      history.push(
        `/mycenter/order/refundlist/detail?id=${item.order_id}&refund_id=${item.refund_id}&goods_id=${item.id}`
      );
    } else {
      history.push(
        `/mycenter/order/orderrefund?id=${item.order_id}&refund_id=${item.refund_id}&goods_id=${item.id}`
      );
    }
  };

  toExpressDetail = express => {
    history.push(
      `/mycenter/order/express?id=${this.state.orderInfo.id}&number=${express.number}`
    );
  };

  deleteOrder = e => {
    e.stopPropagation();
    let data = {
      id: this.state.orderInfo.id
    };
    Modal.alert("提示", "是否删除该订单记录？", [
      { text: "取消", onPress: () => {} },
      {
        text: "确认",
        onPress: () => {
          http({
            url: "/order.delete",
            method: "post",
            data
          }).then(res => {
            Toast.success("删除成功！", 1);
            history.goBack();
          });
        }
      }
    ]);
  };

  toDetail = drug => {
    history.push(`/goodsdetail/${drug.goods_id}`);
  };

  getStatusText = () => {
    //"operation": 1, #操作状态 ,0未付款，1待发货，3待收货,4确认收货,5已完成,6已取消
    let { orderInfo } = this.state;
    switch (orderInfo.operation) {
      case 0:
        return this.state.showTime + "后自动关闭订单";
      case 1:
        break;
      case 2:
        break;
      case 3:
        return this.state.showTime + "后自动确认收货";
      case 4:
        break;
    }
  };

  getOperationView = () => {
    //"operation": 0未付款，1待发货，3待收货,4确认收货,5已完成,6已取消
    let { orderInfo } = this.state;
    switch (orderInfo.operation) {
      case 0:
        return (
          <div className="bottomCard">
            <div className="auto" />
            <div
              className="linkus"
              onClick={item => {
                this.linkStore(item);
              }}
            >
              联系卖家
            </div>
            <div
              className="cancel"
              onClick={item => {
                this.cancelOrder(item);
              }}
            >
              取消订单
            </div>
            <div
              className="pay"
              onClick={() => {
                this.toPay();
              }}
            >
              去付款
            </div>
          </div>
        );
      case 1:
        return (
          <div className="bottomCard">
            <div className="auto" />
            <div
              className="linkus"
              onClick={item => {
                this.linkStore(item);
              }}
            >
              联系卖家
            </div>
            <div
              className="refund"
              onClick={e => {
                let item = {
                  order_id: this.state.orderInfo.id,
                  refund_id:
                    this.state.drugs.length > 0
                      ? this.state.drugs[0].refund_id
                      : 0,
                  id: 0
                };
                this.orderRefund(item, e);
              }}
            >
              申请退款
            </div>
            <div
              className="remind"
              onClick={e => {
                this.remind(e);
              }}
            >
              提醒发货
            </div>
            <div style={{ width: "0.1rem" }} />
          </div>
        );
      case 3:
        return (
          <div className="bottomCard">
            <div className="auto" />
            <div
              className="linkus"
              onClick={item => {
                this.linkStore(item);
              }}
            >
              联系卖家
            </div>
            <div
              className="confirm"
              onClick={e => {
                this.orderConfirm(e);
              }}
            >
              确认收货
            </div>
            <div style={{ width: "0.1rem" }} />
          </div>
        );
      case 4:
      case 5:
        return (
          <div className="bottomCard">
            <div className="auto" />
            <div
              className="linkus"
              onClick={item => {
                this.linkStore(item);
              }}
            >
              联系卖家
            </div>
            <div style={{ width: "0.1rem" }} />
          </div>
        );
        break;
      case 6:
        return (
          <div className="bottomCard">
            <div className="auto" />
            <div
              className="linkus"
              onClick={e => {
                this.deleteOrder(e);
              }}
            >
              删除订单
            </div>
            <div style={{ width: "0.1rem" }} />
          </div>
        );
        break;
    }
  };

  render() {
    let { orderInfo, drugs } = this.state;
    return (
      <div className="--orderDetailPage">
        <TopBar name="订单详情" style={{ background: "#f5f6f8" }} />

        <div className="scrollView">
          {/**顶部状态**/}
          <div className="statusCard">
            <div className="status">{ORDER_STATUS[orderInfo.operation]}</div>
            <div className="time">{this.getStatusText()}</div>
          </div>
          {/**地址express**/}

          <div className="addressCard">
            {orderInfo.express &&
              orderInfo.express.map(express => (
                <div className="cardItem">
                  <ImageView
                    src={icExpress}
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
                      this.toExpressDetail(express);
                    }}
                  >
                    <div className="express">快递公司：{express.name}</div>
                    <div className="address">快递单号：{express.number}</div>
                  </div>
                  <ImageView
                    src={storeRight}
                    style={{
                      width: "0.07rem",
                      height: "0.1rem",
                      marginRight: "0.2rem"
                    }}
                  />
                </div>
              ))}

            {orderInfo.express && <div className="line" />}
            <div className="cardItem">
              <ImageView
                src={icAddress}
                style={{
                  width: "0.25rem",
                  height: "0.25rem",
                  marginLeft: "0.15rem",
                  marginRight: "0.15rem"
                }}
              />
              <div className="addressGroup">
                <div className="people">
                  {orderInfo.accept_name} {orderInfo.telephone}
                </div>
                <div className="address">
                  {orderInfo.province}
                  {orderInfo.city}
                  {orderInfo.county}
                  {orderInfo.address}
                </div>
              </div>
            </div>
          </div>

          {/**顶部状态**/}
          <div className="orderCard">
            {/**药店**/}
            <div className="storeGroup">
              <div className="store">
                <div className="storeName">{orderInfo.store_name}</div>
                <ImageView
                  src={storeRight}
                  style={{ width: "0.07rem", height: "0.1rem" }}
                />
              </div>
            </div>
            {/**药品**/}
            {drugs &&
              drugs.map(drug => (
                <div
                  key={drug.id}
                  className="drugItem"
                  onClick={() => {
                    this.toDetail(drug);
                  }}
                >
                  <div className="drugGroup">
                    <ImageView
                      src={drug.image}
                      style={{
                        width: "0.8rem",
                        height: "0.8rem",
                        flex: "none"
                      }}
                    />
                    <div className="drugContent">
                      <div className="amountName">{drug.name}</div>
                      <div>
                        <span>
                          {drug.product_id != 0 ? (
                            <span className="drug-spec">
                              {drug.attributes.join(" ")}
                            </span>
                          ) : null}
                        </span>
                      </div>
                      <div className="amountGroup">
                        <div className="priceGroup">
                          <div className="pricePrefix">￥</div>
                          <div>{parseFloat(drug.origin_money)}</div>
                        </div>
                        <div>x{drug.count}</div>
                      </div>
                    </div>
                  </div>
                  <div className="bottomGroup">
                    <div />
                    {(orderInfo.operation == 3 ||
                      orderInfo.operation == 4 ||
                      orderInfo.operation == 5) && (
                      <div
                        className="linkus"
                        onClick={e => {
                          this.orderRefund(drug, e);
                        }}
                      >
                        申请退款
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>

          <div className="infoCard">
            <div className="infoGroup">
              <div className="name">商品总价</div>
              <div className="value">
                {parseFloat(
                  (orderInfo.total_money - orderInfo.freight).toFixed(2)
                )}
              </div>
            </div>
            <div className="infoGroup">
              <div className="name">运费(快递)</div>
              <div className="value">{parseFloat(orderInfo.freight)}</div>
            </div>
            {(orderInfo.coupon_deduction != 0 ||
              !orderInfo.coupon_deduction) && (
              <div className="infoGroup">
                <div className="name">优惠券</div>
                <div className="value">
                  {parseFloat(orderInfo.coupon_deduction)}
                </div>
              </div>
            )}

            {(orderInfo.reduction_deduction != 0 ||
              !orderInfo.reduction_deduction) && (
              <div className="infoGroup">
                <div className="name">满减优惠</div>
                <div className="value">
                  {parseFloat(orderInfo.reduction_deduction)}
                </div>
              </div>
            )}
            <div
              style={{
                height: "1px",
                background: "#F5F6F8",
                marginTop: "0.05rem",
                marginLeft: "0.1rem",
                marginRight: "0.1rem"
              }}
            />
            <div className="infoGroup">
              <div className="name">实付款</div>
              <div className="value money">
                {parseFloat(orderInfo.pay_money)}
              </div>
            </div>
          </div>

          <div className="timeCard">
            <div className="timeGroup">
              <div className="name">订单编号:</div>
              <div className="value">{orderInfo.number}</div>
              <div className="auto" />

              <CopyToClipboard
                text={orderInfo.number}
                onCopy={() => {
                  Toast.show("复制成功", 1);
                }}
              >
                <span className="copy">复制</span>
              </CopyToClipboard>
            </div>

            {orderInfo.trade_no != "" && (
              <div className="timeGroup">
                <div className="name">支付交易号:</div>
                <div className="value line-clamp-one">{orderInfo.trade_no}</div>
              </div>
            )}

            {orderInfo.operation >= 0 && (
              <div className="timeGroup">
                <div className="name">创建时间:</div>
                <div className="value">
                  {moment
                    .unix(orderInfo.create_time)
                    .format("YYYY-MM-DD HH:mm")}
                </div>
              </div>
            )}

            {orderInfo.operation >= 1 && orderInfo.operation != 6 && (
              <div className="timeGroup">
                <div className="name">付款时间:</div>
                <div className="value">
                  {moment.unix(orderInfo.pay_time).format("YYYY-MM-DD HH:mm")}
                </div>
              </div>
            )}

            {orderInfo.operation >= 3 && orderInfo.operation != 6 && (
              <div className="timeGroup">
                <div className="name">发货时间:</div>
                <div className="value">
                  {moment.unix(orderInfo.send_time).format("YYYY-MM-DD HH:mm")}
                </div>
              </div>
            )}

            {orderInfo.operation == 4 && (
              <div className="timeGroup">
                <div className="name">成交时间:</div>
                <div className="value">
                  {moment
                    .unix(orderInfo.receiving_time)
                    .format("YYYY-MM-DD HH:mm")}
                </div>
              </div>
            )}

            {orderInfo.operation == 5 && (
              <div className="timeGroup">
                <div className="name">成交时间:</div>
                <div className="value">
                  {moment
                    .unix(orderInfo.completion_time)
                    .format("YYYY-MM-DD HH:mm")}
                </div>
              </div>
            )}

            {orderInfo.operation == 6 && (
              <div className="timeGroup">
                <div className="name">关闭时间:</div>
                <div className="value">
                  {moment
                    .unix(orderInfo.cancel_time)
                    .format("YYYY-MM-DD HH:mm")}
                </div>
              </div>
            )}
          </div>
          <div style={{ height: "0.5rem", flex: "none" }} />
          {this.getOperationView()}
        </div>
      </div>
    );
  }
}
export default Index;
