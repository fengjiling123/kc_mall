import React from "react";
import html2canvas from "html2canvas";
import QRCode from "qrcode.react";
import haibaotanchuang from "../../../assets/images/haibaotanchuang.png";
import icon_guanbi from "../../../assets/images/icon-guanbi.png";
import http from "@/util/http";
import { ActivityIndicator } from "antd-mobile";
import "./index.less";
import { getShareUrl } from "../../../util/share";

let rem = document.documentElement.clientWidth / 3.75;

class ShareGoodsImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      loading: true
    };
  }

  componentDidMount() {
    // this.createImg();
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
    const { goods, showShareImgModal, userInfo } = this.props;
    const { url, loading } = this.state;

    return (
      <div className="--sahre-goods-img">
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
          <div id="share-goods-img">
            <div>
              <div className="goods-cover">
                <img
                  src={goods.cover.replace(
                    "https://e6kang.oss-cn-hangzhou.aliyuncs.com",
                    "/share_img"
                  )}
                  onLoad={() => {
                    this.createImg();
                  }}
                  onError={() => {
                    this.createImg();
                  }}
                />
              </div>
              <div className="goods-name">{goods.name}</div>
              <div className="goods-price">
                <span style={{ fontSize: ".14rem" }}>￥</span>
                <span>
                  {(goods.activity === 4 || goods.activity === 2) &&
                  goods.activity_info
                    ? parseFloat(goods.activity_info.price)
                    : parseFloat(goods.price)}
                </span>
                <span className="old-price">
                  <span className="line"></span>
                  {parseFloat(goods.market_price)}
                </span>
              </div>
              <div className="qrcode">
                <QRCode value={`${getShareUrl(false)}`} size={0.53 * rem} />
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
              <div className="from">{`来自${userInfo.nickname.slice(0, 12)}${
                userInfo.nickname.length > 12 ? "..." : ""
              }的精选推荐`}</div>
            </div>
            <img src={haibaotanchuang} className="bg-img" />
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

export default ShareGoodsImg;
