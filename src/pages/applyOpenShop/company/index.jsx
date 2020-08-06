import React from "react";
import history from "@/util/history";
import TopBar from "@/components/topBar";
import http from "@/util/http";
import { connect } from "react-redux";
import Alert from "@/components/alertModal";
import * as seller from "../../../store/actions/seller";
import qs from "qs";
import "./index.less";
import axios from "axios";
import { Toast, ActivityIndicator } from "antd-mobile";
import xieyitongyi from "@/assets/images/xieyitongyi.png";
import uploadUrl from "@/util/uploadConfig";
@connect(state => ({
  ...state.seller,
  ...state.login
}))
class ApplyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btntext: "获取验证码",
      countDown: false,
      type: 3,
      animating: false,
      phoneVisible: false
    };
  }
  componentWillMount() {
    const params = qs.parse(window.location.search.split("?")[1]);
    if (params && params.type) {
      this.setState({
        type: params.type
      });
    }
  }

  callAction = () => {
    console.log("打电话");
    this.setState({
      phoneVisible: true
    });
  };
  cancelAction = () => {
    this.setState({
      phoneVisible: false
    });
  };
  confirmAction = () => {
    this.setState({
      phoneVisible: false
    });
  };

  inputOnChange = (type, e) => {
    this.setState({
      [type]: e.target.value
    });
  };

  saveAction = () => {
    const {
      type,
      btntext,
      nickname,
      store_name,
      identity_card_number,
      phone,
      code,
      identity_card_image,
      identity_card_rear_image,
      business_license_image,
      business_license_number,
      business_license_expires,
      open_account_licence_image
    } = this.state;

    var params = {
      type,
      btntext,
      nickname,
      store_name,
      identity_card_number,
      phone,
      code,
      identity_card_image,
      identity_card_rear_image,
      business_license_image,
      business_license_number,
      business_license_expires,
      open_account_licence_image
    };

    var url = "/seller.add";
    if (this.props.seller && this.props.seller.check_status == 2) {
      url = "/seller.edit";
      params.store_id = this.props.seller.id;
    }

    this.setState({
      animating: true
    });
    http({
      url,
      data: params,
      method: "post"
    })
      .then(res => {
        this.setState({
          animating: false
        });
        const { dispatch } = this.props;
        dispatch(seller.getSeller());
        history.go(-3);
      })
      .catch(res => {
        this.setState({
          animating: false
        });
      });
  };

  handleSendCode() {
    if (this.state.phone && this.state.phone.length == 11) {
      var params = {
        phone: this.state.phone
      };
      var url = "/platform.code";
      this.setState({
        animating: true
      });
      http({
        url,
        params
      })
        .then(res => {
          this.sendCodeCountDown();
          this.setState({
            animating: false
          });
        })
        .catch(res => {
          this.setState({
            animating: false
          });
        });
    } else {
      Toast.fail("手机号格式不正确", 1);
    }
  }
  sendCodeCountDown() {
    var _this = this;
    var coden = 60; // 定义60秒的倒计时
    this.setState({
      // _this这里的作用域不同了
      btntext: --coden + "s",
      countDown: true
    });
    var codeV = setInterval(function() {
      _this.setState({
        // _this这里的作用域不同了
        btntext: --coden + "s",
        countDown: true
      });
      if (coden == -1) {
        // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
        clearInterval(codeV);
        _this.setState({
          btntext: "获取验证码",
          countDown: false
        });
      }
    }, 1000); //  1000是1秒
  }

  uploadFile = (file, type) => {
    console.log("file", file.target.files[0]);
    var formData = new FormData();
    formData.append("file", file.target.files[0]);
    // //发起上传
    console.log(uploadUrl)
    axios({
      url: uploadUrl + "/upload",
      header: {
        "content-type": "multipart/form-data"
      },
      method: "post",
      data: formData
    }).then(resp => {
      console.log(resp);
      var url = resp.data.data[0].url;
      this.setState({
        [type]: url
      });
    });
  };

  chengnuo() {
    history.push("/applyopenshop/commitment");
  }
  xieyi() {
    history.push("/applyopenshop/agreement");
  }

  render() {
    /*nickname	是	string	店主姓名
store_name	是	string	店铺名称
identity_card_number	是	string	身份证编号
phone	是	number	电话号码 11位
code	是	string	验证码
identity_card_image	否	string	身份证正面照片0-255
identity_card_rear_image	否	string	身份证背面照0-255
business_license_image	否	string	身份证背面照片0-255
business_license_number	否	string	营业执照0-50
business_license_expires	否	date	营业执照过期时间 2019-01-02
open_account_licence_image
*/
    const {
      type,
      countDown,
      btntext,
      nickname,
      store_name,
      identity_card_number,
      phone,
      code,
      identity_card_image,
      identity_card_rear_image,
      business_license_image,
      business_license_number,
      business_license_expires,
      open_account_licence_image
    } = this.state;
    const componyInput = (
      <div>
        <div className="item">
          <div>统一社会信用代码</div>
          <div>
            <input
              type="text"
              value={business_license_number}
              placeholder="请输入"
              className="input"
              style={{ textAlign: "right" }}
              onChange={this.inputOnChange.bind(
                this,
                "business_license_number"
              )}
            />
          </div>
        </div>
        <div className="lineView" style={{ marginBottom: "0.2rem" }} />
        {/* <div className='item'>
              <div>营业期限</div>
              <div><input type="text" value={business_license_expires}
                placeholder="请输入"
                style={{ textAlign: "right" }}
                onChange={this.inputOnChange.bind(this, 'business_license_expires')} />
              </div>
            </div> */}
      </div>
    );

    return (
      <div className="applyInfo">
        <TopBar
          className="topBar"
          name="入驻信息填写"
          rightTitle="联系客服"
          onRightClick={this.callAction}
        />
        <div className="content">
          {/* 输入框 */}
          <div className="listInput">
            <div className="item">
              <div>店铺名称</div>
              <div>
                <input
                  type="text"
                  value={store_name}
                  placeholder="请输入你的店铺名称"
                  className="input"
                  style={{ textAlign: "right" }}
                  onChange={this.inputOnChange.bind(this, "store_name")}
                />
              </div>
            </div>
            <div className="lineView" />
            <div className="item">
              <div>姓名</div>
              <div>
                <input
                  type="text"
                  value={nickname}
                  placeholder="请输入店主姓名"
                  style={{ textAlign: "right" }}
                  onChange={this.inputOnChange.bind(this, "nickname")}
                />
              </div>
            </div>
            <div className="lineView" />
            <div className="item">
              <div>身份证号码</div>
              <div>
                <input
                  type="text"
                  value={identity_card_number}
                  placeholder="请输入店主的身份证号码"
                  className="input"
                  style={{ textAlign: "right" }}
                  onChange={this.inputOnChange.bind(
                    this,
                    "identity_card_number"
                  )}
                />
              </div>
            </div>
            <div className="lineView" />
            <div className="item">
              <div>手机号码</div>
              <div>
                <input
                  type="text"
                  value={phone}
                  placeholder="请输入店主的手机号码"
                  style={{ textAlign: "right" }}
                  onChange={this.inputOnChange.bind(this, "phone")}
                />
              </div>
            </div>
            <div className="lineView" />
            <div className="item">
              <div>验证码</div>
              <div className="rightView">
                <input
                  type="text"
                  value={code}
                  placeholder="请输入验证码"
                  style={{ textAlign: "right" }}
                  onChange={this.inputOnChange.bind(this, "code")}
                />
                <div
                  className={"code-btn " + (countDown ? "countDown" : "")}
                  onClick={this.handleSendCode.bind(this)}
                >
                  {btntext}
                </div>
              </div>
            </div>
            <div className="lineView" />
            <div className="mobileDesc">
              此手机号码将用于登录商家端后台，请准确填写
            </div>
          </div>
          {/* 统一社会信用代码 */}
          {type == 3 && componyInput}
          {/* 身份证号码 */}
          <div className="idUpload">
            <div className="title">
              {type == 3 ? "上传身份证" : "上传法人身份证"}
            </div>
            <div className="idUploadk">
              <div className="uploadView">
                <input
                  type="file"
                  className="imageUp"
                  accept="image/*"
                  onChange={file =>
                    this.uploadFile(file, "identity_card_image")
                  }
                />
                {identity_card_image ? (
                  <img className="image" src={identity_card_image} />
                ) : (
                  <div className="centerT">正面上传</div>
                )}
              </div>
              <div className="uploadView">
                <input
                  type="file"
                  className="imageUp"
                  accept="image/*"
                  onChange={file =>
                    this.uploadFile(file, "identity_card_rear_image")
                  }
                />
                {identity_card_rear_image ? (
                  <img className="image" src={identity_card_rear_image} />
                ) : (
                  <div className="centerT">反面上传</div>
                )}
              </div>
            </div>
          </div>
          {/* 企业营业执照 */}
          {type != 1 && (
            <div className="license_image_div">
              <div className="license_imageView">
                <div className="title">
                  {type == 2 ? "上传个体工商户营业执照" : "上传企业营业执照"}
                </div>
                <div className="uploadView">
                  <input
                    type="file"
                    className="imageUp"
                    accept="image/*"
                    onChange={file =>
                      this.uploadFile(file, "business_license_image")
                    }
                  />
                  {business_license_image ? (
                    <img className="image" src={business_license_image} />
                  ) : (
                    <div className="centerT">点击上传</div>
                  )}
                </div>
              </div>
              {type == 3 && (
                <div className="license_imageView">
                  <div className="title">上传企业开户许可证</div>
                  <div className="uploadView">
                    <input
                      type="file"
                      className="imageUp"
                      accept="image/*"
                      onChange={file =>
                        this.uploadFile(file, "open_account_licence_image")
                      }
                    />
                    {open_account_licence_image ? (
                      <img className="image" src={open_account_licence_image} />
                    ) : (
                      <div className="centerT">点击上传</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {/* 协议与提交按钮 */}
          <div className="agreeDiv">
            <div className="agreeView">
              <div className="agree">
                <img src={xieyitongyi} className="queding" />
                <div>我已阅读并同意</div>
              </div>
            </div>
            <div className="xieyi">
              <div onClick={this.chengnuo}>《商家诚信经营承诺书》</div>
              <div onClick={this.xieyi}>《康策良品平台合作协议》</div>
            </div>
            <div className="commitBtn" onClick={this.saveAction}>
              提交申请
            </div>
          </div>
          <Alert
            visible={this.state.phoneVisible}
            phone={this.props.service_phone}
            onCancel={this.cancelAction}
            onConfirm={this.confirmAction}
          />
          <ActivityIndicator
            toast
            text="Loading..."
            animating={this.state.animating}
          />
        </div>
      </div>
    );
  }
}
export default ApplyInfo;
