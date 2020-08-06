import React from "react";
import { RoundTopBar } from "@/components/topBar";
import ImageView from "@/components/imageView";
import MyListView from "@/components/listView";
import history from "@/util/history";
import http from "@/util/http";
import * as actions from "@/store/actions/cart";
import { Checkbox, Modal, Stepper, Toast } from "antd-mobile";
import { connect } from "react-redux";
import storeRight from "@/assets/images/ic_order_store_right.png";
import * as classnames from "classnames";
import * as _ from "lodash";
import "./index.less";
import { getCookie } from "../../../../util/methods";

/** 购物车 商店 **/
@connect(store => ({
  ...store.cart
}))
class StoreGoods extends React.Component {
  state = {
    selectAll: false,
    current: 1
  };

  selectAll = currentIsSelectAll => {
    let { selectList, storeItem } = this.props;

    if (!currentIsSelectAll) {
      // -> 全选
      let temp = [];
      storeItem.goods.map(item => {
        if (selectList.find(i => i.goods_id === item.goods_id) === undefined) {
          temp.push(item);
        }
      });
      this.props.dispatch(actions.selectList(selectList.concat(temp)));
      this.setState({ selectAll: true });
    } else {
      // -> 取消全选
      storeItem.goods.map(item => {
        _.remove(selectList, i => i.goods_id === item.goods_id);
      });
      this.props.dispatch(actions.selectList(selectList.slice(0)));
      this.setState({ selectAll: false });
    }
  };

  changeSelectList = item => {
    let { selectList } = this.props;
    let { goods } = this.props.storeItem;

    if (selectList.find(i => i.id === item.id)) {
      _.remove(selectList, i => i.id === item.id);
    } else {
      selectList.push(item);
    }

    let hasAll = true;
    goods.map(drug => {
      if (hasAll) {
        hasAll = selectList.find(i => i.id === drug.id) !== undefined;
      }
    });

    this.setState({ selectAll: hasAll });

    this.props.dispatch(actions.selectList(selectList.slice(0)));
  };

  checkIfSelectAll() {
    let { current } = this.state;
    let { selectAll, version } = this.props;
    if (current != version) {
      this.setState(
        {
          current: version
        },
        () => {
          //来自父组件的全选或者取消
          let { selectList, storeItem } = this.props;
          if (selectAll) {
            //要全选
            let temp = [];
            storeItem.goods.map(item => {
              if (
                selectList.find(i => i.goods_id === item.goods_id) === undefined
              ) {
                temp.push(item);
              }
            });
            this.props.dispatch(actions.selectListAdd(temp));
            this.setState({ selectAll: true });
          } else {
            this.props.dispatch(actions.selectList([]));
            this.setState({ selectAll: false });
          }
        }
      );
    } else {
      let { selectList, storeItem } = this.props;
      //要全选
      let temp = [];
      storeItem.goods.map(item => {
        if (selectList.find(i => i.goods_id === item.goods_id) !== undefined) {
          temp.push(item);
        }
      });
      if (temp.length == 0 && this.state.selectAll) {
        this.setState({
          selectAll: false
        });
      }
    }
  }

  onCountChange = (drug, item) => {
    if (drug.count === item) return;
    let count = 0;
    if (item === "") {
      count = 0 - drug.count;
    } else {
      console.log(item);
      count = item - drug.count;
    }

    let inviter_id = getCookie("inviter_id");

    let data = {
      goods_id: drug.goods_id,
      count,
      product_id: drug.product_id
    };

    if (inviter_id) data.inviter_id = inviter_id;

    http({
      url: "/cart.add",
      data,
      method: "post"
    }).then(res => {
      drug.count = item;
      if (this.props.onCountChange) {
        this.props.onCountChange();
      }
      // Toast.result("添加成功");
    });
  };

  componentWillUnmount() {
    if (this.alertInstance) {
      this.alertInstance.close();
    }
  }

  toDetail = drug => {
    history.push(`/goodsdetail/${drug.goods_id}`);
  };

  loadCoupon = storeItem => {
    if (this.props.onCouponClick) {
      this.props.onCouponClick(storeItem);
    }
  };

  inputFocus = () => {
    window.scroll(0, 0);
  };

