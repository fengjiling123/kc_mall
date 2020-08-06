import React from "react";
import http from "@/util/http";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";
import storeRight from "@/assets/images/ic_order_store_right.png";
import icTel from "@/assets/images/ic_tel.png";
import history from "@/util/history";
import MyListView from "@/components/listView";
import {
  Checkbox,
  ListView,
  Modal,
  PullToRefresh,
  Tabs,
  Toast
} from "antd-mobile";
import "./index.less";
import qs from "qs";
import { connect } from "react-redux";
import * as actions from "@/store/actions/login";
import kefu_img from "@/assets/images/kefu@3x.png";

@connect(state => ({
  ...state.login
}))
class Index extends React.Component {
  state = {
    dialog: false,
    dialogArray: [
      "拍错了",
      "不想要了",
      "协商一致退款",
      "未按约定时间发货",
      "其他"
    ],
    refundDialog: false,

    refundDialogArray: [],

    refundDialogArray1: [
      "退邮费",
      "收到货不喜欢",
      "快递一直未到",
      "商品有破损",
      "商品与描述不符",
      "质量问题"
    ],

    refundDialogArray2: [
      "退邮费",
      "退邮费和商品",
      "收到货不喜欢",
      "快递一直未到",
      "商品有破损",
      "商品与描述不符",
      "质量问题"
    ],

    refundDialogArray3: ["退邮费", "快递一直未到"],

    receiveDialog: false,
    receiveDialogArray: ["是", "否"],

    orderInfo: {},
    drugs: [],
    reason: "",
    receive: "",
    explanation: "",
    refund_id: 0,
    showWaySelect: false,
    waySelect: 0,
    money: 0,
    refund_state: 1
  };

  componentDidMount() {
    this.props.dispatch(actions.getPlatformInfo());
    this.params = qs.parse(window.location.search.split("?")[1]);
    this.loadRefund();
  }

  loadRefund = () => {
    let params = {
      id: this.params.id
    };
    http({
      url: "/order.get",
      params,
      loading: true
    }).then(res => {
      let result = res.data.data;
      let temp = null;
      if (this.params.goods_id > 0) {
        result.goods.map(item => {
          if (item.id === parseInt(this.params.goods_id)) {
            temp = item;
          }
        });
        this.setState({
          orderInfo: result,
          drugs: [temp],
          money: temp.refund_money
        });
      } else {
        temp = result.goods[0];
        this.setState({
          orderInfo: result,
          drugs: result.goods,
          money: result.pay_money
        });
      }
    });

    //从货物 开启一个退货单
    let goods_id = this.params.goods_id;
    if (goods_id && goods_id != 0) {
      this.setState({
        showWaySelect: true
      });
    }
  };

  changeMoney = money => {
    this.setState({
      money: money
    });
  };

  onWaySelect = way => {
    if (way == 1) {
      this.setState({
        refundDialogArray: this.state.refundDialogArray1
      });
    }
    this.setState({
      showWaySelect: false,
      waySelect: way
    });
  };

  onReasonInput = reason => {
    this.setState({
      explanation: reason
    });
  };

  showReasonDialog = () => {
    this.setState({
      dialog: true
    });
  };

  closeReasonDialog = () => {
    this.setState({
      dialog: false
    });
  };

  onReason = reason => {
    this.setState({
      dialog: false,
      reason
    });
  };

  showRefundReasonDialog = () => {
    if (this.state.refundDialogArray.length == 0) {
      Toast.fail("请选择是否已经收到货物", 1.5);
      return;
    }
    this.setState({
      refundDialog: true
    });
  };

  closeRefundReasonDialog = () => {
    this.setState({
      refundDialog: false
    });
  };

  onRefundReason = reason => {
    this.setState({
      refundDialog: false,
      reason
    });
  };

  showReceivedReasonDialog = () => {
    this.setState({
      receiveDialog: true
    });
  };

  closeReceivedDialog = () => {
    this.setState({
      receiveDialog: false
    });
  };

  onReceived = reason => {
    let {
      receiveDialogArray,
      refundDialogArray2,
      refundDialogArray3
    } = this.state;
    this.setState({
      receiveDialog: false,
      receive: reason,
      reason: ""
    });

    if (reason === receiveDialogArray[0]) {
      this.setState({
        refundDialogArray: refundDialogArray2
      });
    } else {
      this.setState({
        refundDialogArray: refundDialogArray3
      });
    }
  };

