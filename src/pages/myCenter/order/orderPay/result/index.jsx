import React from "react";
import history from "@/util/history";
import http from "@/util/http";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";
import icPayResult from "@/assets/images/ic_pay_result.png";
import CommendGoods from "@/components/commendGoods";
import "./index.less";
import qs from "qs";
import { getCookie, setCookie } from "../../../../../util/methods";

let bgQrCode =
  "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fbg_qr_code.png";
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBottom: false,
      text: "正在查询支付结果..."
    };
  }

  //检查是否滚动到底部
  onScrollHandle = () => {
    const scrollTop = this.scrollRef.scrollTop;
    const clientHeight = this.scrollRef.clientHeight;
    const scrollHeight = this.scrollRef.scrollHeight;
    const isBottom = scrollHeight - (scrollTop + clientHeight) < 180;
    if (isBottom && scrollTop) {
      this.setState({ isBottom: true });
    } else {
      this.setState({ isBottom: false });
    }
  };

  componentWillMount() {
    this.params = qs.parse(window.location.search.split("?")[1]);
    let scene = getCookie("scene");
    let number = getCookie("number");
    let number_type = parseFloat(getCookie("number_type"));
    if (number_type === 0 || number_type === 3) {
      this.setState({
        text: "支付成功"
      });
    } else {
      http({
        url: "/pay.get",
        params: {
          number: number,
          type: number_type,
          scene: scene
        }
      }).then(res => {
        //微信：#交易状态：WAIT_BUYER_PAY（交易创建，等待买家付款）、TRADE_CLOSED（未付款交易超时关闭，或支付完成后全额退款）、TRADE_SUCCESS（交易支付成功）、TRADE_FINISHED（交易结束，不可退款）
        //支付宝：#SUCCESS—支付成功，REFUND—转入退款，NOTPAY—未支付，CLOSED—已关闭，REVOKED—已撤销（付款码支付），USERPAYING--用户支付中（付款码支付），PAYERROR--支付失败(其他原因，如银行返回失败)
        switch (res.data.data.trade_state) {
          case "WAIT_BUYER_PAY":
          case "TRADE_CLOSED":
            this.setState({
              text: "等待支付"
            });
            break;
          case "TRADE_SUCCESS":
          case "TRADE_FINISHED":
            this.setState({
              text: "支付成功"
            });
            break;

          case "SUCCESS":
            this.setState({
              text: "支付成功"
            });
            break;
          case "REFUND":
            this.setState({
              text: "转入退款"
            });
            break;
          case "CLOSED":
            this.setState({
              text: "已关闭"
            });
            break;
          case "USERPAYING":
          case "NOTPAY":
            this.setState({
              text: "等待支付"
            });
            break;
          case "PAYERROR":
            this.setState({
              text: "支付失败"
            });
            break;
        }
      });
    }
  }

  render() {
    return (
      <div className="--payResultPage">
        <TopBar
          name="支付结果"
          style={{ background: "#ffffff" }}
          onBack={() => {
            if (this.params.isFromPayResult) {
              history.go(-5);
            } else {
              history.goBack();
            }
          }}
        />
        <div
          className="scroll-view"
          onScrollCapture={() => this.onScrollHandle()}
          ref={c => {
            this.scrollRef = c;
          }}
        >
          <div
            className="topGroup"
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ImageView
              src={icPayResult}
              style={{
                width: "0.8rem",
                height: "0.8rem",
                marginTop: "0.15rem"
              }}
            />
            <div className="result">{this.state.text}</div>

            <div className="buttonGroup">
              <div
                className="toHome"
                onClick={() => {
                  history.push("/");
                }}
              >
                返回首页
              </div>
              <div style={{ width: "0.2rem" }} />
              <div
                className="toOrder"
                onClick={() => {
                  history.push("/mycenter/order?refresh=true");
                }}
              >
                查看订单
              </div>
            </div>
            <ImageView
              src={bgQrCode}
              style={{ marginTop: "0.2rem", width: "3.45rem", height: "1rem" }}
            />
          </div>
          <CommendGoods isBottom={this.state.isBottom} />
        </div>
      </div>
    );
  }
}

export default Index;