  render() {
    let { sectionID, rowID, storeItem, selectList } = this.props;
    let { selectAll } = this.state;
    this.checkIfSelectAll();

    return (
      <div key={`${sectionID}-${rowID}`} className="cardParent">
        <div className="orderCard">
          <div className="orderRight">
            {/**药店**/}
            <div className="storeGroup">
              <div className="store">
                <Checkbox
                  onChange={this.selectAll.bind(this, selectAll)}
                  checked={selectAll}
                />
                <div className="storeName">{storeItem.store_name}</div>
                <ImageView
                  src={storeRight}
                  style={{ width: "0.07rem", height: "0.1rem" }}
                />
                <div style={{ flex: "auto" }} />

                {storeItem.is_coupon == 1 && (
                  <div
                    style={{ paddingLeft: "0.1rem", paddingRight: "0.1rem" }}
                    onClick={() => {
                      this.loadCoupon(storeItem);
                    }}
                  >
                    领券
                  </div>
                )}
              </div>
            </div>
            {/**药品**/}
            {storeItem.goods &&
              storeItem.goods.map(drug => (
                <div
                  key={`${sectionID}-${rowID}-${drug.id}`}
                  className="drugGroup"
                  // onTouchStart={this.onItemTouchStart.bind(this, drug)}
                  // onTouchEnd={this.onItemTouchEnd.bind(this, drug)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "0.1rem"
                    }}
                  >
                    <Checkbox
                      onChange={this.changeSelectList.bind(this, drug)}
                      checked={
                        selectList.find(item => item.id == drug.id) !==
                        undefined
                      }
                    />
                  </div>

                  <div
                    className="storeImageGroup"
                    onClick={() => {
                      this.toDetail(drug);
                    }}
                  >
                    <ImageView
                      src={drug.cover}
                      style={{
                        position: "absolute",
                        width: "0.8rem",
                        height: "0.8rem",
                        flex: "none"
                      }}
                    />
                    {drug.invalid == 1 && (
                      <div className="expireText">已失效</div>
                    )}
                    {drug.is_specification_invalid === 1 && (
                      <div className="specification-invalid">
                        <p style={{ transform: "scale(0.8)" }}>规格失效</p>
                      </div>
                    )}
                  </div>
                  <div className="drugContent">
                    <div
                      className={classnames({
                        drugName: true,
                        expire: drug.invalid
                      })}
                      onClick={() => {
                        this.toDetail(drug);
                      }}
                    >
                      {drug.name}
                    </div>

                    <div>
                      {/* 当产品失效时 */}
                      {drug.is_specification_invalid === 1 && (
                        <div
                          onClick={() =>
                            this.props.onChangeSpec(
                              drug.goods_id,
                              drug.product_id
                            )
                          }
                        >
                          <span className="drug-spec">请重新选择规格</span>
                        </div>
                      )}

                      {/* 当产品有效 */}
                      {drug.is_specification_invalid === 0 && (
                        <div
                          onClick={() => {
                            if (drug.is_specification === 1) {
                              // 当产品是多规格
                              this.props.onChangeSpec(
                                drug.goods_id,
                                drug.product_id
                              );
                            }
                          }}
                        >
                          {/* 当前是多规格*/}
                          {drug.is_specification === 1 ? (
                            <span className="drug-spec">
                              {drug.attributes.join(" ")}
                            </span>
                          ) : null}
                        </div>
                      )}

                      <div className="amountGroup">
                        <div className="priceGroup">
                          <div className="pricePrefix">￥</div>
                          <div>{parseFloat(drug.price)}</div>
                        </div>

                        <div className="stepper">
                          <Stepper
                            style={{
                              height: "0.16rem",
                              lineHeight: "0.16rem",
                              width: "0.75rem",
                              minWidth: "0.75rem"
                            }}
                            showNumber
                            max={drug.onhand}
                            min={1}
                            step={1}
                            onBlur={this.inputFocus}
                            onFocus={this.inputFocus}
                            defaultValue={drug.count}
                            disabled={
                              drug.invalid || drug.is_specification_invalid
                            }
                            onChange={item => {
                              this.onCountChange(drug, item);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default StoreGoods;