  onCancelConfirm = () => {
    //从已发货订单创建一个新的退款单
    let goods_id = this.params.goods_id;
    let refund_id = parseFloat(this.params.refund_id);
    if (refund_id === 0) refund_id = null;
    if (goods_id && goods_id != 0) {
      console.log("goods_id", goods_id);
      let data = {
        order_id: this.params.id,
        order_goods_id: goods_id,
        explanation: this.state.explanation,
        reason: this.state.reason,
        type: this.state.waySelect,
        money: this.state.money,
        refund_id,
        refund_type: refund_id ? 2 : 1
      };
      http({
        url: "/reject.create",
        method: "post",
        data,
        loading: true
      }).then(res => {
        Toast.success("提交成功，请等待商家处理。", 1);
        history.replace(
          `/myCenter/order/refundList/detail?id=${this.params.id}&refund_id=${res.data.data.refund_id}`
        );
      });
      return;
    }

    //从未发货订单创建一个新的退款单
    if (!this.state.reason) {
      Toast.fail("请选择退款原因!", 1);
      return;
    }
    let data = {
      order_id: this.params.id,
      reason: this.state.reason,
      explanation: this.state.explanation,
      money: this.state.money,
      refund_id,
      refund_type: refund_id ? 2 : 1
    };
    http({
      url: "/refund.create",
      method: "post",
      data,
      loading: true
    }).then(res => {
      Toast.success("提交成功，请等待商家处理。", 1);
      history.replace(
        `/myCenter/order/refundList/detail?id=${this.params.id}&refund_id=${res.data.data.refund_id}`
      );
    });
  };

  toDetailPage = id => {
    history.push(`/goodsdetail/${id}`);
  };

  toMessageCenter = () => {
    if (this.state.orderInfo.store_id) {
      history.push(
        `/myCenter/message/detail?id=${this.state.orderInfo.store_id}`
      );
    }
  };

  inputFocus = () => {
    window.scroll(0, 0);
  };

