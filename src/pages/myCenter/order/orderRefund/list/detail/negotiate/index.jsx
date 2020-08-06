import React from "react";
import history from "@/util/history";
import http from "@/util/http";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";
import MyListView from "@/components/listView";
import storeRight from "@/assets/images/ic_order_store_right.png";
import icTel from "@/assets/images/ic_tel.png";
import kefu_img from "@/assets/images/kefu@3x.png";
import * as actions from "@/store/actions/message";
import "./index.less";
import { ListView, PullToRefresh, Tabs, Toast, Modal } from "antd-mobile";
import moment from "moment";
import Auth from "@/components/auth";
import { connect } from "react-redux";
import qs from "qs";
import { RoundImageView } from "@/components/imageView";

@Auth
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      dataChange: {
        isRefresh: true,
        isLoading: false,
        data: []
      }
    };
  }

  componentWillMount() {
    this.params = qs.parse(window.location.search.split("?")[1]);
  }

  onRefresh = (loading = false) => {
    this.setState(
      {
        page: 1
      },
      () => {
        let params = {
          refund_id: this.params.refund_id,
          page: this.state.page,
          limit: this.state.limit
        };
        if (loading) {
          Toast.loading("加载中", 0);
        }
        http({
          url: "/consult.list",
          params
        })
          .then(res => {
            if (loading) {
              Toast.hide();
            }
            this.setState({
              dataChange: {
                isRefresh: true,
                isLoading: false,
                data: res.data.data.data
              }
            });
          })
          .catch(res => {
            if (loading) {
              Toast.hide();
            }
          });
      }
    );
  };

  onEndReached = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        let params = {
          refund_id: this.params.refund_id,
          page: this.state.page,
          limit: this.state.limit
        };
        http({
          url: "/consult.list",
          params
        }).then(res => {
          this.setState({
            dataChange: {
              isRefresh: false,
              isLoading: false,
              data: this.state.dataChange.data.concat(res.data.data.data)
            }
          });
        });
      }
    );
  };

  toMessageCenter = () => {
    if (this.params.store_id) {
      history.push(`/mycenter/message/detail?id=${this.params.store_id}`);
    }
  };

  render() {
    return (
      <div className="--orderNegotiatePage">
        <TopBar
          name="协商历史"
          style={{ background: "#ffffff" }}
          rightChild={
            <div style={{ display: "flex" }}>
              <div
                style={{
                  height: "0.45rem",
                  width: "0.5rem",
                  overflow: "hidden",
                  transform: "scale(0.8)",
                  position: "relative"
                }}
              >
                <img
                  src={icTel}
                  style={{
                    position: "absolute",
                    height: "0.2rem",
                    top: "0.05rem",
                    left: "0.1rem"
                  }}
                />
                <a
                  style={{
                    position: "absolute",
                    height: "0.45rem",
                    paddingTop: "0.12rem",
                    fontSize: "12px",
                    color: "#666",
                    webkitBackfaceVisibility: "visible"
                  }}
                  href={"tel:" + this.props.service_phone}
                >
                  联系平台
                </a>
              </div>
              <div
                style={{
                  width: "0.45rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: "scale(0.8)"
                }}
                onClick={() => {
                  this.toMessageCenter();
                }}
              >
                <img src={kefu_img} style={{ height: "0.2rem" }} />
                <div
                  style={{
                    fontSize: "10px",
                    marginTop: "0.05rem",
                    color: "#666",
                    height: "12px",
                    lineHeight: "12px"
                  }}
                >
                  客服
                </div>
              </div>
            </div>
          }
        />

        <MyListView
          loadCompleteMsg={this.state.dataChange.data.length == 0 ? "" : ""}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onDataChange={this.state.dataChange}
          separator={() => (
            <div
              style={{
                height: "1px",
                width: "100%",
                background: "#f5f6f8"
              }}
            />
          )}
          row={(rowData, sectionID, rowID) => {
            let obj = this.state.dataChange.data[rowID];
            return (
              <div className="messageGroup">
                <RoundImageView
                  src={obj.face}
                  style={{
                    width: "0.5rem",
                    height: "0.5rem",
                    marginLeft: "0.15rem",
                    marginRight: "0.1rem"
                  }}
                />
                <div className="content">
                  <div className="nameGroup">
                    <div className="name line-clamp-one">{obj.name}</div>
                    <div className="time">
                      {moment
                        .unix(obj.create_time)
                        .format("YYYY.MM.DD HH:mm:ss")}
                    </div>
                  </div>
                  <div className="explanation">{obj.explanation}</div>
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
