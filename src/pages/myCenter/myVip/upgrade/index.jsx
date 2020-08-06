import React from "react";
import { connect } from "react-redux";
import history from "@/util/history";
import http from "@/util/http";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";
import { RoundImageView } from "@/components/imageView";
import qs from "qs";
import "./index.less";
import * as actions from "@/store/actions/login";
import Progress from "./progress";

import icVipLeft from "@/assets/images/ic_vip_left.png";
import icVipRight from "@/assets/images/ic_vip_right.png";
import * as classnames from "classnames";
import { Toast } from "antd-mobile";
import { GET_SELLER } from "../../../../store/actions/seller";
import Auth from "../../../../components/auth";
import touxiang from "@/assets/images/touxiang.png";

@connect(state => ({
  ...state.login,
  ...state.seller
}))
@Auth
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      active: false
    };
  }

  componentDidMount() {
    http({
      url: "/self.money.membership"
    }).then(res => {
      this.setState({
        data: res.data.data
      });
    });
  }

  //立即升级
  onUpgrade = () => {
    let { active } = this.state;
    if (active) {
      http({
        url: "/self.upgrade",
        method: "post",
        data: { type: 1 }
      }).then(res => {
        Toast.success("升级成功!", 1.5);
        setTimeout(() => {
          history.replace("/myvip");
        }, 1500);
      });
    } else {
      Toast.fail("不满足条件，请先完成活动任务!", 1.5);
    }
  };
  //邀请码激活
  onActive = () => {
    history.push("/myvip/active");
  };

  render() {
    let { active, data } = this.state;
    let present = data.pay_money ? parseFloat(data.pay_money) : 0;
    present /= data.max_money ? data.max_money : 1;
    if (present >= 1 && !active) {
      this.setState({
        active: true
      });
    }

    const FunctionItem = props => {
      return (
        <div className="functionItem">
          <ImageView
            src={props.src}
            style={{
              width: "0.48rem",
              height: "0.48rem"
            }}
          />
          <div
            style={{
              color: "#DEC590",
              marginTop: "0.06rem"
            }}
          >
            {props.name}
          </div>
        </div>
      );
    };
    return (
      <div className="myVipUpgrade">
        <TopBar name="升级会员" />
        <div className="vipTop">
          <ImageView
            src={
              "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fbg_vip_background.png"
            }
            style={{
              width: "100%",
              borderRadius: "0"
            }}
          />
          <div className="infoGroup">
            <RoundImageView
              src={data.face ? data.face : touxiang}
              style={{
                marginLeft: "0.3rem",
                width: "0.54rem",
                height: "0.54rem",
                borderRadius: "0.54rem",
                backgroundColor: "white",
                overflow: "hidden"
              }}
            />
            <div className="right">
              <div className="name">{data.nickname}</div>
              <div className="value">{`消费金额：${parseFloat(
                data.pay_money
              )}/${data.max_money}`}</div>
              <Progress progress={present}></Progress>
            </div>
          </div>
          <ImageView
            src={
              "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fbg_vip_font.png"
            }
            style={{
              borderRadius: "0",
              position: "absolute",
              marginLeft: "0.15rem",
              marginRight: "0.15rem",
              bottom: "0"
            }}
          />
          <div className="group">
            <div className="text">
              消费满99元即可升级为钻石会员并享受以下会员权益
            </div>
            <div className="funGroup">
              <FunctionItem
                src={
                  "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fic_vip_shop.png"
                }
                name={"购物省钱"}
              />
              <FunctionItem
                src={
                  "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fic_vip_share.png"
                }
                name={"分享赚钱"}
              />
              <FunctionItem
                src={
                  "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fic_vip_cashback.png"
                }
                name={"永久赚佣"}
              />
              <FunctionItem
                src={
                  "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fic_vip_coupon.png"
                }
                name={"折扣卡券"}
              />
              <FunctionItem
                src={
                  "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fic_vip_activity.png"
                }
                name={"会员日活动"}
              />
              <FunctionItem
                src={
                  "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fic_vip_more.png"
                }
                name={"更多权益"}
              />
            </div>
          </div>
        </div>
        <div
          className={classnames({
            confirm: true,
            active: this.state.active
          })}
          onClick={() => {
            this.onUpgrade();
          }}
        >
          立即升级
        </div>
        <div
          className="activeCode"
          onClick={() => {
            this.onActive();
          }}
        >
          邀请码激活
        </div>

        <ImageView
          src={
            "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fbg_vip_goods_1.png"
          }
        />
        <ImageView
          src={
            "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fbg_vip_goods_2.png"
          }
        />
        <ImageView
          src={
            "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fbg_vip_goods_3.png"
          }
        />
        <ImageView
          src={
            "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fbg_vip_goods_4.png"
          }
        />
      </div>
    );
  }
}
export default Index;
