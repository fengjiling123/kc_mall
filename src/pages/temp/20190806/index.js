import history from "@/util/history";
import http from "@/util/http";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopBar from "@/components/topBar";
import Scroll from "@/components/scroll";
import icHome from "@/assets/images/ic_back_home.png";
import ImageView from "@/components/imageView";
import { parseNum } from "@/util/methods";
import "./index.less";
import { Toast } from "antd-mobile";

export default class Activity20190806 extends Component {
  state = {
    list1: [],
    list2: [],
    list3: []
  };

  componentDidMount() {
    this.loadGoods();
  }

  loadGoods = () => {
    http({
      url: "/activities.temp",
      params: {
        type: "temp_activity_type1"
      }
    }).then(res => {
      this.setState({
        list1: res.data.data
      });
    });
    http({
      url: "/activities.temp",
      params: {
        type: "temp_activity_type2"
      }
    }).then(res => {
      this.setState({
        list2: res.data.data
      });
    });
    http({
      url: "/activities.temp",
      params: {
        type: "temp_activity_type3"
      }
    }).then(res => {
      this.setState({
        list3: res.data.data
      });
    });
  };

  addCoupon = id => {
    http({
      url: "/coupon.add",
      params: { id }
    }).then(res => {
      Toast.success("领取成功！", 1);
    });
  };

  toDetail = goods => {
    history.push(`/goodsdetail/${goods.id}`);
  };

  getGoodsView = goods => {
    return (
      <div
        className="card"
        onClick={() => {
          this.toDetail(goods);
        }}
      >
        <div className="goodsImg">
          <img
            src={goods.cover}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute"
            }}
          />
        </div>
        <div className="goodsContent">
          <div className="content">
            <div className="goodsName line-clamp-one">{goods.name}</div>
            <div className="goodsBuy">
              <span className="text">立即购买</span>
            </div>
            <div className="goodsPrice">
              <div className="prefix">￥</div>
              <div className="value">{parseNum(goods.price)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { list1, list2, list3 } = this.state;
    return (
      //<Scroll cssStyle={scrollStyle} ref="scroll">
      <div className="--Activity20190806">
        <ImageView src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2Fhead.jpg" />
        <ImageView src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2F02.jpg" />

        <div
          style={{
            position: "fixed",
            top: "0.25rem",
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
        <div className="couponsGroup">
          <ImageView
            src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2F03.png"
            style={{ width: "1rem", height: "0.55rem" }}
            onClick={() => {
              this.addCoupon(128);
            }}
          />
          <ImageView
            src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2F04.png"
            style={{ width: "1rem", height: "0.55rem" }}
            onClick={() => {
              this.addCoupon(127);
            }}
          />
          <ImageView
            src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2F05.png"
            style={{ width: "1rem", height: "0.55rem", marginLeft: "0.04rem" }}
            onClick={() => {
              this.addCoupon(126);
            }}
          />
        </div>
        <div style={{ height: "0.2rem" }} />
        <div className="couponsGroup">
          <ImageView
            src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2F06.png"
            style={{ width: "1.2rem", height: "0.6rem" }}
            onClick={() => {
              this.addCoupon(103);
            }}
          />
          <div style={{ width: "0.1rem" }} />
          <ImageView
            src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2F07.png"
            style={{ width: "1.2rem", height: "0.6rem" }}
            onClick={() => {
              this.addCoupon(104);
            }}
          />
        </div>
        <ImageView
          src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2F08.png"
          style={{ width: "100%", height: "0.35rem", marginTop: "0.4rem" }}
        />
        <div className="cardGroup">
          {list1.map(item => this.getGoodsView(item))}
        </div>
        <ImageView
          src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2F09.jpg"
          style={{ width: "100%", height: "0.35rem", marginTop: "0.4rem" }}
        />
        <div className="cardGroup">
          {list2.map(item => this.getGoodsView(item))}
        </div>
        <ImageView
          src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2F10.jpg"
          style={{ width: "100%", height: "0.35rem", marginTop: "0.4rem" }}
        />
        <div className="cardGroup">
          {list3.map(item => this.getGoodsView(item))}
        </div>
        <ImageView
          src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2Ffooter1.jpg"
          style={{ width: "100%", marginTop: "0.3rem" }}
        />
        <ImageView
          src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2Ffooter2.jpg"
          style={{ width: "100%" }}
        />
      </div>
      //</Scroll>
    );
  }
}
