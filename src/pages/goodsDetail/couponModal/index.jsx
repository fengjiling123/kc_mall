import React from "react";
import { Modal, Toast } from "antd-mobile";
import moment from "moment";
import http from "@/util/http";
import quanImg1 from "@/assets/images/quan@3x.png";
import quanImg2 from "@/assets/images/youhuiquan.png";
import "./index.less";

const HEIGHT = ["2.34rem", "3.44rem", "4.58rem"];

class CouponModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccessTag: false
    };
  }

  addCoupon(id) {
    http({
      url: "/coupon.add",
      params: { id }
    }).then(res => {
      this.setState({ showSuccessTag: true }, () => {
        setTimeout(() => {
          this.setState({ showSuccessTag: false });
        }, 1000);
      });
      this.props.getCouponList();
    });
  }

  render() {
    const { onClose, couponList } = this.props;
    const { showSuccessTag } = this.state;
    return (
      <Modal
        popup
        visible
        onClose={onClose}
        animationType="slide-up"
        className="--coupon-modal"
      >
        <div
          className="modal-content"
          style={{
            height:
              couponList.length <= 3 ? HEIGHT[couponList.length - 1] : "5.5rem"
          }}
        >
          <div className="title">领取优惠券</div>
          <div className="coupons">
            {couponList.map(item => (
              <div
                className="coupon-item"
                key={item.id}
                style={{
                  backgroundImage:
                    item.is_has > 0 ? `url(${quanImg2})` : `url(${quanImg1})`
                }}
              >
                <div>
                  <div>
                    <span style={{ fontSize: ".16rem" }}>￥</span>
                    <span style={{ fontSize: ".24rem", marginRight: ".06rem" }}>
                      {Number(item.money)}
                    </span>
                    <span>优惠券</span>
                  </div>
                  <div>
                    {Number(item.reach_money)
                      ? `满${Number(item.reach_money)}`
                      : "无门槛"}
                    使用
                  </div>

                  {item.period === 1 ? (
                    <div style={{ fontSize: ".12rem", marginTop: ".02rem" }}>
                      {moment.unix(item.start_time).format("YYYY-MM-DD")}
                      &nbsp;-&nbsp;
                      {moment.unix(item.end_time).format("YYYY-MM-DD")}
                    </div>
                  ) : (
                    <div style={{ fontSize: ".12rem", marginTop: ".02rem" }}>
                      {moment().format("YYYY-MM-DD")}
                      &nbsp;-&nbsp;
                      {moment()
                        .add(item.expiry_day, "days")
                        .format("YYYY-MM-DD")}
                    </div>
                  )}
                </div>
                <div
                  style={{ color: "#FF8816 " }}
                  onClick={() => {
                    // if (item.limit === 0 || item.is_has < item.limit) {
                    //   this.addCoupon(item.id);
                    // }

                    this.addCoupon(item.id);
                  }}
                >
                  {/* {item.limit === 0 || item.is_has < item.limit
                    ? "立即领取"
                    : "已领取"} */}
                  立即领取
                </div>
              </div>
            ))}
          </div>
          <div onClick={onClose} className="button">
            完成
          </div>

          {showSuccessTag && <div className="success-tag">优惠券领取成功</div>}
        </div>
      </Modal>
    );
  }
}

export default CouponModal;
