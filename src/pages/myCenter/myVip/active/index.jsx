import React from "react";
import TopBar from "@/components/topBar";
import { RoundImageView } from "@/components/imageView";
import "./index.less";
import * as classnames from "classnames";
import { Toast } from "antd-mobile";
import http from "@/util/http";
import history from "@/util/history";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  inputCode = code => {
    this.setState({
      code
    });
  };

  onActive = () => {
    http({
      url: "/self.upgrade",
      method: "post",
      data: { type: 2, code: this.state.code }
    }).then(res => {
      Toast.success("升级成功!", 1.5);
      setTimeout(() => {
        history.push("/myvip");
      }, 1500);
    });
  };

  render() {
    let { code } = this.state;
    return (
      <div className="--myVipActive">
        <TopBar name={"激活会员"} />
        <input
          className="codeInput"
          placeholder={"输入激活码"}
          onChange={e => {
            this.inputCode(e.target.value);
          }}
        />
        <div
          className={classnames({
            activeButton: true,
            active: code.length == 6
          })}
          onClick={() => {
            this.onActive();
          }}
        >
          激活
        </div>
        <div className="title">激活码的获取方式：</div>
        <div className="content">
          1.关注微信公众号"康策良品"，会不定期的发放一些激活码。
        </div>
      </div>
    );
  }
}
export default Index;
