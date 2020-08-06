import React from "react";
import { withRouter } from "react-router-dom";
import "./index.less";
import { setEvent } from "@/util/methods";

@withRouter
class CommendGoodsItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { goodsInfo, history } = this.props;
    return (
      <div
        className="--other-commend-goods-item"
        onClick={() => {
          // setEvent("首页", `推荐商品`, `商品id=${goodsInfo.id}`);
          history.push(`/goodsdetail/${goodsInfo.id}`);
        }}
      >
        <div className="goods-cover">
          <img src={goodsInfo.cover} />
        </div>
        <div className="goods-name line-clamp-one">{goodsInfo.name}</div>
        <div className="tags ">
          {goodsInfo.activity === 3 && (
            <span className="tag">
              满
              {Number(
                goodsInfo.activity_info && goodsInfo.activity_info.reach_money
              )}
              减
              {Number(
                goodsInfo.activity_info && goodsInfo.activity_info.reduce_money
              )}
            </span>
          )}
          {Number(goodsInfo.freight) === 0 && <span className="tag">包邮</span>}
          {Number(goodsInfo.brokerage_money) ? (
            <span
              className="tag"
              style={{ background: "#FF5000", color: "#fff" }}
            >
              赚{parseFloat(goodsInfo.brokerage_money)}元
            </span>
          ) : null}
        </div>
        <div style={{lineHeight:'.22rem'}}>
          <span style={{ color: "#FF5000", flexShrink: 0 }}>
            <span style={{ fontSize: "0.12rem" }}>￥</span>
            <span style={{ fontSize: "0.16rem" }}>
              {parseFloat(goodsInfo.price)}
            </span>
            <span
              style={{
                color: "#657281",
                fontSize: ".11rem",
                textDecoration: "line-through",
                margin: "0 .08rem"
              }}
            >
              ￥{parseFloat(goodsInfo.market_price)}
            </span>
          </span>
          <span
            style={{ color: "#657281", fontSize: "0.12rem", flexShrink: 0 }}
          >
            {goodsInfo.sales}人购买
          </span>
        </div>
      </div>
    );
  }
}

export default CommendGoodsItem;
