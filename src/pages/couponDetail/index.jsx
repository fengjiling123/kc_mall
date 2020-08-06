import React from "react";
import bg_img from "../../assets/images/bj-danduyouhuiquan@3x.png";
import coupon_bg from "../../assets/images/bj-youhuiquan@3x.png";
import home_icon from "../../assets/images/icon-shouye@3x.png";
import danduyouhuiquan from "../../assets/images/danduyouhuiquan@3x.png";
import TopBar from "@/components/topBar";
import Scroll from "react-bscroll";
import CommendGoods from "@/components/commendGoods";
import http from "../../util/http";
import qs from "qs";
import moment from "moment";
import { Toast } from "antd-mobile";
import "./index.less";

const COUPON_ATTRIBUTE = {
  1: "康策良品平台券",
  2: "店铺优惠券",
  3: "新人专享券",
  4: "邀请新人奖励券"
};

class CouponDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBottom: false,
      couponDetail: {}
    };
  }

  componentDidMount() {
    this.getCouponDetail();
  }

  //获取优惠券详情
  getCouponDetail = () => {
    const id = qs.parse(window.location.search.split("?")[1]).id;
    http({
      url: "/coupon.share",
      params: { coupon_id: id }
    }).then(res => {
      this.setState({ couponDetail: res.data.data });
    });
  };

  //领取优惠券
  addCoupon() {
    const { couponDetail } = this.state;
    http({
      url: "/coupon.add",
      params: { id: couponDetail.id }
    }).then(res => {
      Toast.info("优惠券领取成功", 1);
    });
  }

  //检查是否滚动到底部
  onScrollHandle = () => {
    const scrollTop = this.scrollRef.scrollTop;
    const clientHeight = this.scrollRef.clientHeight;
    const scrollHeight = this.scrollRef.scrollHeight;
    const isBottom = scrollHeight - (scrollTop + clientHeight) < 180;
    if (isBottom && scrollTop) {
      this.setState({ isBottom: true });
    } else {
      this.setState({ isBottom: false });
    }
  };

  render() {
    const { history } = this.props;
    const { isBottom, couponDetail } = this.state;
    return (
      <div className="--coupon-detail">
        <TopBar
          name="优惠券详情"
          rightTitle={
            <div>
              <img src={home_icon} style={{ width: ".2rem" }} />
            </div>
          }
          onRightClick={() => {
            history.push("/");
          }}
        />
        {/* <Scroll
          click={true}
          scrollbar={false}
          ref={e => (this.coupondetail = e)}
          doScroll={({ y }) => {
            let maxScrollY = this.coupondetail
              ? this.coupondetail.getScrollObj().maxScrollY
              : 0;
            if (Math.abs(y - maxScrollY) < 50) {
              this.setState({ isBottom: true });
            } else {
              this.setState({ isBottom: false });
            }
          }}
        > */}
        <div
          className="scroll-view"
          onScrollCapture={() => this.onScrollHandle()}
          ref={c => {
            this.scrollRef = c;
          }}
        >
          <div className="content">
            <img src={bg_img} className="bg-img" />
            <img src={danduyouhuiquan} className="danduyouhuiquan" />
            <div className="coupon-item">
              <img src={coupon_bg} className="coupon-bg" />
              <div style={{ position: "relative" }}>
                <div className="coupon-name">
                  {couponDetail.attribute === 2
                    ? couponDetail.store_name
                    : COUPON_ATTRIBUTE[couponDetail.attribute]}
                </div>
                <div className="money">
                  <span style={{ fontSize: ".2rem" }}>￥</span>
                  <span>
                    {Number(couponDetail.money)
                      ? Number(couponDetail.money)
                      : ""}
                  </span>
                </div>
                <div style={{ lineHeight: ".2rem" }}>
                  {Number(couponDetail.reach_money)
                    ? `满${Number(couponDetail.reach_money)}`
                    : "无门槛"}
                  使用
                </div>
                <div className="button">
                  <span
                    onClick={() => {
                      this.addCoupon();
                    }}
                  >
                    立即领取
                  </span>
                </div>
                <div style={{ color: "#657281", lineHeight: ".2rem" }}>
                  {couponDetail.period === 1 ? (
                    <div style={{ fontSize: ".12rem", marginTop: ".02rem" }}>
                      {moment
                        .unix(couponDetail.start_time)
                        .format("YYYY.MM.DD")}
                      &nbsp;-&nbsp;
                      {moment.unix(couponDetail.end_time).format("YYYY.MM.DD")}
                    </div>
                  ) : (
                    <div style={{ fontSize: ".12rem", marginTop: ".02rem" }}>
                      {moment().format("YYYY.MM.DD")}
                      &nbsp;-&nbsp;
                      {moment()
                        .add(couponDetail.expiry_day, "days")
                        .format("YYYY.MM.DD")}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <CommendGoods
              isBottom={isBottom}
              style={{
                position: "relative",
                margin: ".3rem .1rem 0",
                padding: "0 .05rem",
                borderRadius: ".05rem"
              }}
            />
          </div>
        </div>
        {/* </Scroll> */}
      </div>
    );
  }
}

export default CouponDetail;
