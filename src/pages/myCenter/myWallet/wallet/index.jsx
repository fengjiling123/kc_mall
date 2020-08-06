import React from "react";
import left_arror from "@/assets/images/backWhite.png";
import miaoshu_icon from "@/assets/images/icon-wodeqianbao-wenti-kedianji.png";
import http from "@/util/http";
import moment from "moment";
import { ActivityIndicator } from "antd-mobile";
import _ from "lodash";
import Auth from "@/components/auth";
import "./index.less";

@Auth
class MyWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0, //钱包余额
      last_money: 0, //上月预估收入
      this_money: 0, //本月预估收入
      page: 1,
      limit: 10,
      last_page: 1,
      billList: [], //钱包记录
      renderBillList: [],
      loading: false
    };
    props.cacheLifecycles.didCache(this.componentDidCache);
    props.cacheLifecycles.didRecover(this.componentDidRecover);
  }

  componentDidMount() {
    this.getSelfMoney();
    this.getbalance();
    this.getBillList();
  }

  //被恢复时生命周期
  componentDidRecover = () => {
    this.getbalance();
  };

  getSelfMoney = () => {
    http({
      url: "/self.money.membership"
    }).then(res => {
      const { last_money, this_money } = res.data.data;
      this.setState({
        last_money,
        this_money
      });
    });
  };

  getbalance = () => {
    http({
      url: "/self.get"
    }).then(res => {
      if (res.data.data) {
        const { balance } = res.data.data;
        this.setState({
          balance: parseFloat(balance)
        });
      }
    });
  };

  getBillList = () => {
    const { page, limit } = this.state;
    const params = { page, limit };
    this.setState({ loading: true });
    http({
      url: "/bill.list",
      params
    })
      .then(res => {
        let billList = [...this.state.billList, ...res.data.data.data];
        billList.map(item => {
          item.year = moment.unix(item.create_time).format("YYYYMM");
          item.month = moment.unix(item.create_time).format("MM");
        });

        let renderBillList = _(billList)
          .groupBy(item => item.year)
          .map((items, year) => {
            return {
              year: Number(year),
              month: Number(items[0].month),
              data: items
            };
          })
          .orderBy(["year"], ["desc"])
          .value();

        console.log(renderBillList);
        this.setState({
          last_page: res.data.data.last_page,
          billList,
          renderBillList,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  //检查是否滚动到底部
  onScrollHandle = () => {
    const { page, last_page } = this.state;
    const scrollTop = this.scrollRef.scrollTop;
    const clientHeight = this.scrollRef.clientHeight;
    const scrollHeight = this.scrollRef.scrollHeight;
    const isBottom = scrollHeight - (scrollTop + clientHeight) < 200;
    if (isBottom && scrollTop && last_page !== page) {
      this.setState({ page: page + 1 }, () => {
        this.getBillList();
      });
    }
  };

  //金额用逗号隔开
  formatNumberRgx(num) {
    if (!num) return 0;
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  render() {
    const { history } = this.props;
    const {
      balance,
      last_money,
      this_money,
      renderBillList,
      loading,
      page
    } = this.state;
    return (
      <div
        className="--mywallet"
        onScrollCapture={() => this.onScrollHandle()}
        ref={c => {
          this.scrollRef = c;
        }}
      >
        <div className="top">
          <div className="bar">
            <img
              src={left_arror}
              style={{ height: ".18rem" }}
              onClick={() => {
                history.go(-1);
              }}
            />
            <img
              src={miaoshu_icon}
              style={{ height: ".22rem" }}
              onClick={() => {
                history.push("/walletexplain");
              }}
            />
          </div>
          <div className="tip">可提现(元)</div>
          {/* 提现金额 */}
          <div className="price">
            <div>
              <span style={{ fontSize: ".44rem", lineHeight: ".5rem" }}>
                {this.formatNumberRgx(balance)}
              </span>
              {balance > 0 && (
                <span style={{ fontSize: ".16rem", marginLeft: ".08rem" }}>
                  良品豆
                </span>
              )}
            </div>
            <div
              className="btn"
              onClick={() => {
                history.push("/cashout");
              }}
            >
              提现
            </div>
          </div>
          {/*  */}
        </div>
        {/* 预估收入 */}
        <div className="predict-money">
          <div>
            <div className="money">{this.formatNumberRgx(last_money)}</div>
            <div className="tip">上月预估收入</div>
          </div>
          <div>
            <div className="money">{this.formatNumberRgx(this_money)}</div>
            <div className="tip">本月预估收入</div>
          </div>
        </div>
        {/* 收入列表 */}

        <div className="income-list">
          {renderBillList && renderBillList.length > 0 ? (
            renderBillList.map(monthData => (
              <div key={monthData.year}>
                <div className="title">{parseInt(monthData.month)}月</div>
                <div className="list">
                  {monthData.data.map(item => (
                    <div
                      className="item"
                      key={item.id}
                      onClick={() => {
                        history.push(`/rakeback?id=${item.id}`);
                      }}
                    >
                      <div>
                        <div className="item-name">
                          {item.type === 3
                            ? "用户订单-返佣"
                            : "用户订单-返佣(退款)"}
                        </div>
                        <div className="item-time">
                          {moment
                            .unix(item.create_time)
                            .format("YYYY-MM-DD HH:mm:ss")}
                        </div>
                      </div>
                      <div style={{ fontSize: ".2rem" }}>
                        {item.type === 3 ? "+" : "-"}
                        {parseFloat(item.money)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="empty">暂无收益</div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: ".1rem 0",
            height: "0.2rem"
          }}
        >
          {page !== 1 && loading && <ActivityIndicator animating />}
        </div>
      </div>
    );
  }
}

export default MyWallet;
