import React from "react";
import history from "@/util/history";
import http from "@/util/http";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";
import { RoundImageView } from "@/components/imageView";
import MyListView from "@/components/listView";
import storeRight from "@/assets/images/ic_order_store_right.png";
import icNotice from "@/assets/images/ic_notice.png";
import icCoupon from "@/assets/images/ic_message_coupon.png";
import icStore from "@/assets/images/ic_message_store.png";

import moment from "moment";
import "./index.less";
import { SwipeAction } from "antd-mobile";
import * as classnames from "classnames";

class Index extends React.Component {
  page = 1;
  limit = 10;
  state = {
    dataChange: {
      isRefresh: true,
      data: []
    }
  };

  onRefresh = () => {
    this.page = 1;
    this.loadMessage();
  };

  onEndReached = () => {
    this.page = this.page + 1;
    this.loadMessage();
  };

  loadMessage = () => {
    let params = {
      page: this.page,
      limit: this.limit
    };
    http({
      url: "/message.list",
      params
    }).then(res => {
      this.setState({
        dataChange: {
          isRefresh: params.page === 1,
          data:
            params.page === 1
              ? res.data.data.data
              : this.state.dataChange.data.concat(res.data.data.data)
        }
      });
    });
  };

  toMessageDetail = item => {
    let data = {
      id: item.id
    };
    http({
      url: "/message.read",
      method: "POST",
      data
    }).then(res => {
      item.is_read = 1;
    });

    switch (item.target) {
      case 1:
        break;
      case 2:
        history.push(`/applyopenshop`);
        break;
      case 3:
        history.push(`/mycenter/mycoupon`);
        break;
    }
  };

  render() {
    return (
      <div className="--messagePage">
        <TopBar name="消息通知" style={{ background: "#ffffff" }} />

        <div className="line" />

        <MyListView
          loadCompleteMsg={""}
          separator={() => (
            <div
              style={{
                height: "0.01rem",
                width: "100%",
                background: "#f5f6f8"
              }}
            />
          )}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onDataChange={this.state.dataChange}
          row={(rowData, sectionID, rowID) => {
            let item = this.state.dataChange.data[rowID];
            return (
              <div
                className="messageItem"
                onClick={() => {
                  this.toMessageDetail(item);
                }}
              >
                <RoundImageView
                  src={item.target == 2 ? icStore : icCoupon}
                  style={{
                    marginLeft: "0.15rem",
                    marginRight: "0.1rem",
                    width: "0.4rem",
                    height: "0.4rem",
                    background: "#A1ADB9"
                  }}
                />
                <div className="right">
                  <div
                    className={`line-clamp-two message ${
                      item.is_read == 1 ? "read" : ""
                    }`}
                  >
                    {item.title}
                  </div>
                  <div className={`time ${item.is_read == 1 ? "read" : ""}`}>
                    {moment.unix(item.create_time).format("YYYY-MM-DD")}
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }
}
export default Index;
