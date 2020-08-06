import React from "react";
import TopBar from "@/components/topBar";
import http from "@/util/http";
import "./index.less";

class Cashout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      balance: 0, //钱包余额
      money: ""
    };
  }

  componentDidMount() {
    this.getAccount();
    this.getbalance();
  }

  //获取账户信息
  getAccount = () => {
    http({
      url: "/account.get"
    }).then(res => {
      this.setState({ account: res.data.data });
    });
  };

  //获取可提现金额
  getbalance = () => {
    http({
      url: "/self.get"
    }).then(res => {
      if (res.data.data) {
        const { balance } = res.data.data;
        this.setState({
          balance: parseFloat(balance)
        });
      }
    });
  };

  //确认提现
  doCashout = () => {
    const { account, money } = this.state;
    const data = { id: account.id, money };
    http({
      url: "/payee.add",
      data,
      method: "post"
    }).then(res => {
      this.props.history.go(-1);
    });
  };

  render() {
    const { account, balance, money } = this.state;
    return (
      <div className="--cash-out">
        <TopBar
          name="提现"
          rightChild={
            <div
              className="record"
              onClick={() => {
                this.props.history.push("/cashoutrecord");
              }}
            >
              提现记录
            </div>
          }
        />
        <div className="content">
          <div className="account">
            <div>
              <div style={{ marginBottom: ".1rem" }}>支付宝账号</div>
              <div style={{ fontWeight: "bold" }}>
                {account && account.account ? account.account : "请编辑账号"}
              </div>
            </div>
            <div
              className="edit"
              onClick={() => {
                this.props.history.push("/accountedit");
              }}
            >
              编辑
            </div>
          </div>

          <div className="money-content">
            <div className="title">提取金额</div>
            <div className="inp-div">
              <span style={{ fontSize: ".4rem" }}>￥</span>
              <input
                type="number"
                className="inp"
                value={money}
                onChange={e => {
                  let money = e.target.value;
                  if (money < 0) {
                    money = "";
                  } else if (money > balance) {
                    money = balance;
                  }
                  this.setState({ money });
                }}
              />
            </div>
            <div className="tip">最大提取{balance}元</div>
          </div>

          <div
            className="button"
            style={{
              background:
                money && account && account.account ? "#3776EC" : "#a1adb9"
            }}
            onClick={() => {
              money && account && account.account && this.doCashout();
            }}
          >
            确认提现
          </div>
        </div>
      </div>
    );
  }
}
export default Cashout;
