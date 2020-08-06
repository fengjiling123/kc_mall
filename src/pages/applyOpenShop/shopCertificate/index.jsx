import React from "react";
import history from "@/util/history";
import TopBar from "@/components/topBar";
import { connect } from "react-redux";
import * as seller from "@/store/actions/seller";
// import certificateBg from "@/assets/images/certificateBg.png";
// import kcZhang from "@/assets/images/kcZhang.png";
import html2canvas from "html2canvas";
import { renderBigImg, removeBigImg } from "@/util/methods";
import qs from "qs";
import "./index.less";

let kcZhang = "/share_img/kclp%2Fimages%2FkcZhang.png";
let certificateBg = "/share_img/kclp%2Fimages%2FcertificateBg.png";
@connect(state => ({
  ...state.seller
}))
class ShopCertificate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopUrl: ""
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(seller.getSeller());
  }
  componentDidMount() {
    const { seller } = this.props;
    var name = seller ? seller.seller_name : "";
    var idUrl = seller ? seller.identity_card_number : "";
    var certificateText =
      "兹证明" +
      name +
      "（身份证号：" +
      idUrl +
      "）在康策良品电商平台上经营个人店铺属实，店铺信息如下：";

    var shopUrl = "店铺地址：" + this.getShopUrl();
    document.getElementById("certificateText").innerHTML = certificateText;
    document.getElementById("shopUrl").innerHTML = shopUrl;
  }

  componentWillUnmount() {
    removeBigImg();
  }

  handleSaveAction = () => {
    html2canvas(document.getElementById("capture"), {
      scale: window.devicePixelRatio * 2
    }).then(canvas => {
      renderBigImg(canvas.toDataURL());
    });
  };

  getShopUrl() {
    const { seller } = this.props;
    var origin = window.location.origin;
    var url = origin + "/s/";
    if (seller && seller.id) {
      return url + seller.id;
    } else {
      return url;
    }
  }
  getDate() {
    var date = new Date();
    console.log("date", date);
    var month = date.getMonth() + 1;
    return date.getFullYear() + "年" + month + "月" + date.getDate() + "日";
  }
  render() {
    const { seller } = this.props;
    console.log(this.props);
    return (
      <div className="ShopCertificate">
        <TopBar className="topBar" name="店铺经营证明" />
        <div className="content">
          <div
            className="certificate"
            id="capture"
            style={{
              backgroundImage: `url(${certificateBg})`
            }}
          >
            <div className="title">康策良品平台店铺经营证明</div>
            {/* <div className='ptext' id='certificateText'>兹证明{seller?seller.seller_name:''}（身份证号：{seller?seller.identity_card_number:''}）在康策良品电商平台上经营个人店铺属实，店铺信息如下：</div>
            <div className='ptext' id='shopUrl'>店铺地址：{this.getShopUrl()}</div> */}
            <div className="ptext" id="certificateText">
              兹证明（身份证号：）在康策良品电商平台上经营个人店铺属实，店铺信息如下：
            </div>
            <div className="ptext" id="shopUrl">
              店铺地址：
            </div>
            <div className="ptext">特此证明！</div>

            <div className="zhang">
              <div className="zhangBg">
                <img className="zhangImg" src={kcZhang} />
                <div className="name">杭州康策网络科技有限公司</div>
                <div className="date">{this.getDate()}</div>
              </div>
            </div>
          </div>
          <div className="downloadBtn" onClick={this.handleSaveAction}>
            下载文件
          </div>
          {/* <a id='downloada' hidden={true}> 下载</a> */}
        </div>
      </div>
    );
  }
}
export default ShopCertificate;
