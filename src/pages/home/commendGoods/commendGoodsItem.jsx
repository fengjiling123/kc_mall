import React from "react";
import { withRouter } from "react-router-dom";
import D11Image from "@/components/temp/d11_image";
import "./index.less";
import { setEvent } from "../../../util/methods";

@withRouter
class CommendGoodsItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { goodsInfo, history } = this.props;
    return (
      <div
        className="--home-commend-goods-item"
        onClick={() => {
          setEvent("首页", `推荐商品`, `商品id=${goodsInfo.id}`);
          history.push(`/goodsdetail/${goodsInfo.id}`);
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="goods-cover">
          <div className="act-img">
            <D11Image />
          </div>
          <img src={goodsInfo.cover} />
        </div>

        <div className="goods-name line-clamp-two">{goodsInfo.name}</div>
        <div>
          <span style={{ color: "#FF5000", flexShrink: 0 }}>
            <span style={{ fontSize: "0.12rem" }}>￥</span>
            <span style={{ fontSize: "0.18rem" }}>
              {parseFloat(goodsInfo.price)}
            </span>
            {Number(goodsInfo.brokerage_money) ? (
              <span
                style={{
                  color: "#FFB516",
                  fontSize: ".11rem",
                  margin: "0 .08rem"
                }}
              >
                赚{parseFloat(goodsInfo.brokerage_money)}元
              </span>
            ) : (
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
            )}
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
