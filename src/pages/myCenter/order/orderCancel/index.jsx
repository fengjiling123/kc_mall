import React from "react";
import http from "@/util/http";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";
import storeRight from "@/assets/images/ic_order_store_right.png";
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

class Index extends React.Component {
  state = {
    dialog: false,
    dialogArray: ["拍错了", "不想要了", "商品缺货", "其他"],
    orderInfo: {},
    drugs: [],
    reason: ""
  };

  componentDidMount() {
    this.params = qs.parse(window.location.search.split("?")[1]);
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
    });
  }

  onReceived = reason => {
    this.setState({
      dialog: false,
      reason
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

  onCancelConfirm = () => {
    if (!this.state.reason) {
      Toast.fail("请选择退款原因!", 1);
      return;
    }
    let data = {
      id: this.params.id,
      cancel_reason: this.state.reason
    };
    http({
      url: "/order.cancel",
      method: "post",
      data
    }).then(res => {
      Toast.success("取消成功！", 1);
      setTimeout(() => {
        history.goBack();
      }, 500);
    });
  };

  toDetailPage = id => {
    history.push(`/goodsdetail/${id}`);
  };

  render() {
    let state = this.state;
    let { orderInfo, drugs } = this.state;
    return (
      <div className="--orderCancelPage">
        <TopBar name="取消订单" style={{ background: "#ffffff" }} />
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
                        <div>{parseFloat(orderInfo.pay_money)}</div>
                      </div>
                      <div>x{drug.count}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div
          className="cancelOrder"
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

        <div
          className="button"
          onClick={() => {
            this.onCancelConfirm();
          }}
        >
          确定
        </div>

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
                <div>
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
          <div id="pay" />
        </div>
      </div>
    );
  }
}
export default Index;
