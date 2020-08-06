import React from "react";
import qs from "qs";
import http from "@/util/http";
import isWeixin from "@/util/tools";
import { getShareUrl, share } from "@/util/share";
import TopBar from "@/components/topBar";
import ERWEIMA_IMG from "@/assets/images/icon-erweima.png";
import CLOSE_MODAL_IMG from "@/assets/images/icon-guanbi.png";
import ImageViewerWx from "@/components/imageViewerWx";
import QRCode from "qrcode.react";
import _ from "lodash";
import "./index.less";

let rem = document.documentElement.clientWidth / 3.75;

class StoreDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeDetail: null,
      qualificationImg: [],
      showModal: false
    };
  }

  componentDidMount() {
    const { store_id } = qs.parse(window.location.search.split("?")[1]);
    this.setState({ store_id });
    http({
      url: "/store.get",
      params: { id: store_id }
    }).then(res => {
      let storeDetail = res.data.data;
      let qualificationImg = [];
      if (storeDetail.qualification) {
        Object.values(storeDetail.qualification).map(value => {
          if (value) {
            qualificationImg.push(value);
          }
        });
      }
      this.setState({
        storeDetail,
        qualificationImg
      });
      if (isWeixin) {
        let logo =
          "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fshare_logo.png?";
        logo = storeDetail ? storeDetail.logo : logo;
        let title = storeDetail ? storeDetail.name : ""; // 分享标题
        let desc = `我在康策良品发现了一家好店@${title}，推荐给你哟！`; // 分享标题
        share(title, desc, getShareUrl(false), logo);
      }
    });
  }

  showModal(showModal) {
    this.setState({ showModal });
  }

  render() {
    const { storeDetail, qualificationImg, showModal } = this.state;

    return (
      <div className="--store-detail-page">
        <TopBar name="店铺详情" />
        {storeDetail ? (
          <div style={{ padding: ".1rem" }} className="store-conetnt">
            {/* 店铺名称/二维码 */}
            <div className="store-name">
              <img src={storeDetail.logo} className="logo" />
              <div>
                <div className="name">{storeDetail.name}</div>
                {storeDetail.is_self ? (
                  <div className="is-self">自营</div>
                ) : null}
              </div>
              <img
                src={ERWEIMA_IMG}
                className="erweima-img"
                onClick={() => {
                  this.setState({ showModal: true });
                }}
              />
            </div>

            {/* 店铺简介 */}
            <div className="store-detail">
              <div>
                <div className="label">店铺ID</div>
                <div>{storeDetail.id}</div>
              </div>
              <div>
                <div className="label">店铺简介</div>
                <div>{storeDetail.description}</div>
              </div>
            </div>

            {/* 企业资质 */}
            {/* <div className="qualifications">
              <div className="title">企业资质</div>
              <div className="content">
                {qualificationImg.map((item, selectIndex) => (
                  <img
                    src={item}
                    key={item}
                    className="qualification-item"
                    onClick={() => {
                      this.imageView.openViewer(selectIndex);
                    }}
                  />
                ))}
              </div>
            </div> */}
          </div>
        ) : null}

        {/* 查看资质图片 */}
        <ImageViewerWx
          ref={imageView => (this.imageView = imageView)}
          urls={qualificationImg}
        />

        {/* 店铺二维码弹窗 */}
        {showModal && storeDetail ? (
          <div className="erweima-modal">
            <div
              className="mask"
              onClick={() => {
                this.setState({ showModal: false });
              }}
            />
            <div className="content">
              <img
                src={CLOSE_MODAL_IMG}
                className="close-icon"
                onClick={() => {
                  this.setState({ showModal: false });
                }}
              />
              <div className="modal-store-name">{storeDetail.name}</div>
              <div className="share">邀请好友扫一扫分享店铺给TA</div>
              <QRCode
                value={`${window.location.protocol}//${window.location.host}/store?store_id=${storeDetail.id}&from=share`}
                size={1.84 * rem}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default StoreDetail;
