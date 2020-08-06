import React from "react";
import history from "@/util/history";
import http from "@/util/http";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";
import { RoundImageView } from "@/components/imageView";
import MyListView from "@/components/listView";
import storeRight from "@/assets/images/ic_order_store_right.png";
import icNotice from "@/assets/images/ic_notice.png";
import moment from "moment";
import "./index.less";
import { SwipeAction } from "antd-mobile";
import Auth from "@/components/auth";

@Auth
class Index extends React.Component {
  page = 1;
  limit = 10;

  state = {
    count: 0,
    dataChange: {
      isRefresh: true,
      data: []
    }
  };
  ids = [];

  onRefresh = () => {
    http({
      url: "/message.count"
    }).then(res => {
      this.setState({
        count: res.data.data.count
      });
    });
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
      limit: this.limit,
      type: 0
    };
    http({
      url: "/chat.paginate",
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

  delete = item => {
    let params = {
      id: item.id
    };
    http({
      url: "/chat.hide",
      params
    }).then(res => {
      this.onRefresh();
    });
  };

  toNotice = () => {
    history.push(`/mycenter/message/notice`);
  };

  toMessageDetail = item => {
    history.push(`/mycenter/message/detail?id=${item.store.id}`);
  };

  render() {
    return (
      <div className="--messagePage">
        <TopBar name="消息中心" style={{ background: "#ffffff" }} />

        <div
          className="messageNotice"
          onClick={() => {
            this.toNotice();
          }}
        >
          <ImageView
            src={icNotice}
            style={{
              marginLeft: "0.15rem",
              marginRight: "0.1rem",
              width: "0.4rem",
              height: "0.4rem"
            }}
          />
          <div className="content">通知消息</div>
          {this.state.count !== 0 && (
            <div
              style={{
                marginRight: "0.1rem",
                flex: "none",
                background: "#ffb516",
                borderRadius: "2rem",
                textAlign: "center",
                lineHeight: "0.2rem",
                color: "#fff",
                width: "0.3rem",
                height: "0.2rem"
              }}
            >
              {this.state.count}
            </div>
          )}
          <ImageView
            src={storeRight}
            style={{ width: "0.07rem", height: "0.1rem" }}
          />
        </div>

        <div className="line" />

        <MyListView
          loadCompleteMsg=""
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
              <SwipeAction
                style={{
                  backgroundColor: "white"
                }}
                autoClose
                right={[
                  {
                    text: "删除",
                    onPress: () => {
                      this.delete(item);
                    },
                    style: { backgroundColor: "#ff0000", color: "white" }
                  },
                  {
                    text: "取消",
                    onPress: () => console.log("cancel"),
                    style: { backgroundColor: "#ddd", color: "white" }
                  }
                ]}
                onOpen={() => console.log("global open")}
                onClose={() => console.log("global close")}
              >
                <div
                  className="messageItem"
                  onClick={() => {
                    this.toMessageDetail(item);
                  }}
                >
                  <RoundImageView
                    src={item.store ? item.store.logo : ""}
                    style={{
                      marginLeft: "0.15rem",
                      marginRight: "0.1rem",
                      width: "0.4rem",
                      height: "0.4rem",
                      background: "#A1ADB9"
                    }}
                  />
                  <div className="right">
                    <div className="titleGroup">
                      <div className="title">
                        {item.store ? item.store.name : ""}
                      </div>
                      <div className="time">
                        {moment.unix(item.order_time).format("MM-DD HH:mm")}
                      </div>
                    </div>
                    <div className="contentGroup">
                      <div className="content line-clamp-one">
                        {item.last_dialogue}
                      </div>
                      {item.unread_count !== 0 && (
                        <div className="count">{item.unread_count}</div>
                      )}
                    </div>
                  </div>
                </div>
              </SwipeAction>
            );
          }}
        />
      </div>
    );
  }
}
export default Index;
