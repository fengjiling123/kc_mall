import history from "@/util/history";
import http from "@/util/http";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopBar from "@/components/topBar";
import Scroll from "@/components/scroll";
import icHome from "@/assets/images/ic_back_home.png";
import ImageView from "@/components/imageView";
import NormalView from "@/components/normalView";
import "./index.less";
import { Toast } from "antd-mobile";
import qs from "qs";
import { setEvent } from "../../../util/methods";
import CLOSE_MODAL_IMG from "@/assets/images/icon-guanbi.png";
import { getShareUrl, share } from "../../../util/share";
import isWeixin from "@/util/tools";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ruleData: null,
      showRuleModal: false
    };
  }

  componentDidMount() {
    this.params = qs.parse(window.location.search.split("?")[1]);
    http({
      url: "/activities.general.preview",
      params: { activity_id: this.params.id }
    }).then(res => {
      if (isWeixin) {
        let item = res.data.data.activity;
        let logo =
          // "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2Fshare_logo.png";
          "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fshare_logo.png?";
        logo = item ? item.image : logo;

        let title = item ? item.title : ""; // 分享标题
        let desc = item ? item.sub_title : ""; // 分享标题
        share(title, desc, getShareUrl(false), logo);
      }
      this.setState({
        data: res.data.data.style,
        ruleData: {
          activity_rules_image: res.data.data.activity.activity_rules_image,
          activity_rules_icon: res.data.data.activity.activity_rules_icon
        }
      });
    });
  }

  render() {
    let { data, ruleData, showRuleModal } = this.state;
    return (
      <div className="--NormalActivity">
        <div
          style={{
            position: "fixed",
            top: "0.6rem",
            right: "0.25rem",
            zIndex: 4
          }}
          onClick={() => {
            history.replace("/");
          }}
        >
          <ImageView
            src={icHome}
            style={{
              width: "0.35rem",
              height: "0.35rem",
              zIndex: 4
            }}
          />
        </div>

        {/* 活动规则图标 */}
        {ruleData && ruleData.activity_rules_icon ? (
          <div
            className="rule-icon"
            onClick={e => {
              e.stopPropagation();
              this.setState({ showRuleModal: true });
            }}
          >
            <img
              src={ruleData.activity_rules_icon}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ) : null}

        {/* 活动规则弹窗 */}
        {showRuleModal ? (
          <div className="rule-modal">
            <div
              className="mask"
              onClick={() => {
                this.setState({ showRuleModal: false });
              }}
            />
            <img
              src={CLOSE_MODAL_IMG}
              className="close-icon"
              onClick={() => {
                this.setState({ showRuleModal: false });
              }}
            />
            <div className="content">
              <img src={ruleData.activity_rules_image} className="rule-img" />
            </div>
          </div>
        ) : null}
        
        <NormalView fullScreen={true} data={data} ruleData={ruleData} />
      </div>
    );
  }
}
