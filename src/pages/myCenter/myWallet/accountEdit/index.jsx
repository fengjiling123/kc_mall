import React from "react";
import TopBar from "@/components/topBar";
import "./index.less";
import http from "@/util/http";

class AccountEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      real_name: "",
      id: ""
    };
  }

  componentDidMount() {
    this.getAccount();
  }

  getAccount = () => {
    http({
      url: "/account.get"
    }).then(res => {
      if (res.data.data) {
        this.setState({
          account: res.data.data.account,
          real_name: res.data.data.real_name,
          id: res.data.data.id
        });
      }
    });
  };

  editAccount() {
    const { id, account, real_name } = this.state;
    const url = id ? "/account.edit" : "/account.add";
    let data = { account, real_name };
    if (id) data.id = id;
    http({
      url,
      data,
      method: "post"
    }).then(res => {
      this.props.history.go(-1);
    });
  }

  render() {
    const { account, real_name } = this.state;
    return (
      <div className="--account-edit">
        <TopBar name="提现账号" />
        <div className="scroll-view">
          <div className="text">支付宝账号</div>
          <div className="inp">
            <input
              type="text"
              placeholder="请输入"
              value={account}
              onChange={e => {
                this.setState({ account: e.target.value });
              }}
            />
          </div>
          <div className="text">支付宝对应用户真实名称</div>
          <div className="inp">
            <input
              type="text"
              placeholder="请输入"
              value={real_name}
              onChange={e => {
                this.setState({ real_name: e.target.value });
              }}
            />
          </div>
          <div className="tip">
            注意：请保持账号信息的准确性，否则造成打款失败
          </div>
          <div
            className="button"
            style={{
              background: real_name && account ? "#3776EC" : "#a1adb9"
            }}
            onClick={() => {
              real_name && account && this.editAccount();
            }}
          >
            保存
          </div>
        </div>
      </div>
    );
  }
}

export default AccountEdit;
