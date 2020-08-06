import React from "react";
import { withRouter } from "react-router-dom";
import { Checkbox } from "antd-mobile";
import http from "@/util/http";
import PrivacyProtocol from "./privacyProtocol";
import RegisterAgreement from "./registerAgreement";
import { setCookie, getCookie } from "@/util/methods";
import { connect } from "react-redux";
import { changeIsLogin, getUserInfo } from "@/store/actions/login";
import qs from "qs";
import { getCouponNewList } from "@/store/actions/couponNewListModal";
import "./index.less";
import { getUserId, setEvent } from "../../util/methods";
import { setCache } from "@/store/actions/cache";
import isWeixin from "@/util/tools";

let ua = navigator.userAgent.toLowerCase();

//判断是移动端还是pc端
let is_mobi =
  ua.match(
    /(ipod|ipad|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i
  ) != null;

@withRouter
@connect()
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: undefined,
      code: undefined,
      btntext: "获取验证码",
      countDown: false,
      canLogin: false,
      page: 1, //1登录2注册协议3.隐私协议
      agree: true,
      showPage: false,
      auth_id: ""
    };
  }

  componentDidMount() {
    //微信浏览器
    if (isWeixin) {
      //判断是否是微信code ```
      const params = qs.parse(window.location.search.split("?")[1]);
      if (params.code) {
        //有微信code直接微信登录
        params.state === "login" && this.login(params.code);
      } else {
        //没有微信code去获取微信授权
        var url = window.location.href;
        var strs = url.split("?");
        this.doWxAuthorization(strs[0]);
      }
    } else {
      this.setState({ showPage: true });
    }
  }

  //微信授权
  doWxAuthorization(page) {
    var redirect_uri = encodeURIComponent(page);
    window.location.href =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1310dfcee8268057&redirect_uri=" +
      redirect_uri +
      "&response_type=code&scope=snsapi_userinfo&state=login&&connect_redirect=1&#wechat_redirect";
  }

  //微信登录
  login(code) {
    let inviter_id = getCookie("inviter_id");
    let params = { wechat_code: code };
    if (inviter_id) params.inviter_id = inviter_id;
    http({
      url: "/wechatlogin",
      params
    })
      .then(res => {
        this.loginSuccess(res.data.data.token, res.data.data.is_first);
      })
      .catch(error => {
        if (error.code == 3010) {
          //未绑定手机号，平台登录绑定手机号
          let auth_id = error.data.data.auth_id;
          this.setState({ auth_id, showPage: true });
        } else {
          // 重新授权
          var url = window.location.href;
          var strs = url.split("?");
          this.doWxAuthorization(strs[0]);
        }
      });
  }

  loginSuccess = (token, is_first) => {
    setCookie("token", token);
    setCookie("notShowRedpacketModal", true);
    getUserId();
    this.props.dispatch(getUserInfo());
    this.props.dispatch(changeIsLogin(true));

    if (isWeixin) {
      //微信go(-2)页面重新装载，在app.js中获取新人优惠券并弹窗
      // this.props.history.go(-2);
      if (is_mobi) {
        this.props.history.go(-2);
      } else {
        this.props.history.go(-3);
      }
    } else {
      is_first && this.props.dispatch(getCouponNewList());
      this.props.history.go(-1);
    }
  };

  //手机号，验证码，是否同意协议
  inputValue(key, value) {
    this.setState({ [key]: value }, () => {
      const { mobile, code, agree } = this.state;
      this.setState({
        canLogin:
          mobile && code && agree && mobile.length === 11 && code.length >= 4
            ? true
            : false
      });
    });
  }

  //发送验证码
  handleSendCode() {
    const { countDown, mobile } = this.state;
    if (countDown) {
      return;
    }
    if (mobile && mobile.length == 11) {
      http({
        url: "/platform.code",
        params: {
          phone: mobile
        }
      }).then(res => {
        this.sendCodeCountDown();
      });
    }
  }

  //平台登录
  handleLogin() {
    let inviter_id = getCookie("inviter_id");
    const { mobile, code, auth_id, canLogin } = this.state;
    if (!canLogin) return;
    let params = { phone: mobile, code, type: isWeixin ? 1 : 2 };
    if (isWeixin) params.auth_id = auth_id;
    if (inviter_id) params.inviter_id = inviter_id;
    http({
      url: "/login",
      params
    }).then(res => {
      this.loginSuccess(res.data.data.token, res.data.data.is_first);
      setEvent("注册/登录", "立即登录");
    });
  }

  //发生验证码倒计时
  sendCodeCountDown() {
    var coden = 60; // 定义60秒的倒计时
    this.setState({
      btntext: --coden + "s",
      countDown: true
    });
    var codeV = setInterval(() => {
      this.setState({
        // _this这里的作用域不同了
        btntext: --coden + "s",
        countDown: true
      });
      if (coden == -1) {
        // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
        clearInterval(codeV);
        this.setState({
          btntext: "获取验证码",
          countDown: false
        });
      }
    }, 1000); //  1000是1秒
  }

  //注册协议
  chengnuo = () => {
    this.setState({
      page: 2
    });
  };

  //隐私协议
  xieyi = () => {
    this.setState({
      page: 3
    });
  };

  //返回登录页面
  handleProtocolBack = () => {
    this.setState({
      page: 1
    });
  };

  render() {
    //微信code用于后端获取openid
    const {
      mobile,
      code,
      btntext,
      countDown,
      canLogin,
      showPage,
      agree
    } = this.state;
    if (!showPage) return null;
    return (
      <div className={this.state.page == 1 ? "--login-page" : "agreementModal"}>
        {this.state.page == 1 && (
          <div className="login-content">
            {/* <div className="title">康策良品</div> */}
            <div
              style={{
                fontSize: ".36rem",
                color: "#A1ADB9",
                lineHeight: ".5rem",
                marginTop: ".4rem"
              }}
            >
              您好，
            </div>
            <div
              style={{
                fontSize: ".17rem",
                color: "#A1ADB9",
                lineHeight: ".24rem",
                marginTop: ".08rem"
              }}
            >
              请使用手机号登录
            </div>
            <div className="inputView">
              <div className="inputMobile">
                <input
                  value={mobile}
                  className="input"
                  placeholder="请输入手机号"
                  onChange={e => {
                    this.inputValue("mobile", e.target.value);
                  }}
                />
              </div>
              <div className="inputCodeView">
                <div className="leftView">
                  <input
                    value={code}
                    className="input"
                    placeholder="请输入验证码"
                    onChange={e => {
                      this.inputValue("code", e.target.value);
                    }}
                  />
                </div>
                <div
                  className={"code-btn " + (countDown ? "countDown" : "")}
                  onClick={this.handleSendCode.bind(this)}
                >
                  {btntext}
                </div>
              </div>
            </div>
            <div className="xieyi">
              <Checkbox
                checked={agree}
                style={{ marginRight: ".07rem" }}
                onChange={e => {
                  this.inputValue("agree", e.target.checked);
                }}
              />
              我已阅读
              <span onClick={this.chengnuo}>《康策良品注册协议》</span>
              <span onClick={this.xieyi}>《康策良品隐私协议》</span>
            </div>
            <div
              className={canLogin ? "yesBtn" : "noBtn"}
              onClick={() => {
                this.handleLogin();
              }}
            >
              立即登录
            </div>
          </div>
        )}
        {this.state.page == 2 && (
          <RegisterAgreement
            className="page"
            onBack={this.handleProtocolBack}
          />
        )}
        {this.state.page == 3 && (
          <PrivacyProtocol className="page" onBack={this.handleProtocolBack} />
        )}
      </div>
    );
  }
}

export default Login;
