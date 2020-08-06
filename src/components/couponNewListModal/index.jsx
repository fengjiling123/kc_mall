import React from "react";
import { connect } from "react-redux";
import chakan_icon from "../../assets/images/icon-chakan.png";
import guanbi_icon from "../../assets/images/icon-guanbi.png";
import { changeShowPage } from "../../store/actions/couponNewListModal";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { setCache } from "@/store/actions/cache";
import http from "@/util/http";
import "./index.less";
import isWeixin from "@/util/tools";

@withRouter
@connect(state => ({
  ...state.couponNewListModal
}))
class CouponNewListModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { showPage, couponList, dispatch, history } = this.props;
    if (!showPage) return null;
    this.props.dispatch(setCache({ not_first: true }));
    return (
      <div className="--coupon-new-list-modal">
        <div
          className="mask"
          onClick={() => {
            dispatch(changeShowPage(false));
          }}
        />
        <div className="content">
          <img
            src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fbg-youhuiquan.png"
            className="bg-1"
          />
          <img
            src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fbg-youhuiquanshang.png"
            className="bg-2"
          />
          <img
            src={chakan_icon}
            className="chakan"
            onClick={() => {
              dispatch(changeShowPage(false));
              history.push("/mycenter/mycoupon");
            }}
          />
          <img
            src={guanbi_icon}
            className="close"
            onClick={() => {
              dispatch(changeShowPage(false));
            }}
          />
          <div
            className="coupons"
            onClick={() => {
              dispatch(changeShowPage(false));
              history.push("/mycenter/mycoupon");
            }}
          >
            {couponList.map(item => (
              <div className="coupon-item" key={item.id}>
                <div className="price">
                  <span style={{ fontSize: ".18rem", marginTop: ".1rem" }}>
                    ￥
                  </span>
                  <span style={{ fontSize: ".32rem" }}>
                    {parseFloat(item.money)}
                  </span>
                </div>
                <div className="info">
                  <div>
                    {parseFloat(item.reach_money) === 0
                      ? "无门槛"
                      : `满${parseFloat(item.reach_money)}`}
                    减{parseFloat(item.money)}
                  </div>
                  <div
                    style={{
                      color: "#657281",
                      fontSize: ".1rem",
                      marginTop: ".05rem"
                    }}
                  >
                    {moment.unix(item.start_time).format("YYYY.MM.DD")}-
                    {moment.unix(item.end_time).format("YYYY.MM.DD")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CouponNewListModal;
