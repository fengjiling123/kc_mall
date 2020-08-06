import React from "react";
import * as ReactDOM from "react-dom";
import history from "@/util/history";
import TopBar from "@/components/topBar";
import { Tabs, ListView, PullToRefresh, Toast } from "antd-mobile";
import http from "@/util/http";
import back from "@/assets/images/ic_back.png";
import quanBg from "@/assets/images/quanBg.png";
import quanUsedBg from "@/assets/images/quanUsedBg.png";
import "./index.less";
import Auth from "@/components/auth";

const COUPON_ATTRIBUTE = {
  1: "康策良品平台券",
  2: "店铺优惠券",
  3: "新人专享券",
  4: "邀请新人奖励券"
};

@Auth
class MyCoupon extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {
      refreshing: true,
      isLoading: true,
      dataSource,
      isEdit: false,
      status: 1,
      height: document.documentElement.clientHeight,
      couponCode: "" // 兑换码
    };
    this.data = null;
    this.page = 1;
  }

  componentWillMount() {
    this.sendDataRequest(this.page, this.state.status);
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).clientHeight;
    this.setState({
      height: hei
    });
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    this.page = 1;
    this.sendDataRequest(this.page, this.state.status);
  };

  onEndReached = event => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading) {
      return;
    }
    this.setState({ isLoading: true });
    this.page = this.page + 1;
    this.sendDataRequest(this.page, this.state.status);
  };

  sendDataRequest(page, status) {
    var url = "/coupon.list";
    var params = { page, limit: 10, status };
    http({
      url,
      params
    }).then(res => {
      console.log("data", res);
      if (this.page == 1) {
        this.data = res.data.data.data;
        this.setState({
          refreshing: false,
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(this.data)
        });
      } else {
        this.data = [...this.data, ...res.data.data.data];
        this.setState({
          isLoading: false,
          refreshing: false,
          dataSource: this.state.dataSource.cloneWithRows(this.data)
        });
      }
    });
  }

  onTabChange = tab => {
    this.setState(
      {
        status: tab.key
      },
      () => {
        this.onRefresh();
      }
    );
  };

  selectRow = rowData => {
    //  /couponGoodsList?coupon_id=11&reach_money=10&money=10
    //    reach_money是需要满足的金额  money是抵扣金额
    console.log("rowData", rowData);
    if (rowData.status === 1) {
      history.push(
        "/coupongoodsList?coupon_id=" +
          rowData.id +
          "&reach_money=" +
          rowData.reach_money +
          "&money=" +
          rowData.money
      );
    }
  };

  goback() {
    history.goBack();
  }
  getTimeText(rowData) {
    var startTime = "无限制";
    var endTime = "无限制";
    if (rowData.start_time) {
      var date = new Date(rowData.start_time * 1000);
      console.log(date);
      var month = date.getMonth() + 1;
      startTime = date.getFullYear() + "." + month + "." + date.getDate();
    }
    if (rowData.end_time) {
      var date = new Date(rowData.end_time * 1000);
      var month = date.getMonth() + 1;
      endTime = date.getFullYear() + "." + month + "." + date.getDate();
    }
    return startTime + "-" + endTime;
  }
  getCouponDesc(rowData) {
    if (Number(rowData.reach_money) === 0) {
      return "无门槛使用";
    } else {
      var str =
        "满" +
        parseFloat(rowData.reach_money) +
        "减" +
        parseFloat(rowData.money) +
        "元券";
      return str;
    }
  }

  // 兑换优惠券码
  exchangeCouponCode() {
    const { couponCode } = this.state;

    if (!couponCode) {
      return;
    }

    http({
      url: "/coupon.exchange",
      params: {
        code: couponCode
      }
    }).then(res => {
      Toast.success("兑换成功");
      this.setState({ couponCode: "" });
      //优惠券列表滚动到顶部
      ReactDOM.findDOMNode(this.scrollEl).scrollTop = 0;
      // 重新获取当前状态下的第一页数据
      setTimeout(() => this.onRefresh(), 1000);
    });
  }
  render() {
    const tabs = [
      { title: "未使用", key: "1" },
      { title: "已使用", key: "2" },
      { title: "已过期", key: "3" }
    ];

    const row = (rowData, sectionID, rowID) => {
      return (
        <div
          key={rowID}
          className={
            rowData.status === 1 ? "myCoupon-item" : "myCoupon-itemGray"
          }
          onClick={this.selectRow.bind(this, rowData)}
        >
          <div
            className="content-item"
            style={
              rowData.status === 1
                ? { backgroundImage: `url(${quanBg})` }
                : { backgroundImage: `url(${quanUsedBg})` }
            }
          >
            {/* 居中显示信息 */}
            <div className="textContent">
              <div className="leftView">
                <div className="name">
                  {rowData.attribute === 2
                    ? rowData.store_name
                    : COUPON_ATTRIBUTE[rowData.attribute]}
                </div>
                <div className="desc">{this.getCouponDesc(rowData)}</div>
                <div className="time">{this.getTimeText(rowData)}</div>
              </div>
              <div className="rightView">
                <div className="topView">
                  <span className="fuhao">¥</span>
                  <span className="money">{parseFloat(rowData.money)}</span>
                </div>
                <div className="bottomView">
                  {rowData.status === 1
                    ? "立即使用"
                    : rowData.status === 2
                    ? "已使用"
                    : "已过期"}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="myCoupon">
        <div className="topBar" ref={el => (this.lv = el)}>
          <div className="top-operation">
            <div className="backView">
              <img src={back} className="back" onClick={this.goback} alt="" />
            </div>
            <div className="get-coupon">
              <input
                placeholder="输入兑换码"
                onChange={e => {
                  this.setState({ couponCode: e.target.value.trim() });
                }}
                value={this.state.couponCode}
              />
              <span onClick={() => this.exchangeCouponCode()}>兑换</span>
            </div>
          </div>

          <div className="tabs">
            <Tabs
              tabs={tabs}
              initialPage={0}
              onChange={this.onTabChange}
              tabDirection="horizontal"
              tabBarActiveTextColor="#2D343B"
              tabBarInactiveTextColor="#657281"
              tabBarTextStyle={{
                fontSize: "0.14rem"
              }}
              tabBarUnderlineStyle={{
                height: "0.02rem",
                width: "5%",
                marginLeft: "14%"
              }}
              tabBarBackgroundColor="#fff"
            />
          </div>
        </div>
        <div className="content">
          <ListView
            style={{
              height: this.state.height
            }}
            ref={el => (this.scrollEl = el)}
            key="1"
            className="listView"
            dataSource={this.state.dataSource}
            renderFooter={() => <div style={{ height: "100px" }} />}
            renderRow={row}
            pullToRefresh={
              <PullToRefresh
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            onEndReached={this.onEndReached}
            pageSize={10}
          />
        </div>
      </div>
    );
  }
}
export default MyCoupon;
