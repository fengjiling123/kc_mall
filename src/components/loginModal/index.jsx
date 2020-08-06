import React from "react";
import { Modal } from 'antd-mobile';
import http from "@/util/http";
import "./index.less"
import PrivacyProtocol from './privacyProtocol'
import RegisterAgreement from './registerAgreement'
class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: null,
      code: null,
      btntext: '获取验证码',
      countDown: false,
      canLogin: false,
      page:1 //1登录2注册协议3.隐私协议
    }
    this.data = {
      mobile:null,
      code:null
    }
  }

  inputValue(key,value) {
    if(key=='mobile') {
        this.data.mobile = value.target.value;
    } else {
        this.data.code = value.target.value;
    }
    if(this.data.mobile&&this.data.code&&this.data.mobile.length == 11 && this.data.code.length >= 4) {
        this.setState({
            canLogin:true
          })
    } else { 
        this.setState({
            canLogin:false
          })
    }
}


  handleSendCode() {
    if (this.state.countDown) {
      return;
    }
    if (this.data.mobile && this.data.mobile.length == 11) {
      var params = {
        phone: this.data.mobile,
      }
      var url = '/platform.code';
      http({
        url,
        params
      }).then(res => {
        this.sendCodeCountDown();
      });
    }
  }
  handleLogin() {
    const { onLoginFail, onLoginSuccess,wxcode,type } = this.props;
    var url = '/login';
    var params = {phone: this.data.mobile,code:this.data.code,type};
    if(type === 1) {
      params.auth_id = wxcode;
    }
    console.log('login', params);
    http({
      url,
      params
    }).then(res => {
      console.log(res)
      onLoginSuccess(res.data.data.token)
    }).catch(e=>onLoginFail());
  }

  sendCodeCountDown() {

    var _this = this
    var coden = 60 // 定义60秒的倒计时
    this.setState({ // _this这里的作用域不同了
      btntext: (--coden) + 's',
      countDown: true
    })
    var codeV = setInterval(function () {
      _this.setState({ // _this这里的作用域不同了
        btntext: (--coden) + 's',
        countDown: true
      })
      if (coden == -1) { // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
        clearInterval(codeV)
        _this.setState({
          btntext: '获取验证码',
          countDown: false
        })
      }
    }, 1000) //  1000是1秒
  }

  chengnuo = () => {
    this.setState({
      page:2
    })
  }
  xieyi = () => {
    this.setState({
      page:3
    })
  }
  handleProtocolBack = () => {
    this.setState({
      page:1
    })
  }
  render() {
    //微信code用于后端获取openid
    const { visible, onLoginFail, onLoginSuccess,wxcode } = this.props;
    const {mobile, code,btntext,countDown, canLogin} = this.state;
    return (
      <div hidden={!visible} className={this.state.page==1?'loginModal':'agreementModal'}>

          {this.state.page==1 &&<div className='alertContent'>
            <div className='title'>手机号登录</div>
            <div className='inputView'>
              <div className='inputMobile'>
                <input type="text" value={mobile} className='input'
                  placeholder="请输入手机号"
                  onChange={this.inputValue.bind(this, 'mobile')} />
              </div>
              <div className='inputCodeView'>
                <div className='leftView'>
                  <input type="text" value={code} className='input'
                    placeholder="请输入验证码"
                    onChange={this.inputValue.bind(this, 'code')} />
                </div>
                <div className={'code-btn '+(countDown?'countDown':'')} onClick={this.handleSendCode.bind(this)}>{btntext}</div>
              </div>
            </div>
            <div className={canLogin ? 'yesBtn' : 'noBtn'} onClick={this.handleLogin.bind(this)}>立即登录</div>
            <div className='xieyi'>已阅读并同意
              <span className='aaa' onClick={this.chengnuo}>《康策良品注册协议》</span>和
              <span className='aaa' onClick={this.xieyi}>《康策良品隐私协议》</span>
            </div>
          </div>}
          {this.state.page == 2&&<RegisterAgreement className='page' onBack={this.handleProtocolBack}/>}
          {this.state.page == 3&&<PrivacyProtocol  className='page' onBack={this.handleProtocolBack}/>}
      </div>
    );
  }
}
export default LoginModal;
