import React from "react";

import { RoundTopBar } from "@/components/topBar";

import MyListView from "@/components/listView";
import StoreGoods from "./StoreGoods";
import history from "@/util/history";
import http from "@/util/http";
import * as actions from "@/store/actions/cart";
import * as orderActions from "@/store/actions/order";
import { Checkbox, Toast, Modal, PullToRefresh, ListView } from "antd-mobile";
import { connect } from "react-redux";
import "./index.less";
import Auth from "@/components/auth";
import moment from "moment";
import quanImg1 from "@/assets/images/quan@3x.png";
import quanImg2 from "@/assets/images/youhuiquan.png";
import { rem2px, setEvent } from "../../../util/methods";
import * as ReactDOM from "react-dom";
import { cartInfo } from "../../../store/actions/cart";
import _ from "lodash";
import GoodsSpecModalFromCart from "@/components/goodsSpecModal_Cart/index";

const HEIGHT = ["2.34rem", "3.44rem", "4.58rem"];

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
});

@connect(store => ({
  ...store.cart
}))
@Auth
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.limit = 10;
    this.data = [];
    this.state = {
      titleName: "购物车",
      selectAll: false,
      isEdit: false,
      flatList: [],
      totalPrice: 0,

      dataSource,
      couponListDialog: false,
      couponList: [],

      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight
    };
  }

  componentDidUpdate() {
    document.body.style.overflow = "hidden";
  }

  componentDidMount() {
    let offset = 1.04;
    const hei =
      this.state.height -
      ReactDOM.findDOMNode(this.lv).offsetTop -
      rem2px(offset);
    this.setState({
      height: hei
    });
    this.onRefresh();
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    this.page = 1;
    this.loadCart();
  };

  onEndReached = event => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }

    this.setState({ isLoading: true });
    this.page = this.page + 1;
    this.loadCart();
  };

  changeMode = () => {
    let { isEdit } = this.state;
    // isEdit = true 之前是编辑，点击之后变成完成
    if (isEdit) {
    } else {
    }
    this.setState({
      isEdit: !isEdit
    });
  };

  loadCart = () => {
    let params = {
      page: this.page,
      limit: this.limit
    };
    http({
      url: "/cart.list",
      params
    }).then(res => {
      if (params.page === 1) {
        this.data = res.data.data;
      } else {
        this.data = this.data.concat(res.data.data);
      }
      this.setState(
        {
          dataSource: this.state.dataSource.cloneWithRows(this.data),
          refreshing: false,
          isLoading: false
        },
        () => {
          let temp = [];
          this.data.map(store => {
            store.goods.map(drug => {
              temp.push(drug);
            });
          });
          this.setState({
            flatList: temp
          });
        }
      );
    });
  };

  selectAll = () => {
    const { selectAll } = this.state;
    if (selectAll) {
      this.props.dispatch(actions.selectAll(false));
    } else {
      this.props.dispatch(actions.selectAll(true));
    }
  };

  componentWillUnmount() {
    this.props.dispatch(actions.selectAll(false));
    this.props.dispatch(actions.selectList([]));
  }

  checkIfSelectAll = () => {
    let { flatList, selectAll } = this.state;
    let { selectList } = this.props;

    let total = 0;
    selectList.forEach((value, index) => {
      total = total + parseFloat(value.price) * parseInt(value.count);
      // + parseFloat(value.freight);
    });

    if (selectList.length == flatList.length) {
      if (!selectAll) {
        if (selectList.length != 0) {
          this.setState({
            selectAll: true
          });
        }
      }
    } else {
      if (selectAll) {
        this.setState({
          selectAll: false
        });
      }
    }

    if (this.state.totalPrice != total) {
      this.setState({
        totalPrice: total
      });
    }
  };

  caculTotal = () => {
    let { selectList } = this.props;

    let total = 0;
    selectList.forEach((value, index) => {
      total =
        total +
        parseFloat(value.price) * parseInt(value.count) +
        parseFloat(value.freight);
    });

    if (this.state.totalPrice != total) {
      this.setState({
        totalPrice: total
      });
    }
  };

  selectInvalid = () => {
    let hasInvalid = false;
    let { selectList } = this.props;
    selectList.forEach(item => {
      if (item.invalid == 1) {
        hasInvalid = true;
        return hasInvalid;
      }
    });
    return hasInvalid;
  };

  // 选中商品规格失效
  selectSpecInvalid = () => {
    let hasInvalid = false;
    let { selectList } = this.props;
    selectList.forEach(item => {
      if (item.is_specification_invalid == 1) {
        hasInvalid = true;
        return hasInvalid;
      }
    });
    return hasInvalid;
  };

  countNone = () => {
    let countNone = false;
    let { selectList } = this.props;
    selectList.forEach(item => {
      if (item.onhand < item.count) {
        countNone = true;
        return countNone;
      }
    });
    return countNone;
  };

  onCollect = () => {
    if (this.selectInvalid()) {
      Toast.show("失效的商品无法移至收藏！", 1);
      return;
    }
    let array = this.props.selectList.map(item => item.goods_id);
    if (array.length == 0) {
      Toast.show("未选中商品！", 1);
      return;
    }
    let data = {
      ids: array,
      type: 1
    };
    http({
      url: "/user.collection.add",
      // url: "/user.collection.delete",
      method: "post",
      data
    }).then(res => {
      Toast.show("收藏成功！", 1);
      this.props.dispatch(actions.selectList([]));
      this.setState({
        isEdit: false
      });
    });
  };

  prePay = () => {
    if (this.selectInvalid()) {
      Toast.fail("商品已失效!", 1);
      return;
    }
    if (this.selectSpecInvalid()) {
      Toast.fail("商品规格已失效!", 1);
      return;
    }
    if (this.countNone()) {
      Toast.fail("库存不足!", 1);
      return;
    }
    let array = this.props.selectList.map(item => item.id);

    if (array.length == 0) {
      Toast.fail("请选择商品!", 1);
    } else {
      this.toPay(array.join(","));
    }
  };

  toPay = ids => {
    if (this.selectInvalid()) {
      Toast.show("失效的商品无法结算！", 1);
      return;
    }

    this.props.dispatch(orderActions.setNewOrder());
    setEvent("购物车", "提交订单按钮", `商品ids=${ids}`);
    history.push("/mycenter/order/orderconfirm/demandids_" + ids);
  };

  removeAll = () => {
    let array = this.props.selectList.map(item => item.id);
    let data = {
      ids: array.join(",")
    };
    http({
      url: "/cart.delete",
      method: "post",
      data
    }).then(res => {
      window.location.reload();
    });
    this.props.dispatch(cartInfo());
  };

  onCouponClick = storeItem => {
    let array = storeItem.goods.map(item => item.goods_id);
    let params = {
      store_id: storeItem.store_id,
      goods_ids: array.join(",")
    };
    http({
      url: "/coupon.get",
      params
    }).then(res => {
      if (!res.data.data || res.data.data.length == 0) {
        Toast.show("暂无优惠券！", 1);
      } else {
        this.setState({
          couponListDialog: true,
          couponList: res.data.data
        });
      }
    });
  };

  addCoupon = id => {
    http({
      url: "/coupon.add",
      params: { id }
    }).then(res => {
      Toast.info("优惠券领取成功");
      this.setState({
        couponListDialog: false
      });
    });
  };

  closeCoupon = () => {
    this.setState({
      couponListDialog: false
    });
  };

  /**
   * 显示产品规格弹框
   * @param goods_id  修改的 goods_id
   * @param origin_product_id  原来选择的规格 id
   */
  showGoodsSpec(goods_id, origin_product_id) {
    http({
      url: "/goods.get",
      params: { goods_id }
    }).then(res => {
      const goodsDetail = res.data.data;
      this.setState({
        goodsDetail,
        origin_product_id,
        store_id: goodsDetail.store_id
      });
      if (goodsDetail.is_specification === 1) {
        this.isShowGoodsSpec = true;
        // 如果该产品 还是多规格
        this.specModal.onShow();
      } else {
        // 如果 只是普通产品，则添加新的产品到购物车
        // 把之前的origin_product_id 给到后端，让其删除
        http({
          url: "/cart.add",
          data: {
            goods_id: goodsDetail.goods_id,
            count: 1,
            product_id: 0,
            origin_product_id: origin_product_id
          },
          method: "post"
        }).then(res => {
          Toast.info("更新成功", 1, false);

          this.updateChangeSpec();
        });
      }
    });
  }

  // 切换某个产品，只刷新当前的产品信息
  updateChangeSpec = () => {
    const selectStoreId = this.state.store_id;
    // 找到选中的 store 的排序index
    const index = this.data.findIndex(
      store => store.store_id === selectStoreId
    );
    // 只刷新当前页面的数据
    this.tempPage = Math.floor(index / this.limit) + 1;

    let params = {
      page: this.tempPage,
      limit: this.limit
    };

    http({
      url: "/cart.list",
      params
    }).then(res => {
      // 替换掉修改规格的列表数据
      this.data.splice(
        (this.tempPage - 1) * this.limit,
        this.limit,
        ...res.data.data
      );

      this.setState(
        {
          dataSource: this.state.dataSource.cloneWithRows(
            _.cloneDeep(this.data)
          ),
          refreshing: false,
          isLoading: false
        },
        () => {
          let temp = [];
          this.data.map(store => {
            store.goods.map(drug => {
              temp.push(drug);
            });
          });
          this.setState({
            flatList: temp
          });
        }
      );
    });
  };

  render() {
    let {
      isEdit,
      selectAll,
      couponList,
      couponListDialog,
      flatList
    } = this.state;
    let separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: "#F5F5F9",
          height: 5
        }}
      />
    );

    this.checkIfSelectAll();
    return (
      <div className="--cartPage">
        <RoundTopBar
          name={this.state.titleName}
          rightButton={isEdit ? "完成" : "编辑"}
          onRightClick={() => {
            this.changeMode();
          }}
        />
        <div style={{ marginTop: "0.1rem" }} />

        <ListView
          key={"1"}
          ref={el => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => {
            let storeItem = this.data[rowID];
            return (
              <StoreGoods
                onCouponClick={this.onCouponClick}
                onCountChange={this.caculTotal}
                sectionID={sectionID}
                rowID={rowID}
                storeItem={storeItem}
                onChangeSpec={(goods_id, product_id) =>
                  this.showGoodsSpec(goods_id, product_id)
                }
              />
            );
          }}
          renderSeparator={separator}
          useBodyScroll={false}
          style={{
            height: this.state.height
          }}
          pullToRefresh={
            <PullToRefresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          onEndReached={this.onEndReached}
          pageSize={5}
        />

        {flatList.length == 0 && (
          <div
            style={{
              top: "2rem",
              textAlign: "center",
              whiteSpace: "pre-line",
              width: "100%",
              height: "1rem",
              position: "absolute"
            }}
          >{`购物车竟然是空的
再忙，也记得买点什么犒赏下自己`}</div>
        )}

        <div className="bottomCard">
          <Checkbox
            style={{ marginLeft: "0.15rem" }}
            onChange={this.selectAll.bind(this)}
            checked={selectAll}
          >
            全选
          </Checkbox>
          <div className="auto" />

          {isEdit && (
            <div
              className="collect"
              onClick={() => {
                this.onCollect();
              }}
            >
              移至收藏
            </div>
          )}
          {isEdit && (
            <div className="delete" onClick={this.removeAll.bind(this)}>
              删除
            </div>
          )}

          {!isEdit && <div style={{ marginRight: "0.1rem" }}>合计:</div>}
          {!isEdit && (
            <div className="priceGroup">
              <div className="pricePrefix">￥</div>
              <div>{parseFloat(this.state.totalPrice.toFixed(2))}</div>
            </div>
          )}
          {!isEdit && (
            <div
              className="pay"
              onClick={() => {
                this.prePay();
              }}
            >
              去结算
            </div>
          )}
        </div>
        <Modal
          popup
          visible={couponListDialog}
          onClose={this.closeCoupon}
          animationType="slide-up"
          className="--coupon-modal"
        >
          <div
            className="modal-content"
            style={{
              height:
                couponList.length <= 3
                  ? HEIGHT[couponList.length - 1]
                  : "5.5rem"
            }}
          >
            <div className="title">领取优惠券</div>
            <div className="coupons">
              {couponList.map(item => (
                <div
                  className="coupon-item"
                  key={item.id}
                  style={{
                    backgroundImage:
                      item.is_has > 0 ? `url(${quanImg2})` : `url(${quanImg1})`
                  }}
                >
                  <div>
                    <div>
                      <span style={{ fontSize: ".16rem" }}>￥</span>
                      <span
                        style={{ fontSize: ".24rem", marginRight: ".06rem" }}
                      >
                        {Number(item.money)}
                      </span>
                      <span>优惠券</span>
                    </div>
                    <div>
                      {Number(item.reach_money)
                        ? `满${Number(item.reach_money)}`
                        : "无门槛"}
                      使用
                    </div>

                    {item.period === 1 ? (
                      <div style={{ fontSize: ".12rem", marginTop: ".02rem" }}>
                        {moment.unix(item.start_time).format("YYYY-MM-DD")}
                        &nbsp;-&nbsp;
                        {moment.unix(item.end_time).format("YYYY-MM-DD")}
                      </div>
                    ) : (
                      <div style={{ fontSize: ".12rem", marginTop: ".02rem" }}>
                        {moment().format("YYYY-MM-DD")}
                        &nbsp;-&nbsp;
                        {moment()
                          .add(item.expiry_day, "days")
                          .format("YYYY-MM-DD")}
                      </div>
                    )}
                  </div>
                  <div
                    style={{ color: "#FF8816" }}
                    onClick={() => {
                      // if (item.limit === 0 || item.is_has < item.limit) {
                      //   this.addCoupon(item.id);
                      // }
                      this.addCoupon(item.id);
                    }}
                  >
                    {/* {item.limit === 0 || item.is_has < item.limit
                      ? "立即领取"
                      : "已领取"} */}
                    立即领取
                  </div>
                </div>
              ))}
            </div>
            <div onClick={this.closeCoupon} className="button">
              完成
            </div>
          </div>
        </Modal>

        {/* 选择规格 */}
        <GoodsSpecModalFromCart
          ref={specModal => (this.specModal = specModal)}
          specData={this.state.goodsDetail && this.state.goodsDetail.product}
          origin_product_id={this.state.origin_product_id}
          store_id={this.state.store_id}
          name={this.state.goodsDetail && this.state.goodsDetail.name}
          confirmSpec={this.updateChangeSpec}
        />
      </div>
    );
  }
}

export default Index;
