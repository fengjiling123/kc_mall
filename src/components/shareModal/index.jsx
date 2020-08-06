import React from "react";
import { Modal, Toast } from "antd-mobile";
import weixin_icon from "../../assets/images/icon-lijiyaoqing-fenxiangweixin-kedianji.png";
import pengyouquan_icon from "../../assets/images/icon-lijiyaoqing-fenxiangpengyouquan-kedianji.png";
import fuzhi_icon from "../../assets/images/icon-lijiyaoqing-fuzhilianjie-kedianji.png";
import xiazai_icon from "../../assets/images/icon-lijiyaoqing-baocuntupian-kedianji.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./index.less";
import { getShareUrl } from "../../util/share";

class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
  }

  componentDidMount() {
    this.setState({
      url: getShareUrl(this.props.shareHomePage)
    });
  }

  render() {
    const { onClose, showShareImgModal } = this.props;
    const { url } = this.state;
    return (
      <Modal
        popup
        visible
        animationType="slide-up"
        className="--share-modal"
        onClose={() => {
          onClose();
        }}
      >
        <div className="modal-content">
          <div className="title">邀请好友成为专属粉丝</div>
          <div className="share-type">
            <div
              onClick={() => {
                Toast.info("请点击右上角分享功能", 1);
              }}
            >
              <img src={weixin_icon} />
              <div>分享微信</div>
            </div>
            <div
              onClick={() => {
                Toast.info("请点击右上角分享功能", 1);
              }}
            >
              <img src={pengyouquan_icon} />
              <div>分享朋友圈</div>
            </div>

            <CopyToClipboard
              text={url}
              onCopy={() => {
                Toast.info("复制成功", 1);
              }}
            >
              <div>
                <img src={fuzhi_icon} />
                <div className="copy">复制链接</div>
              </div>
            </CopyToClipboard>

            <div
              onClick={() => {
                onClose();
                showShareImgModal(true);
              }}
            >
              <img src={xiazai_icon} />
              <div>保存图片</div>
            </div>
          </div>
          <div onClick={onClose} className="cancel">
            取消
          </div>
        </div>
      </Modal>
    );
  }
}

export default ShareModal;
