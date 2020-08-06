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

const tabs = [
  { title: "全部", key: -1 },
  { title: "未付款", key: 0 },
  { title: "未发货", key: 1 },
  { title: "未收货", key: 3 },
  { title: "已完成", key: 5 }
];
//status -> 订单状态1未发货2部分发货3全部发货4用户已收货5已完成6订单取消
//is_pay -> 是否已付款，0未付款1已付款
//cancel_type -> 取消类型，1用户取消2超时取消3全部退货
//"operation": 1, #操作状态 ,0未付款，1待发货，3待收货,4确认收货,5已完成,6已取消
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
      tabPage: 0,
      page: 1,
      limit: 10,
      status: -1,
      dataChange: {
        isRefresh: true,
        isLoading: false,
        data: []
      }
    };

    props.cacheLifecycles.didRecover(this.componentDidRecover);
  }

  componentWillMount() {
    this.params = qs.parse(window.location.search.split("?")[1]);
    let temp = this.params.index ? this.params.index : 0;
    let s = -1;
    switch (Number(temp)) {
      case 0:
        s = -1;
        break;
      case 1:
        s = 0;
        break;
      case 2:
        s = 1;
        break;
      case 3:
        s = 3;
        break;
      case 4:
        s = 5;
        break;
    }
    this.setState({
      tabPage: Number(temp),
      status: s
    });
  }

  componentDidRecover = () => {
    this.params = qs.parse(window.location.search.split("?")[1]);
    if (this.params.refresh) {
      this.setState(
        {
          tabPage: 0,
          status: -1
        },
        () => {
          this.onRefresh(true);
        }
      );
    }
  };

  onRefresh = (loading = false) => {
    this.setState(
      {
        page: 1
      },
      () => {
        let params = {
          page: this.state.page,
          limit: this.state.limit,
          status: this.state.status
        };
        if (loading) {
          Toast.loading("加载中", 0);
        }
        http({
          url: "/order.list",
          params
        })
          .then(res => {
            Toast.hide();
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
          limit: this.state.limit,
          status: this.state.status
        };
        http({
          url: "/order.list",
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

  onTabChange = (tab, index) => {
    this.setState(
      {
        tabPage: index,
        status: tab.key
      },
      () => {
        this.params.index = -1;
        this.onRefresh(true);
      }
    );
  };

  orderDetail = (item, e) => {
    history.push("/mycenter/order/detail/" + item.id);
  };

  orderExpress = (item, e) => {
    e.stopPropagation();
    history.push(`/mycenter/order/express?id=${item.id}`);
  };

  orderRefund = (item, e) => {
    e.stopPropagation();
    if (item.refund_id) {
      history.push(
        `/mycenter/order/refundlist/detail?id=${item.id}&refund_id=${item.refund_id}`
      );
    } else {
      history.push(
        `/mycenter/order/orderrefund?id=${item.id}&refund_id=${item.refund_id}`
      );
    }
  };

  orderConfirm = (item, e) => {
    e.stopPropagation();
    let data = {
      id: item.id
    };
    Modal.alert("提示", "是否确认收货？", [
      { text: "取消", onPress: () => {} },
      {
        text: "确认",
        onPress: () => {
          http({
            url: "/order.receipt",
            method: "post",
            data
          }).then(res => {
            this.onRefresh(true);
            Toast.success("收货成功！", 1);
          });
        }
      }
    ]);
  };

  remind = (item, e) => {
    e.stopPropagation();
    let data = {
      order_id: item.id
    };
    http({
      url: "/order.notice",
      method: "post",
      data
    }).then(res => {
      Toast.success("提醒发货成功！", 1);
    });
  };

  cancelOrder = (item, e) => {
    e.stopPropagation();
    history.push("/mycenter/order/ordercancel?id=" + item.id);
  };

  //"operation": 0未付款，1待发货，3待收货,4确认收货,5已完成,6已取消
  getOperationView(status, storeItem) {
    switch (status) {
      case 0: //
        return (
          <div className="buttonGroup">
            <div
              className="cancel"
              onClick={item => {
                this.cancelOrder(storeItem, item);
              }}
            >
              取消订单
            </div>
            <div
              className="pay"
              onClick={item => {
                this.orderDetail(storeItem, item);
              }}
            >
              去付款
            </div>
          </div>
        );
      case 1:
        return (
          <div className="buttonGroup">
            <div
              className="cancel"
              onClick={e => {
                this.orderRefund(storeItem, e);
              }}
            >
              申请退款
            </div>
            <div
              className="remind"
              onClick={e => {
                this.remind(storeItem, e);
              }}
            >
              提醒发货
            </div>
          </div>
        );
      case 3:
        return (
          <div className="buttonGroup">
            <div
              className="cancel"
              onClick={e => {
                this.orderExpress(storeItem, e);
              }}
            >
              查看物流
            </div>
            <div
              className="remind"
              onClick={e => {
                this.orderConfirm(storeItem, e);
              }}
            >
              确认收货
            </div>
          </div>
        );
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
    }
  }

  render() {
    let { tabPage } = this.state;
    return (
      <div className="--orderPage">
        <TopBar
          name="我的订单"
          // name={moment.unix(1564565018).format("YYYY-MM-DD HH:mm")}
          style={{ background: "#f5f6f8", flex: "none" }}
          onBack={() => {
            {
              if (this.params.isFromPayResult) {
                history.go(-5);
              } else {
                history.goBack();
              }
            }
          }}
        />
        <div style={{ height: "0.4rem", flex: "none" }}>
          <Tabs
            tabs={tabs}
            page={Number(tabPage)}
            onChange={this.onTabChange}
            tabDirection="horizontal"
            tabBarActiveTextColor="#2D343B"
            tabBarInactiveTextColor="#657281"
            tabBarTextStyle={{
              fontSize: "0.14rem"
            }}
            tabBarUnderlineStyle={{
              width: "3%",
              height: "0.02rem",
              marginLeft: "8.5%",
              marginBottom: "0.07rem"
            }}
            tabBarBackgroundColor="#f5f6f8"
          ></Tabs>
        </div>
        <MyListView
          loadCompleteMsg={
            this.state.dataChange.data.length == 0 ? "您还没有相关订单" : ""
          }
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onDataChange={this.state.dataChange}
          row={(rowData, sectionID, rowID) => {
            let obj = this.state.dataChange.data[rowID];
            return (
              <div
                className="cardParent"
                onClick={item => {
                  this.orderDetail(obj, item);
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
                    obj.goods.map(drug => (
                      <div key={drug.id} className="drugGroup">
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
                    ))}
                  {/**底部按钮**/}
                  <div className="bottomGroup">
                    <div>合计 ￥{parseFloat(obj.pay_money)}</div>
                    {this.getOperationView(obj.operation, obj)}
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