  render() {
    let state = this.state;
    let {
      orderInfo,
      drugs,
      refund_id,
      showWaySelect,
      waySelect,
      refund_state
    } = this.state;

    return (
      <div className="--orderRefundPage">
        <TopBar
          name="申请退款"
          style={{ background: "#ffffff" }}
          rightChild={
            <div style={{ display: "flex" }}>
              <div
                style={{
                  height: "0.45rem",
                  width: "0.5rem",
                  overflow: "hidden",
                  transform: "scale(0.8)",
                  position: "relative"
                }}
              >
                <img
                  src={icTel}
                  style={{
                    position: "absolute",
                    height: "0.2rem",
                    top: "0.05rem",
                    left: "0.15rem"
                  }}
                />
                <a
                  style={{
                    position: "absolute",
                    height: "0.45rem",
                    paddingTop: "0.12rem",
                    fontSize: "12px",
                    color: "#666",
                    webkitBackfaceVisibility: "visible"
                  }}
                  href={"tel:" + this.props.service_phone}
                >
                  联系平台
                </a>
              </div>
              <div
                style={{
                  width: "0.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: "scale(0.8)"
                }}
                onClick={() => {
                  this.toMessageCenter();
                }}
              >
                <img src={kefu_img} style={{ height: "0.2rem" }} />
                <div
                  style={{
                    fontSize: "10px",
                    marginTop: "0.05rem",
                    color: "#666",
                    height: "12px",
                    lineHeight: "12px"
                  }}
                >
                  联系商家
                </div>
              </div>
            </div>
          }
        />
        <div className="scrollView">
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
                  className="drugGroup"
                  onClick={() => {
                    this.toDetailPage(drug.goods_id);
                  }}
                >
                  <ImageView
                    src={drug.image}
                    style={{
                      borderRadius: "0.05rem",
                      overflow: "hidden",
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
          </div>
          <div style={{ height: "0.1rem", flex: "none" }} />
          {showWaySelect && (
            <div className="waySelect">
              <div
                className="cancelItem"
                onClick={() => {
                  this.onWaySelect(1);
                }}
              >
                <div className="text">我要退款</div>
                <ImageView
                  src={storeRight}
                  style={{
                    width: "0.07rem",
                    height: "0.1rem",
                    marginRight: "0.15rem"
                  }}
                />
              </div>
              <div className="line" />
              <div
                className="cancelItem"
                onClick={() => {
                  this.onWaySelect(3);
                }}
              >
                <div className="text">我要退款退货</div>
                <ImageView
                  src={storeRight}
                  style={{
                    width: "0.07rem",
                    height: "0.1rem",
                    marginRight: "0.15rem"
                  }}
                />
              </div>
            </div>
          )}
          {!showWaySelect && (
            <div className="content">
              <div className="cancelItem">
                <div className="text">退款金额</div>
                <div className="priceGroup">
                  {/*<div className="pricePrefix">￥</div>*/}
                  <input
                    style={{ textAlign: "end", color: "#FF5000" }}
                    value={this.state.money}
                    onChange={e => {
                      this.changeMoney(e.target.value);
                    }}
                  />
                </div>
              </div>

              {refund_state > 1 && refund_state != 6 && (
                <div
                  style={{
                    marginTop: "0.1rem",
                    marginLeft: "0.15rem",
                    marginRight: "0.15rem",
                    marginBottom: "0.1rem"
                  }}
                >
                  卖家已同意你的退款申请，款项会原路退回至您的账户，请注意查收！
                </div>
              )}

              {refund_state == 6 && (
                <div
                  style={{
                    marginTop: "0.1rem",
                    marginLeft: "0.15rem",
                    marginRight: "0.15rem",
                    marginBottom: "0.1rem"
                  }}
                >
                  卖家已拒绝你的退款，如有疑问，请联系客服！
                </div>
              )}
              {waySelect === 3 && refund_state <= 1 && <div className="line" />}

              {waySelect === 3 && refund_state <= 1 && (
                <div
                  className="cancelItem"
                  onClick={() => {
                    this.showReceivedReasonDialog();
                  }}
                >
                  <div className="text">是否已收到货物</div>
                  <div className="valueGroup">
                    <div className="value">
                      {state.receive ? state.receive : "请选择"}
                    </div>
                    <ImageView
                      src={storeRight}
                      style={{ width: "0.07rem", height: "0.1rem" }}
                    />
                  </div>
                </div>
              )}

              {refund_id === 0 && refund_state <= 1 && <div className="line" />}
              {refund_id === 0 && refund_state <= 1 && waySelect === 0 && (
                <div
                  className="cancelItem"
                  onClick={() => {
                    this.showReasonDialog();
                  }}
                >
                  <div className="text">取消订单原因</div>
                  <div className="valueGroup">
                    <div className="value">
                      {state.reason ? state.reason : "请选择"}
                    </div>
                    <ImageView
                      src={storeRight}
                      style={{ width: "0.07rem", height: "0.1rem" }}
                    />
                  </div>
                </div>
              )}

              {waySelect !== 0 && refund_id === 0 && refund_state <= 1 && (
                <div
                  className="cancelItem"
                  onClick={() => {
                    this.showRefundReasonDialog();
                  }}
                >
                  <div className="text">退款原因</div>
                  <div className="valueGroup">
                    <div className="value">
                      {state.reason ? state.reason : "请选择"}
                    </div>
                    <ImageView
                      src={storeRight}
                      style={{ width: "0.07rem", height: "0.1rem" }}
                    />
                  </div>
                </div>
              )}

              {refund_id === 0 && refund_state <= 1 && <div className="line" />}
              {refund_id === 0 && refund_state <= 1 && (
                <div className="cancelItem">
                  <div className="text">退款说明</div>
                  <input
                    ref="reason"
                    className="reasonInput"
                    placeholder="请输入退款说明"
                    onBlur={this.inputFocus}
                    onFocus={this.inputFocus}
                    onChange={e => {
                      this.onReasonInput(e.target.value);
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {refund_state <= 1 && (
          <div
            style={{
              background: "#ffb516",
              position: "absolute",
              textAlign: "center",
              color: "#ffffff",
              lineHeight: "0.4rem",
              height: "0.4rem",
              width: "100%",
              bottom: "0"
            }}
            onClick={() => {
              this.onCancelConfirm();
            }}
          >
            确定
          </div>
        )}

        <div>
          <Modal
            popup
            maskClosable
            visible={state.dialog}
            animationType="slide-up"
            onClose={this.closeReasonDialog}
            className="modalCard"
          >
            <div className="modalContent">
              {this.state.dialogArray.map(item => (
                <div key={item}>
                  <div
                    className="content"
                    onClick={() => {
                      this.onReason(item);
                    }}
                  >
                    {item}
                  </div>
                  <div className="line" />
                </div>
              ))}
            </div>
          </Modal>
        </div>
        <div>
          <Modal
            popup
            maskClosable
            visible={state.refundDialog}
            animationType="slide-up"
            onClose={this.closeRefundReasonDialog}
            className="modalCard"
          >
            <div className="modalContent">
              {this.state.refundDialogArray.map(item => (
                <div key={item}>
                  <div
                    className="content"
                    onClick={() => {
                      this.onRefundReason(item);
                    }}
                  >
                    {item}
                  </div>
                  <div className="line" />
                </div>
              ))}
            </div>
          </Modal>
        </div>
        <div>
          <Modal
            popup
            maskClosable
            visible={state.receiveDialog}
            animationType="slide-up"
            onClose={this.closeReceivedDialog}
            className="modalCard"
          >
            <div className="modalContent">
              {this.state.receiveDialogArray.map(item => (
                <div key={item}>
                  <div
                    className="content"
                    onClick={() => {
                      this.onReceived(item);
                    }}
                  >
                    {item}
                  </div>
                  <div className="line" />
                </div>
              ))}
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
export default Index;
