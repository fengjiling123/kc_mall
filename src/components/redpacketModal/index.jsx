import React from "react";
import qs from "qs";
import icon_guanbi from "@/assets/images/icon-guanbi.png";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCouponNewList } from "@/store/actions/couponNewListModal";
import { setCache } from "@/store/actions/cache";
import { getCookie } from "@/util/methods";
import http from "@/util/http";

import "./index.less";

@withRouter
@connect(state => ({
  isLogin: state.login.isLogin
}))
class RedpacketModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inviter_id: "",
      not_first: true
    };
  }

  componentDidMount() {
    const inviter_id = qs.parse(window.location.search.split("?")[1])
      .inviter_id;
    this.setState({ inviter_id });
    this.getLoginCache();
  }

  getLoginCache = () => {
    http({
      url: "self.cache.get",
      params: { key: "not_first" }
    }).then(res => {
      this.setState({ not_first: res.data.data });
    });
  };

  render() {
    const { userInfo, closeModal, isLogin, history } = this.props;
    const { inviter_id, not_first } = this.state;

    //已登录且不是第一次登陆、非邀请、已弹出过新人弹窗 不再显示
    if (
      (userInfo && userInfo.is_first === 0) ||
      !inviter_id ||
      not_first ||
      JSON.parse(getCookie("notShowRedpacketModal"))
    )
      return null;
    return (
      <div className="--redpacket-modal">
        <div
          className="mask"
          onClick={() => {
            closeModal();
          }}
        />
        <div className="content">
          {/* <img
            className="guanbi-iocn"
            src={icon_guanbi}
            onClick={() => {
              closeModal();
            }}
          /> */}
          <img
            onClick={() => {
              if (isLogin) {
                closeModal();
                this.props.dispatch(getCouponNewList());
              } else {
                closeModal();
                history.push("/login");
              }
            }}
            className="hongbao-icon"
            src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Ftanchuang-yaoqingyonghuchengzaiyemian.png"
          />
        </div>
      </div>
    );
  }
}
export default RedpacketModal;
