import React from "react";
import TopBar from "@/components/topBar";
import { RoundImageView } from "@/components/imageView";
import "./index.less";
import * as classnames from "classnames";
import icVipLeft from "@/assets/images/ic_vip_left.png";
import { Toast } from "antd-mobile";
import http from "@/util/http";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    http({
      url: "/self.fans"
    }).then(res => {
      this.setState({
        list: res.data.data
      });
    });
  }

  render() {
    let { list } = this.state;
    return (
      <div className="--myVipInvite">
        <TopBar name={"我的邀请"} />
        {list.length > 0 && (
          <div className="count">我邀请的用户 {list.length}人</div>
        )}
        {list.length > 0 && (
          <div className="list">
            {list.map(item => (
              <div className="item">
                <RoundImageView
                  src={item.face}
                  style={{
                    width: "0.4rem",
                    height: "0.4rem",
                    marginLeft: "0.1rem"
                  }}
                />
                <div className="name">{item.nickname}</div>
                <div className="money">
                  贡献佣金 {parseFloat(item.inviter_brokerage)}
                </div>
              </div>
            ))}
          </div>
        )}

        {list.length == 0 && (
          <div className="tips">暂无邀请用户，赶紧邀请新人赚佣金</div>
        )}
      </div>
    );
  }
}
export default Index;
