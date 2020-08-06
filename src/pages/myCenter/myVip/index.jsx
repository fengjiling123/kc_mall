import React from "react";
import { connect } from "react-redux";
import history from "@/util/history";
import http from "@/util/http";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";
import { RoundImageView } from "@/components/imageView";
import qs from "qs";
import "./index.less";
import * as actions from "@/store/actions/login";
import ShareModal from "@/components/shareModal";
import ShareInviteImg from "./shareInviteImg";
import touxiang from "@/assets/images/touxiang.png";
import { getShareUrl, share } from "../../../util/share";

@connect(state => ({
  ...state.login,
  ...state.seller
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      last_money: 0,
      this_money: 0,
      fans_count: 0,
      shareModal: false,
      showShareImg: false
    };
  }

  componentDidMount() {
    http({
      url: "/self.money.membership"
    }).then(res => {
      let title = "邀你免费开通钻石会员，立享百种专属特权！";
      let desc = "每月躺赚3000元，自买更省，分享赚钱";
      let face = res.data.data.face ? res.data.data.face : touxiang;
      share(title, desc, getShareUrl(true), face);
      this.setState({
        name: res.data.data.nickname,
        last_money: res.data.data.last_money ? res.data.data.last_money : 0,
        this_money: res.data.data.this_money ? res.data.data.this_money : 0,
        fans_count: res.data.data.fans_count ? res.data.data.fans_count : 0
      });
    });
  }

  invite = () => {
    this.setState({
      shareModal: true
    });
  };

  showShareImgModal = showShareImg => {
    this.setState({ showShareImg });
  };

  render() {
    let {
      last_money,
      this_money,
      fans_count,
      shareModal,
      showShareImg
    } = this.state;
    return (
      <div className="myVip">
        <TopBar
          name="钻石会员"
          onBack={() => {
            history.goBack();
          }}
        />
        <div className="scroll-view">
          <ImageView
            src={
              "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fbg_vip_header.png"
            }
          />

          <div
            style={{
              marginTop: "-2.05rem",
              marginLeft: "0.1rem",
              marginRight: "0.1rem",
              position: "relative"
            }}
          >
            <ImageView
              style={{
                width: "100%"
              }}
              src={
                "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fbg_vip_content_1.png"
              }
            />
            <div className="valueGroup">
              <div
                className="value1"
                onClick={() => {
                  history.push("/wallet");
                }}
              >
                {last_money}/{this_money}
              </div>
              <div
                className="value2"
                onClick={() => {
                  history.push("/myvip/invite");
                }}
              >
                {fans_count}
              </div>
            </div>
          </div>

          <ImageView
            style={{
              marginTop: "0.1rem",
              marginLeft: "0.1rem",
              marginRight: "0.1rem"
            }}
            src={
              "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fbg_vip_content_2.png"
            }
          />

          <ImageView
            style={{
              margin: "0.1rem"
            }}
            src={
              "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fbg_vip_content_3.png"
            }
          />

          <div style={{ height: "0.8rem" }} />
        </div>

        <div className="invite" onClick={this.invite}>
          立即邀请
        </div>
        {shareModal && (
          <ShareModal
            showShareImgModal={this.showShareImgModal}
            onClose={() => {
              this.setState({ shareModal: false });
            }}
          />
        )}

        {/* 商品分享图片 */}
        {showShareImg && (
          <ShareInviteImg
            name={this.state.name}
            showShareImgModal={this.showShareImgModal}
          />
        )}
      </div>
    );
  }
}
export default Index;
