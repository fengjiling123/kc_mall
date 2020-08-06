import React from "react";
import history from "@/util/history";
import uploadUrl from "@/util/uploadConfig";
import http from "@/util/http";
import {
  Picker,
  DatePicker,
  Modal,
  InputItem,
  ActivityIndicator
} from "antd-mobile";
import TopBar from "@/components/topBar";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/login";
import "./index.less";
import axios from "axios";

import storeRight from "@/assets/images/ic_order_store_right.png";
import touxiang from "@/assets/images/touxiang.png";

const isIPhone = new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(
  window.navigator.userAgent
);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault()
  };
}

@connect(state => ({
  ...state.login
}))
class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    // const nowTimeStamp = Date.now();
    // const now = new Date(nowTimeStamp);
    this.state = {
      gender: 0,
      animating: false,
      sexData: [
        { label: "男", value: 1 },
        { label: "女", value: 2 },
        { label: "保密", value: 0 }
      ],
      isLogin: true
    };
  }

  componentWillMount() {
    this.setState({
      animating: true,
      name: ""
    });
    http({
      url: "/self.get"
    })
      .then(res => {
        if (res.data.data) {
          this.setState({
            animating: false,
            ...res.data.data,
            selectDate: res.data.data.birthday
          });
        } else {
          this.setState({ isLogin: false });
        }
      })
      .catch(res => {
        this.setState({
          animating: false
        });
      });
  }

  handleDateOk = date => {
    console.log(date);
    this.setState({
      selectDate: formatDate(date)
    });
    this.sendEditRequest({ birthday: formatDate(date) });
  };
  handleSexOk = value => {
    console.log(value[0]);
    this.setState({
      gender: value
    });
    this.sendEditRequest({ gender: value[0] });
  };
  editNameAction = () => {
    this.setState({
      modalVisible: true
    });
  };
  onCloseNameModal = () => {
    this.setState({
      modalVisible: false
    });
  };
  nameChange = value => {
    console.log(value);
    this.setState({
      name: value
    });
  };
  nameCompelete = () => {
    if (!this.state.name) {
      this.setState({
        modalVisible: false
      });
      return;
    }
    console.log("nameCompelete", this.state.name);
    this.setState({
      modalVisible: false,
      nickname: this.state.name
    });
    this.sendEditRequest({ nickname: this.state.name });
  };

  uploadFile = file => {
    console.log("file", file.target.files[0]);
    this.setState({
      animating: true
    });
    var formData = new FormData();
    formData.append("file", file.target.files[0]);
    // //发起上传
    axios({
      url: uploadUrl + "/upload",
      header: {
        "content-type": "multipart/form-data"
      },
      method: "post",
      data: formData
    })
      .then(resp => {
        console.log(resp);
        console.log("上传成功");
        var url = resp.data.data[0].url;
        this.setState({
          face: url,
          animating: false
        });
        this.sendEditRequest({ face: url });
      })
      .catch(res => {
        this.setState({
          animating: false
        });
      });
  };

  sendEditRequest(params) {
    this.setState({
      animating: true
    });
    http({
      url: "/self.edit",
      data: params,
      method: "post"
    })
      .then(res => {
        this.sendUpdateUserInfo();
        this.setState({
          animating: false
        });
      })
      .catch(res => {
        this.setState(
          {
            animating: false
          },
          () => {
            setTimeout(() => {
              this.componentWillMount();
            }, 1000);
          }
        );
      });
  }
  sendUpdateUserInfo() {
    const { dispatch } = this.props;
    dispatch(actions.getUserInfo());
  }
  render() {
    // birthday

    const {
      sexData,
      face,
      gender,
      selectDate,
      nickname,
      modalVisible,
      name,
      isLogin
    } = this.state;
    const genderDic = { 0: "保密", 1: "男", 2: "女" };
    if (!isLogin) {
      this.props.history.replace("/login");
    }
    return (
      <div className="--userInfo">
        <TopBar className="topBar" />
        <div className="content">
          <div className="space-between">
            <div className="leftView" onClick={this.editNameAction}>
              <div className="name">{nickname}</div>
              <div className="edit">编辑姓名</div>
            </div>
            <div className="rightView">
              <input
                type="file"
                className="imageUp"
                accept="image/*"
                onChange={file => this.uploadFile(file)}
              />
              <img className="headImage" src={face ? face : touxiang} />
              <img src={storeRight} className="goImg" />
            </div>
          </div>

          <div className="lineView" />

          <div className="sexView" />

          <Picker cols={1} data={sexData} onChange={this.handleSexOk}>
            <div className="space-between">
              <div className="leftView">性别</div>
              <div className="rightView">
                <div>{genderDic[gender]}</div>
                <img className="goImg" src={storeRight} />
              </div>
            </div>
          </Picker>

          <DatePicker
            mode="date"
            minDate={new Date(1930, 1, 1)}
            extra="Optional"
            onChange={this.handleDateOk}
          >
            <div className="space-between">
              <div className="leftView">生日</div>
              <div className="rightView">
                <div>{selectDate ? selectDate : ""}</div>
                <img className="goImg" src={storeRight} />
              </div>
            </div>
          </DatePicker>

          <Modal
            popup
            visible={modalVisible}
            onClose={this.onCloseNameModal}
            animationType="slide-up"
          >
            <div className="nameInputView">
              <InputItem
                className="inputItem"
                placeholder="请输入姓名"
                clear
                value={name}
                onChange={this.nameChange}
                moneyKeyboardAlign="left"
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              />
              <div className="btn" onClick={this.nameCompelete}>
                完成
              </div>
            </div>
          </Modal>
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
function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => (n < 10 ? `0${n}` : n);
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
  return dateStr;
}
export default UserInfo;
