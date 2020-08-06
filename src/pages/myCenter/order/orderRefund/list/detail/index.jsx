import React from "react";
import http from "@/util/http";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";
import storeRight from "@/assets/images/ic_order_store_right.png";
import history from "@/util/history";
import "./index.less";
import qs from "qs";
import { connect } from "react-redux";
import * as actions from "@/store/actions/login";
import kefu_img from "@/assets/images/kefu@3x.png";
import icTel from "@/assets/images/ic_tel.png";
import moment from "moment";
import Auth from "@/components/auth";
import * as classnames from "classnames";

@connect(state => ({
  ...state.login
}))
@Auth
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
    refundDialogArray: [
      "收到货不喜欢",
      "快递一直未到",
      "商品有破损",
      "商品与描述不符",
      "质量问题"
    ],

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
    let refund_id = this.params.refund_id;
    if (refund_id != 0) {
      this.setState({
        refund_id: refund_id
      });
      let params = {
        id: refund_id
      };
      http({
        url: "/refund.get",
        params,
        loading: true
      }).then(res => {
        let result = res.data.data;

        // 未发货不设置goods_id，发货之后设置如下goods_ids(发货之后只有一个id)
        // this.params.goods_id = result.goods_ids;
        // "order_status": 4, #订单状态0未付款，1待发货，3待收货,4确认收货,5已完成,6已取消
        if (result.order_status > 1) {
          this.params.goods_id = result.goods_ids;
        } else {
          this.params.goods_id = 0;
        }

        this.setState(
          {
            refund_state: result.status,
            orderInfo: result,
            drugs: result.goods,
            money: result.money
          },
          () => {}
        );
      });
      return;
    }

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

  toDetailPage = id => {
    history.push(`/goodsdetail/${id}`);
  };

  toMessageCenter = () => {
    if (this.state.orderInfo.store_id) {
      history.push(
        `/mycenter/message/detail?id=${this.state.orderInfo.store_id}`
      );
    }
  };

  toNegotiate = () => {
    history.push(
      `/myCenter/order/refundList/detail/negotiate?refund_id=${this.params.refund_id}&store_id=${this.state.orderInfo.store_id}`
    );
  };

  getMoneyText = status => {
    switch (status) {
      case 1:
        return this.state.orderInfo.money;
      case 5:
        return this.state.orderInfo.real_money;
      case 6:
        return 0;
    }
  };

  getStatusText = status => {
    switch (status) {
      case 1:
        return "等待商家处理";
      case 5:
        return "卖家同意您的退款申请，款项会原路退回您的账户，注意查收！";
      case 6:
        return "卖家拒绝您的退款，如有疑问联系客服！";
    }
  };

  reApply = () => {
    history.push(
      `/mycenter/order/orderrefund?id=${this.params.id}&refund_id=${this.params.refund_id}&goods_id=${this.params.goods_id}`
    );
  };

  render() {
    let { orderInfo, drugs } = this.state;

    return (
      <div className="--orderRefundDetailPage">
        <TopBar
          name="售后详情"
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
        <div
          className={classnames({
            scrollView: true,
            marginBottom: orderInfo.status === 6
          })}
        >
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
                        <div>{parseFloat(drug.money)}</div>
                      </div>
                      <div>x{drug.count}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div
            style={{ height: "0.1rem", flex: "none", background: "f5f6f8" }}
          />
          <div className="cancelItem">
            <div className="text">退款金额</div>
            <div className="priceGroup">
              <div style={{ textAlign: "end", color: "#FF5000" }}>
                ￥{parseFloat(this.getMoneyText(orderInfo.status))}
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              flex: "none",
              height: "1px",
              background: "f5f6f8"
            }}
          />
          <div className="status">{this.getStatusText(orderInfo.status)}</div>
          <div
            style={{ height: "0.1rem", flex: "none", background: "f5f6f8" }}
          />

          <div className="detailGroup">
            <div className="detailText">协商历史</div>
            <div
              className="detailContentGroup"
              onClick={() => {
                this.toNegotiate();
              }}
            >
              <div className="detailContent">
                {orderInfo.last_content}
                {/*买家申请退款{parseFloat(orderInfo.money)}元商品*/}
              </div>
              <ImageView
                src={storeRight}
                style={{
                  width: "0.07rem",
                  height: "0.1rem"
                }}
              />
            </div>
          </div>

          <div
            style={{ height: "0.1rem", flex: "none", background: "f5f6f8" }}
          />

          <div className="detail">
            <div className="group">
              <div className="name">退款原因:</div>
              <div className="value">{orderInfo.reason}</div>
            </div>
            <div className="group">
              <div className="name">退款金额:</div>
              <div className="value">{parseFloat(orderInfo.money)}元</div>
            </div>
            <div className="group">
              <div className="name">创建时间:</div>
              <div className="value">
                {moment.unix(orderInfo.create_time).format("YYYY.MM.DD HH:mm")}
              </div>
            </div>
            <div className="group">
              <div className="name">退款编号:</div>
              <div className="value">{orderInfo.id}</div>
            </div>
            <div className="group">
              <div className="name">订单编号:</div>
              <div className="value">{orderInfo.number}</div>
            </div>
          </div>
        </div>

        {orderInfo.status === 6 &&
          orderInfo.support_status === 0 &&
          orderInfo.order_status !== 5 &&
          orderInfo.order_status !== 6 && (
            <div
              className={"reApply"}
              onClick={() => {
                this.reApply();
              }}
            >
              重新申请售后
            </div>
          )}
      </div>
    );
  }
}
export default Index;
