import React from "react";
import { withRouter } from "react-router-dom";
import "./index.less";

@withRouter
class FlashGoodsItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { now_time, active, goods, history } = this.props;

    let secondkill_not_start =
      active && active.start_time > now_time ? true : false;

    let secondkill_is_end =
      active && active.end_time <= now_time ? true : false;
    return (
      <div
        className="--flash-goods-item"
        onClick={() => {
          if (secondkill_is_end || secondkill_not_start) return;
          history.push(`/goodsdetail/${goods.id}`);
        }}
      >
        <div className="goods-cover">
          <img src={goods.cover} />
        </div>
        <div className="goods-info">
          <div className="line-clamp-three">
            {goods.brand} {goods.name}
          </div>
          <div>
            <div className="price">
              <span className="current-price">
                ￥<span>{parseFloat(goods.activity_price)}</span>
              </span>

              {Number(goods.brokerage_money) ? (
                <span
                  style={{
                    color: "#FFB516",
                    fontSize: ".11rem",
                    margin: "0 .08rem"
                  }}
                >
                  赚{parseFloat(goods.brokerage_money)}元
                </span>
              ) : (
                <span className="old-price">
                  ￥{parseFloat(goods.market_price)}
                </span>
              )}
            </div>
            <div
              className="buy-button"
              style={{
                background:
                  secondkill_is_end || secondkill_not_start
                    ? "#A1ADB9"
                    : "#FFB516"
              }}
            >
              {secondkill_is_end
                ? "秒杀结束"
                : secondkill_not_start
                ? "立即抢购"
                : "立即抢购"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FlashGoodsItem;
