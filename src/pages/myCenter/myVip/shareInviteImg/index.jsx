import React from "react";
import html2canvas from "html2canvas";
import QRCode from "qrcode.react";
import icon_guanbi from "@/assets/images/icon-guanbi.png";
import icGoodsLine from "@/assets/images/ic_goods_line.png";
import "./index.less";
import { ActivityIndicator, Toast } from "antd-mobile";
import http from "@/util/http";
import * as actions from "../../../../store/actions/login";
import { connect } from "react-redux";
import { GET_USER_INFO } from "../../../../store/actions/login";
// import bgVipShareContent from "@/assets/images/bg_vip_share_content.png";
import touxiang from "@/assets/images/touxiang.png";
import { getShareUrl, share } from "../../../../util/share";
let bgVipShareContent = "/share_img/kclp%2Fimages%2Fbg_vip_share_content.png";

let rem = document.documentElement.clientWidth / 3.75;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      loading: true
    };
  }

  componentDidMount() {
    http({
      url: "/self.get"
    }).then(res => {
      let face = res.data.data ? res.data.data.face : touxiang;
      let title = "邀你免费开通钻石会员，立享百种专属特权！"; // 分享标题
      let desc = "每月躺赚3000元，自买更省，分享赚钱"; // 分享标题
      share(title, desc, getShareUrl(true), face);
    });
  }

  createImg = () => {
    html2canvas(document.getElementById("share-goods-img"), {
      scale: window.devicePixelRatio * 2,
      width: 2.51 * rem,
      height: 4.44 * rem
    }).then(canvas => {
      this.setState({ url: canvas.toDataURL(), loading: false });
    });
  };

  render() {
    const { showShareImgModal } = this.props;
    const { url, loading } = this.state;
    return (
      <div className="--share-invite-img">
        <div
          className="mask"
          onClick={() => {
            showShareImgModal(false);
          }}
        />
        <div className="content">
          <div className="title">长按保存图片</div>
          <img
            src={icon_guanbi}
            className="close-icon"
            onClick={() => {
              showShareImgModal(false);
            }}
          />

          <div
            id="share-goods-img"
            style={{
              background: "#fff",
              backgroundSize: "cover"
            }}
          >
            <div className="goods-cover">
              <img
                src={bgVipShareContent}
                style={{ width: "2rem" }}
                onLoad={() => {
                  this.createImg();
                }}
                onError={() => {
                  this.createImg();
                }}
              />
            </div>

            <div className="goods-line">
              <img src={icGoodsLine} style={{ width: "2rem" }} />
            </div>

            <div className="qrcode">
              <QRCode value={getShareUrl(true)} size={0.53 * rem} />
              <div className="text">
                <div
                  style={{
                    fontSize: ".16rem",
                    lineHeight: ".18rem",
                    marginBottom: ".05rem"
                  }}
                >
                  长按识别二维码
                </div>
                <div style={{ fontSize: ".11rem", lineHeight: ".16rem" }}>
                  好货要与好朋友一起分享
                </div>
              </div>
            </div>

            <div
              className="from"
              style={{ fontSize: ".12rem", lineHeight: ".16rem" }}
            >
              {`来自${this.props.name.slice(0, 12)}${
                this.props.name.length > 12 ? "..." : ""
              }的精选推荐`}
            </div>
          </div>
          {loading && (
            <div className="loading">
              <ActivityIndicator />
            </div>
          )}
          {url && <img src={url} className="img" />}
        </div>
      </div>
    );
  }
}

export default Index;
