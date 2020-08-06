import React from "react";
import history from "@/util/history";
import http from "@/util/http";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";
import MyListView from "@/components/listView";
import storeRight from "@/assets/images/ic_order_store_right.png";
import icPayWx from "@/assets/images/ic_pay_wx.png";
import icPayAli from "@/assets/images/ic_pay_ali.png";
import icPayKc from "@/assets/images/ic_pay_kc.png";
import icPayKcActive from "@/assets/images/ic_pay_kc_active.png";
import icPayTotal from "@/assets/images/ic_pay_total.png";
import icAddress from "@/assets/images/ic_address.png";
import "./index.less";
import {
  ActivityIndicator,
  Checkbox,
  ListView,
  Modal,
  PullToRefresh,
  Tabs,
  Toast
} from "antd-mobile";
import qs from "qs";
import { setCookie, setPage } from "../../../../util/methods";

let ua = navigator.userAgent.toLowerCase();
let isWeixin = ua.indexOf("micromessenger") != -1;

class Index extends React.Component {
  state = {
    number: "",
    totalPrice: 0,
    pay_type: -1,
    loading: false,
    balance: 0
  };

  componentDidMount() {
    setPage(window.location.pathname, `${window.location.origin}`);
    this.params = qs.parse(window.location.search.split("?")[1]);
    let temp = JSON.parse(this.params.state);
    this.setState({
      number: temp.number,
      totalPrice: temp.totalPrice
    });

    if (isWeixin) {
      this.setState({
        pay_type: 2
      });
    } else {
      this.setState({
        loading: true
      });
      http({
        url: "/self.money.get"
      }).then(res => {
        this.setState({
          balance: res.data.data.balance,
          loading: false
          // balance: res.data.data.balance
        });
      });
    }
  }

  toPay = () => {
    if (isWeixin) {
      let data = {
        number: this.state.number,
        pay_type: 2,
        scene: 2, //支付场景：1:H5,2:JSAPI
        wechat_code: this.params.code
      };
      if (Number(this.state.totalPrice) == 0) {
        data = {
          number: this.state.number,
          pay_type: 0,
          scene: 1 //支付场景：1:H5,2:JSAPI
        };
      }

      http({
        url: "/pay.pay",
        method: "post",
        data,
        loading: true
      }).then(res => {
        setCookie("scene", data.scene);
        setCookie("number", data.number);
        setCookie("number_type", data.pay_type);
        if (data.pay_type == 0) {
          history.replace(`/mycenter/order/pay/result`);
          return;
        }
        let result = res.data.data;
        if (typeof window.WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener(
              "WeixinJSBridgeReady",
              () => {
                this.onBridgeReady(result);
              },
              false
            );
          } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", () => {
              this.onBridgeReady(result);
            });
            document.attachEvent("onWeixinJSBridgeReady", () => {
              this.onBridgeReady(result);
            });
          }
        } else {
          this.onBridgeReady(result);
        }
      });
    } else {
      let data = {
        number: this.state.number,
        pay_type: this.state.pay_type,
        scene: 1
      };
      if (Number(this.state.totalPrice) == 0) {
        data = {
          number: this.state.number,
          pay_type: 0,
          scene: 1 //支付场景：1:H5,2:JSAPI
        };
      }
      if (data.pay_type === -1) {
        Toast.fail("请选择支付方式！", 1);
        return;
      }

      http({
        url: "/pay.pay",
        method: "post",
        data,
        loading: true
      }).then(res => {
        setCookie("scene", data.scene);
        setCookie("number", data.number);
        setCookie("number_type", data.pay_type);
        switch (data.pay_type) {
          case 0:
            history.replace(`/mycenter/order/pay/result`);
            break;
          case 1: //1.支付宝
            document.getElementById("pay").innerHTML = res.data.data;
            document.forms[0].submit();
            break;
          case 2: //2.微信
            let a = res.data.data.mweb_url;
            window.location.href = a;
            break;
          case 3:
            history.replace(`/mycenter/order/pay/result`);
            break;
        }
      });
    }
  };

  onBridgeReady = data => {
    window.WeixinJSBridge.invoke(
      "getBrandWCPayRequest",
      {
        //下面参数内容都是后台返回的
        appId: data.appId, //公众号名称，由商户传入
        timeStamp: data.timeStamp, //时间戳
        nonceStr: data.nonceStr, //随机串
        package: data.package, //预支付id
        signType: data.signType, //微信签名方式
        paySign: data.paySign //微信签名
      },
      function(res) {
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          history.replace(`/mycenter/order/pay/result`);
        } else {
        }
      }
    );
  };

  onPayChange = payWay => {
    this.setState({
      pay_type: payWay
    });
  };

  render() {
    let { totalPrice, pay_type, balance, loading } = this.state;
    return (
      <div className='--payPage'>
        <TopBar
          name='确认支付'
          style={{ background: "#ffffff" }}
          onBack={() => {
            if (this.params.code) {
              history.go(-1);
            } else {
              history.go(-1);
            }
          }}
        />

        <div style={{ marginBottom: "0.15rem" }}>
          <div className='payWayItem'>
            <ImageView
              style={{ width: "0.22rem", height: "0.22rem" }}
              src={icPayWx}
            />
            <div className='name'>微信支付</div>
            <Checkbox
              onChange={() => {
                this.onPayChange(2);
              }}
              checked={pay_type === 2}
              disabled={Number(totalPrice) == 0}
            />
          </div>

          {!isWeixin && (
            <div className='payWayItem'>
              <ImageView
                style={{ width: "0.22rem", height: "0.22rem" }}
                src={icPayAli}
              />
              <div className='name'>支付宝支付</div>
              <Checkbox
                onChange={() => {
                  this.onPayChange(1);
                }}
                checked={pay_type === 1}
                disabled={Number(totalPrice) == 0}
              />
            </div>
          )}
          {/* !isWeixin && (
            <div className="payWayItem">
              <ImageView
                style={{ width: "0.22rem", height: "0.22rem" }}
                src={balance > Number(totalPrice) ? icPayKcActive : icPayKc}
              />
              <div
                className="name"
                style={{
                  display: "flex"
                }}
              >
                康策豆支付
                <div
                  style={{
                    marginLeft: "0.1rem",
                    fontSize: "0.12rem",
                    color: "#657281"
                  }}
                >
                  余额：{balance}
                </div>
                <ActivityIndicator
                  animating={loading}
                  style={{ marginLeft: "0.1rem" }}
                />
              </div>
              <Checkbox
                onChange={() => {
                  this.onPayChange(3);
                }}
                checked={pay_type === 3}
                disabled={
                  balance < Number(totalPrice) || Number(totalPrice) == 0
                }
              />
            </div>
          ) */}
        </div>

        <div
          className='toPay'
          onClick={() => {
            this.toPay();
          }}
        >
          支付￥{totalPrice}
        </div>
        <div id='pay' />
      </div>
    );
  }
}

export default Index;
