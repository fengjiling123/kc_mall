import React from "react";
import history from "@/util/history";
import http from "@/util/http";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";
import MyListView from "@/components/listView";
import storeRight from "@/assets/images/ic_order_store_right.png";
import * as actions from "@/store/actions/message";
import "./index.less";
import { ListView, PullToRefresh, Tabs, Toast, Modal } from "antd-mobile";
import moment from "moment";
import Auth from "@/components/auth";
import { connect } from "react-redux";
import qs from "qs";

const STORE_STATUS = [
  "未付款",
  "等待卖家发货",
  "",
  "卖家已发货",
  "交易完成",
  "交易完成",
  "已取消"
];

@connect(state => ({
  ...state.message
}))
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

  onRefresh = (loading = false) => {
    this.setState(
      {
        page: 1
      },
      () => {
        let params = {
          page: this.state.page,
          limit: this.state.limit
        };
        if (loading) {
          Toast.loading("加载中", 0);
        }
        http({
          url: "/refund.list",
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
          page: this.state.page,
          limit: this.state.limit
        };
        http({
          url: "/refund.list",
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

  refundDetail = (item, e) => {
    history.push(
      `/mycenter/order/refundlist/detail?id=${item.order_id}&refund_id=${item.id}`
    );
  };

  getStatusText = storeItem => {
    let text = "";
    switch (storeItem.type) {
      case 1: //仅退款
        text = "仅退款";
        break;
      case 2: //仅退货
        text = "仅退货";
        break;
      case 3: //退货退款
        text = "退货退款";
        break;
    }
    switch (storeItem.status) {
      case 1: //待审核
        text = "售后申请中";
        break;
      case 5: //成功
        text = text + "，退款成功";
        break;
      case 6: //商家拒绝
        text = text + "，退款关闭";
        break;
    }
    return text;
  };

  render() {
    return (
      <div className="--orderRefundListPage">
        <TopBar
          name="售后订单"
          style={{ background: "#f5f6f8", flex: "none" }}
        />
        <MyListView
          loadCompleteMsg={this.state.dataChange.data.length == 0 ? "" : ""}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onDataChange={this.state.dataChange}
          row={(rowData, sectionID, rowID) => {
            let obj = this.state.dataChange.data[rowID];
            return (
              <div
                className="cardParent"
                onClick={item => {
                  this.refundDetail(obj, item);
                }}
              >
                <div
                  key={`${this.state.status}-${rowID}`}
                  className="orderCard"
                >
                  {/**药店**/}
                  <div className="storeGroup">
                    <div className="store">
                      <div className="storeName">{obj.store_name}</div>
                      <ImageView
                        src={storeRight}
                        style={{ width: "0.07rem", height: "0.1rem" }}
                      />
                    </div>
                    <div className="storeStatus">
                      {STORE_STATUS[obj.operation]}
                    </div>
                  </div>
                  {/**药品**/}
                  {obj.goods &&
                    obj.goods.map((drug, index) => (
                      <div key={drug.id} className="refundGroup">
                        <div className="drugGroup">
                          <ImageView
                            src={drug.image}
                            style={{
                              width: "0.8rem",
                              height: "0.8rem",
                              flex: "none"
                            }}
                          />
                          <div className="drugContent">
                            <div>{drug.name}</div>
                            <div>
                              <span>
                                {drug.product_id != 0 ? (
                                  <span className="drug-spec">
                                    {drug.attributes.join(" ")}
                                  </span>
                                ) : null}
                              </span>
                            </div>
                            <div className="amountGroup">
                              <div className="priceGroup">
                                <div className="pricePrefix">￥</div>
                                <div>{parseFloat(drug.money)}</div>
                              </div>
                              <div>x{drug.count}</div>
                            </div>
                          </div>
                        </div>

                        {index === obj.goods.length - 1 ? (
                          <div>
                            <div className="line" />
                            <div className="refundBottom">
                              <div className="status">
                                {this.getStatusText(obj)}
                              </div>
                              <div className="text">查看详情</div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
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
