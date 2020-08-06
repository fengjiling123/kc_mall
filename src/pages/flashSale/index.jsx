import React from "react";
import TopBar from "@/components/topBar";
import CountDown from "@/components/countDown";
import * as ReactDOM from "react-dom";
import { ListView, PullToRefresh, ActivityIndicator } from "antd-mobile";
import FlashGoodsItem from "./flashSaleGoodsItem";
import left_arror_img from "@/assets/images/left_arror@3x.png";
import right_arror_img from "@/assets/images/right_arror@3x.png";
import bottom_arror_img from "@/assets/images/xia@3x.png";
import BackToHome from "@/components/backToHome";
import http from "@/util/http";
import moment from "moment";
import "./index.less";
import { getShareUrl, share } from "../../util/share";

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 === row2
});

class FlashSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saleTabList: [],
      active: null,
      goodsList: [],
      height: document.documentElement.clientHeight,
      loading: false,
      refreshing: false,
      scrollIndex: 0,
      now_time: parseInt(new Date().getTime() / 1000),
      last_page: 1,
      page: 1,
      limit: 10
    };
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.setState({
      height: hei
    });
    this.getActivitiesTime();
    let title = "限时秒杀今日开抢，每天11点准时上新";
    let desc = "";
    let logo =
      "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fic_flash_share.png";
    share(title, desc, getShareUrl(false), logo);
    console.log("flashSale")
  }

  //获取活动时间列表
  getActivitiesTime = () => {
    this.clearInterval();
    http({
      url: "/activities.time.get",
      loading: true
    }).then(res => {
      let saleTabList = res.data.data;
      if (saleTabList && saleTabList.length > 0) {
        this.setState({ saleTabList });
        this.changeActiveTab(saleTabList[0]);
        //设置定时器实时获取当前时间
        this.flashSaleTimer = setInterval(() => {
          let now_time = parseInt(new Date().getTime() / 1000);
          this.setState({ saleTabList, now_time });
        }, 1000);
      }
    });
  };

  //设置当前选择活动
  changeActiveTab = active => {
    if (this.state.active && this.state.active.id === active.id) return;
    document.getElementsByClassName(
      "flash-sale-page-list-view"
    )[0].scrollTop = 0;
    this.setState({ active, page: 1, goodsList: [] }, () => {
      this.getActiveGoodsList();
    });
  };

  //获取活动商品列表
  getActiveGoodsList = () => {
    const { page, limit, active } = this.state;
    this.setState({ loading: true });
    http({
      url: "/activities.secondkill.list",
      params: { page, limit, activity_id: active.id }
    })
      .then(res => {
        this.setState({
          refreshing: false,
          loading: false,
          goodsList:
            page === 1
              ? res.data.data.goods.data
              : [...this.state.goodsList, ...res.data.data.goods.data],
          last_page: res.data.data.goods.last_page
        });
      })
      .catch(err => {
        this.setState({ loading: false, refreshing: false });
      });
  };

  //切换tab
  changeScrollInde = direction => {
    let { scrollIndex, saleTabList } = this.state;
    scrollIndex = direction === "left" ? scrollIndex - 1 : scrollIndex + 1;

    let renderTab = saleTabList.slice(scrollIndex * 2, 2 * (scrollIndex + 1));
    if (scrollIndex > 0 && renderTab.length === 1) {
      renderTab = saleTabList.slice(scrollIndex * 2 - 1, 2 * (scrollIndex + 1));
    }

    const active = renderTab[0];
    this.setState({ scrollIndex });
    this.changeActiveTab(active);
  };

  //下拉刷新
  onRefresh = () => {
    this.setState({ page: 1 }, () => {
      this.getActiveGoodsList();
    });
  };

  //上拉加载
  onEndReached = () => {
    const { page, last_page } = this.state;
    if (page < last_page) {
      this.setState({ page: page + 1 }, () => {
        this.getActiveGoodsList();
      });
    }
  };

  //判断秒杀状态
  getStatus = active => {
    const { now_time } = this.state;
    let secondkill_not_start =
      active && active.start_time > now_time ? true : false;

    let secondkill_is_end =
      active && active.end_time <= now_time ? true : false;

    return secondkill_is_end
      ? "秒杀结束"
      : secondkill_not_start
      ? "即将开抢"
      : "抢购中";
  };

  //移除定时器
  clearInterval = () => {
    if (this.flashSaleTimer) {
      clearInterval(this.flashSaleTimer);
      this.flashSaleTimer = false;
    }
  };

  componentWillUnmount() {
    this.clearInterval();
  }

  render() {
    const {
      saleTabList,
      active,
      now_time,
      goodsList,
      loading,
      height,
      refreshing,
      scrollIndex
    } = this.state;
    let renderTab = saleTabList.slice(scrollIndex * 2, 2 * (scrollIndex + 1));
    if (scrollIndex > 0 && renderTab.length === 1) {
      renderTab = saleTabList.slice(scrollIndex * 2 - 1, 2 * (scrollIndex + 1));
    }

    let secondkill_not_start =
      active && active.start_time > now_time ? true : false;

    return (
      <div className="--flash-sale-page">
        <TopBar name="秒杀专区" />
        <BackToHome />
        {/* 时间段tab */}
        <div className="sale-tabs">
          {renderTab.map(item => (
            <div
              key={item.id}
              className={active && active.id === item.id ? "active tab" : "tab"}
              onClick={() => {
                this.changeActiveTab(item);
              }}
            >
              <div>{moment.unix(item.start_time).format("HH:mm")}</div>
              <div className="tag">{this.getStatus(item)}</div>

              {active && active.id === item.id && (
                <img src={bottom_arror_img} className="bottom-arror" />
              )}
            </div>
          ))}

          {saleTabList && saleTabList.length === 1 && (
            <div
              className="tab"
              style={{
                color: "#DBE0E5"
              }}
            >
              敬请期待
            </div>
          )}

          {scrollIndex !== 0 && (
            <div
              className="left-arror"
              onClick={() => {
                this.changeScrollInde("left");
              }}
            >
              <img src={left_arror_img} />
            </div>
          )}
          {saleTabList.length > 0 &&
            scrollIndex !== Math.ceil(saleTabList.length / 2) - 1 && (
              <div
                className="right-arror"
                onClick={() => {
                  this.changeScrollInde("right");
                }}
              >
                <img src={right_arror_img} />
              </div>
            )}
        </div>

        {/* 倒计时 */}
        {active && (
          <div className="count-down-container">
            <div>限时秒杀</div>
            <div>
              <span>{secondkill_not_start ? "距开始" : "距结束"}</span>
              <CountDown
                time={
                  secondkill_not_start ? active.start_time : active.end_time
                }
              />
            </div>
          </div>
        )}

        {/* 商品列表 */}
        <ListView
          className="list-view flash-sale-page-list-view"
          ref={el => (this.lv = el)}
          dataSource={dataSource.cloneWithRows(goodsList)}
          renderFooter={() => (
            <div
              style={{
                padding: 5,
                display: "flex",
                justifyContent: "center",
                width: "100%"
              }}
            >
              {loading ? <ActivityIndicator animating /> : null}
            </div>
          )}
          renderRow={rowData => (
            <FlashGoodsItem
              goods={rowData}
              now_time={now_time}
              active={active}
            />
          )}
          useBodyScroll={false}
          style={{ height }}
          pullToRefresh={
            <PullToRefresh refreshing={refreshing} onRefresh={this.onRefresh} />
          }
          onEndReached={this.onEndReached}
        />
      </div>
    );
  }
}

export default FlashSale;
