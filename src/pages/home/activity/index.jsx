import React from "react";
import { withRouter } from "react-router-dom";
import http from "@/util/http";
import CountDown from "@/components/countDown";
import "./index.less";
import { setEvent } from "../../../util/methods";

@withRouter
class HomeActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondkillActivityInfo: {},
      newBanner: "",
      reductionList: [],
      secondkillList: [],
      now_time: parseInt(new Date().getTime() / 1000)
    };
  }

  componentDidMount() {
    this.getNewBanner();
    this.getReductionList();
    this.getSecondkill();
    this.props.parentMount(this);
    this.homeTimer = setInterval(() => {
      let now_time = parseInt(new Date().getTime() / 1000);
      this.setState({ now_time });
    }, 1000);
  }

  //获取新人频道banner
  getNewBanner() {
    http({
      url: "/banner.new.get"
    }).then(res => {
      this.setState({
        newBanner: res.data.data && res.data.data.data ? res.data.data.data : ""
      });
    });
  }

  //获取满减活动列表
  getReductionList() {
    http({
      url: "/activities.reduction.list",
      params: { sort: 1, limit: 2, page: 1 }
    }).then(res => {
      this.setState({
        reductionList: res.data.data.data
      });
    });
  }

  //移除定时器
  clearInterval = () => {
    if (this.homeTimer) {
      clearInterval(this.homeTimer);
      this.homeTimer = false;
    }
  };

  //获取秒杀活动列表
  getSecondkill() {
    http({
      url: "/activities.secondkill.list",
      params: { activity_id: 0, page: 1, limit: 2 }
    }).then(res => {
      let result = res.data.data;
      if (result) {
        this.setState({
          secondkillList:
            result.goods && result.goods.data ? result.goods.data : [],
          secondkillActivityInfo: result.activity
        });
      }
    });
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  render() {
    const {
      newBanner,
      reductionList,
      secondkillList,
      secondkillActivityInfo,
      now_time
    } = this.state;
    const { history } = this.props;
    if (
      !(
        newBanner ||
        (reductionList && reductionList.length) ||
        (secondkillList && secondkillList.length)
      )
    )
      return null;
    let secondkill_not_start =
      secondkillActivityInfo && secondkillActivityInfo.start_time > now_time
        ? true
        : false;
    return (
      <div className="--home-activity">
        {/* 新人专区 */}
        {newBanner && (
          <div
            className="new-people"
            onClick={() => {
              setEvent("首页", "新人专区banner");
              history.push("/newcomerchannel");
            }}
          >
            <img src={newBanner} />
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          {/* 秒杀专区 */}
          {secondkillList && secondkillList.length > 0 && (
            <div
              className="spike"
              onClick={() => {
                setEvent("首页", `限时秒杀`);
                history.push(`/flashsale`);
              }}
            >
              <div className="title">
                <span className="name">限时秒杀</span>
                <CountDown
                  time={
                    secondkill_not_start
                      ? secondkillActivityInfo.start_time
                      : secondkillActivityInfo.end_time
                  }
                  style={{
                    borderRadius: "50%",
                    background: "#fd3e4c",
                    height: "18px",
                    width: "18px",
                    fontSize: ".11rem"
                  }}
                />
              </div>
              <div className="tip">每日开启</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {secondkillList.map(item => (
                  <div key={item.id} className="goods-info">
                    <div className="goods-cover">
                      <img src={item.cover} />
                    </div>
                    <div className="price">
                      <span>￥{parseFloat(item.activity_price)}</span>
                      <span className="old-price">
                        ￥{parseFloat(item.market_price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 满减活动 */}
          {reductionList && reductionList.length > 0 && (
            <div
              className="full-reduction"
              onClick={() => {
                setEvent("首页", `康策优选`);
                history.push("/reduction");
              }}
            >
              <div className="title">
                <span className="name">康策优选</span>
                <span className="tag">
                  满{Number(reductionList[0].reach_money)}减
                  {Number(reductionList[0].reduce_money)}
                </span>
              </div>
              <div className="tip">开启品质生活</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {reductionList.map(item => (
                  <div key={item.id} className="goods-cover">
                    <img src={item.cover} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default HomeActivity;
