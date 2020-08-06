import React from "react";
import TopBar from "@/components/topBar";
import http from "@/util/http";
import qs from "qs";
import moment from "moment";
import "./index.less";

const ORDER_STATUS = {
  0: "未付款",
  1: "待发货",
  3: "待收货",
  4: "确认收货",
  5: "已完成",
  6: "已取消"
};

class Rakekback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rakebackDetail: {}
    };
  }

  componentDidMount() {
    this.getRakebackDetail();
  }

  getRakebackDetail = () => {
    http({
      url: "/bill.get",
      params: qs.parse(window.location.search.split("?")[1])
    }).then(res => {
      this.setState({ rakebackDetail: res.data.data });
    });
  };

  render() {
    const { rakebackDetail } = this.state;
    const { history } = this.props;
    return (
      <div className="--rake-back">
        <TopBar name="返佣详情" />
        <div className="scroll-view">
          <div className="rake-back-info">
            <div className="name">
              {rakebackDetail.from_user_name &&
                rakebackDetail.from_user_name.slice(0, 4)}
              {rakebackDetail.from_user_name &&
              rakebackDetail.from_user_name.length > 4
                ? rakebackDetail.from_user_name.length === 5
                  ? "*"
                  : "**"
                : ""}
            </div>
            <div className="money">
              {rakebackDetail.type === 3 ? "+" : "-"}
              {rakebackDetail.money && parseFloat(rakebackDetail.money)}
            </div>
            <div className="type">
              {rakebackDetail.type === 3
                ? "用户订单-返佣"
                : "用户订单-返佣(退款)"}
            </div>
          </div>
          <div className="rake-back-goods">
            <div className="title">返佣商品：</div>
            <div>
              <div className="store-name">{rakebackDetail.store_name}</div>
              <div className="all-goods">
                {rakebackDetail.goods &&
                  rakebackDetail.goods.map(item => (
                    <div
                      className="goods-item"
                      key={item.id}
                      onClick={() => {
                        history.push(`/goodsdetail/${item.goods_id}`);
                      }}
                    >
                      <div className="goods-cover">
                        <img src={item.image} />
                      </div>
                      <div className="goods-info">
                        <div className="line-clamp-two goods-name">
                          {item.name}
                        </div>
                        <div
                          style={{
                            lineHeight: ".2rem",
                            display: "flex",
                            justifyContent:
                              rakebackDetail.type === 4
                                ? "space-between"
                                : "flex-start"
                          }}
                        >
                          <span
                            style={{
                              color: "#FF5000",
                              fontSize: ".16rem",
                              marginRight:
                                rakebackDetail.type === 4 ? "0" : ".3rem"
                            }}
                          >
                            <span style={{ fontSize: ".12rem" }}>￥</span>
                            {parseFloat(item.money)}
                          </span>
                          {rakebackDetail.type === 4 && (
                            <span>
                              实退 ￥{parseFloat(item.brokerage_money)}
                            </span>
                          )}

                          <span>返佣比例{parseInt(item.brokerage * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {rakebackDetail.order && (
            <div className="order-info">
              {rakebackDetail.type === 4 ? (
                <div>订单状态：已退款</div>
              ) : (
                <div>
                  订单状态：{ORDER_STATUS[rakebackDetail.order.operation]}
                </div>
              )}

              <div>
                成交时间：
                {moment
                  .unix(
                    rakebackDetail.type === 4
                      ? rakebackDetail.order.complete_time
                      : rakebackDetail.order.operation_time
                  )
                  .format("YYYY-MM-DD HH:mm:ss")}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Rakekback;
