import React from "react";
import http from "@/util/http";
import history from "@/util/history";
import ImageView from "@/components/imageView";
import "./index.less";
import { Toast } from "antd-mobile";
import { setEvent } from "../../util/methods";
import D11Image from "@/components/temp/d11_image";

import * as classnames from "classnames";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRuleModal: false
    };
  }

  //贴图样式点击
  toDetail = (item, index) => {
    if (item.length <= index) return;
    if (!item[index]) return;
    if (this.props.atHomePage) {
      setEvent("首页", `通栏模块`);
    }
    switch (item[index].content_type) {
      case 1: //url
        if (item[index].content) {
          window.location.href = item[index].content;
        }
        break;
      case 2: //优惠券id
        http({
          url: "/coupon.add",
          params: { id: item[index].content }
        }).then(res => {
          Toast.success("领取成功！", 1);
        });
        break;
      case 3: //商品id
        history.push(`/goodsdetail/${item[index].content}`);
        break;
    }
  };

  //商品样式点击
  toGoodsDetail = item => {
    if (this.props.atHomePage) {
      setEvent("首页", `通栏模块`);
    }
    history.push(`/goodsdetail/${item.content}`);
  };

  getView1 = (item, src) => {
    return (
      <div className="view1">
        <ImageView
          src={src}
          onClick={() => {
            this.toDetail(item, 0);
          }}
        />
      </div>
    );
  };

  getView2 = (item, src1, src2) => {
    return (
      <div className="view2">
        <ImageView
          src={src1}
          style={{ width: "50%" }}
          onClick={() => {
            this.toDetail(item, 0);
          }}
        />
        <ImageView
          src={src2}
          style={{ width: "50%" }}
          onClick={() => {
            this.toDetail(item, 1);
          }}
        />
      </div>
    );
  };

  getView3 = (item, src1, src2, src3) => {
    return (
      <div className="view3">
        <ImageView
          src={src1}
          style={{ width: "33.3%" }}
          onClick={() => {
            this.toDetail(item, 0);
          }}
        />
        <ImageView
          src={src2}
          style={{ width: "33.3%" }}
          onClick={() => {
            this.toDetail(item, 1);
          }}
        />
        <ImageView
          src={src3}
          style={{ width: "33.3%" }}
          onClick={() => {
            this.toDetail(item, 2);
          }}
        />
      </div>
    );
  };

  getView4 = (item, src1, src2, src3, src4) => {
    return (
      <div className="view4">
        <ImageView
          src={src1}
          style={{ width: "25%" }}
          onClick={() => {
            this.toDetail(item, 0);
          }}
        />
        <ImageView
          src={src2}
          style={{ width: "25%" }}
          onClick={() => {
            this.toDetail(item, 1);
          }}
        />
        <ImageView
          src={src3}
          style={{ width: "25%" }}
          onClick={() => {
            this.toDetail(item, 2);
          }}
        />
        <ImageView
          src={src4}
          style={{ width: "25%" }}
          onClick={() => {
            this.toDetail(item, 3);
          }}
        />
      </div>
    );
  };

  getView5 = (item, src1, src2, src3) => {
    return (
      <div
        className="view5"
        onClick={() => {
          this.toDetail(item);
        }}
      >
        <ImageView
          src={src1}
          style={{ width: "50%" }}
          onClick={() => {
            this.toDetail(item, 0);
          }}
        />
        <div className="nextView">
          <ImageView
            src={src2}
            onClick={() => {
              this.toDetail(item, 1);
            }}
          />
          <ImageView
            src={src3}
            onClick={() => {
              this.toDetail(item, 2);
            }}
          />
        </div>
      </div>
    );
  };

  getGoodsView2 = item => {
    return (
      <div
        className={`card2`}
        onClick={() => {
          this.toGoodsDetail(item);
        }}
      >
        <div className="goodsImg">
          <div className="act-img">
            <D11Image />
          </div>
          <img
            src={item.image}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute"
            }}
          />
        </div>
        <div className="goodsContent">
          <div className="content">
            <div className="goodsName line-clamp-two">{item.name}</div>
            <div className="goodsPrice">
              <div className="prefix">￥</div>
              <div className="value">
                {parseFloat(item.actual_price ? item.actual_price : 0)}
              </div>
              <div className="empty" />
              <div className="count line-clamp-one">
                {parseFloat(item.sales ? item.sales : 0)}人购买
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  getGoodsView3 = item => {
    return (
      <div
        className={`card3`}
        onClick={() => {
          this.toGoodsDetail(item);
        }}
      >
        <div className="goodsImg">
          <div className="act-img">
            <D11Image />
          </div>
          <img
            src={item.image}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute"
            }}
          />
        </div>
        <div className="goodsContent">
          <div className="content">
            <div className="goodsName line-clamp-one">{item.name}</div>
            <div className="goodsBuy">
              <span className="text">立即购买</span>
            </div>
            <div className="goodsPrice">
              <div className="prefix">￥</div>
              <div className="value">
                {parseFloat(item.actual_price ? item.actual_price : 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  getView = item => {
    let content = item.content;

    //贴图样式
    if (item.type == 1) {
      switch (item.style) {
        case 1: //1一列
          return this.getView1(content, ...content.map(item => item.image));
        case 2: //2两列
          return this.getView2(content, ...content.map(item => item.image));
        case 3: //3三列
          return this.getView3(content, ...content.map(item => item.image));
        case 4: //4四列
          return this.getView4(content, ...content.map(item => item.image));
        case 5: //5一列两行（左右划分）
          return this.getView5(content, ...content.map(item => item.image));
      }
    } else if (item.type == 2) {
      //商品样式
      if (item.style == 2) {
        return (
          <div className="cardGroup2" style={{ background: item.color }}>
            {item.content.map(item => this.getGoodsView2(item))}
          </div>
        );
      } else {
        return (
          <div className="cardGroup3" style={{ background: item.color }}>
            {item.content.map(item => this.getGoodsView3(item))}
          </div>
        );
      }
    }
  };

  render() {
    const { data, ruleData } = this.props;
    const { showRuleModal } = this.state;
    return (
      <div
        className={classnames({
          normalView: true,
          fullScreen: this.props.fullScreen
        })}
      >
        {data.map(item => {
          return this.getView(item);
        })}

        
      </div>
    );
  }
}

export default Index;
