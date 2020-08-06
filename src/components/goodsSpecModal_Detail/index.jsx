import React, { Component } from "react";
import { Modal, List, Button, Icon, Stepper, Toast } from "antd-mobile";
import { getCookie } from "@/util/methods";
import classnames from "classnames";
import history from "@/util/history.js";
import http from "@/util/http";
import ImageViewerWx from "@/components/imageViewerWx";
import "./index.less";

class GoodsSpecModal extends Component {
  state = {
    isShow: false,
    specSelected: {},
    to: "cart" // 从哪里来（购物车，立即购买）
  };

  // 默认添加购买数量
  num = 1;

  componentWillReceiveProps(props) {
    if (props.specData&&props.specData[0]) {
     
      this.setState({ specSelected: props.specData[0] });
    }
  }

  componentWillUnmount() {
    Toast.hide();
  }
  // 显示规格弹框 type : cart 添加购物车 , buy 立即购买
  onShow = type => {
    //e.preventDefault(); // 修复 Android 上点击穿透

    this.setState({
      isShow: true,
      to: type
    });
  };
  // 关闭规格弹框
  onClose = key => () => {
    this.setState({
      isShow: false
    });
  };

  onCountChange = num => {
    const { specSelected } = this.state;
    const { onhand } = specSelected;
    if (num > onhand) {
      // 超过库存
      this.num = onhand;
    }
    this.num = num;
  };

  // 确认
  confirm() {
    const { to, specSelected } = this.state;
    const { onhand } = specSelected;
    const { specData,good } = this.props;
    if ((specData&&specData.length>0)&&(!specSelected.goods_id || !specSelected.onhand)) {
      // 如果没有选择规格
      Toast.info("请选择有效规格", 1, false);
      return;
    }
    // if (this.num > onhand) {
    //   // 超过库存
    //   Toast.info("超过库存", 1);
    //   return;
    // }

    if (to === "cart") {
      // 添加购物车
      let inviter_id = getCookie("inviter_id");
      let data = {
      };
      if(specData&&specData.length>0) {
        data.goods_id = specSelected.goods_id;
        data.count = this.num;
        data.product_id = specSelected.id;
      } else {
        data.goods_id = good.goods_id;
        data.count = this.num;
        data.product_id = 0;
      }
      

      if (inviter_id) data.inviter_id = inviter_id;

      http({
        url: "/cart.add",
        data,
        method: "post"
      }).then(res => {
        Toast.info("添加成功", 1, false);
      });
    }

    if (to === "buy") {
      // 立即购买
      if(specData&&specData.length>0) {
        history.push(
          `/mycenter/order/orderconfirm/goodsid_${specSelected.goods_id}?count=${this.num}&product_id=${specSelected.id}`
        );
      } else {
        history.push(
          `/mycenter/order/orderconfirm/goodsid_${good.goods_id}?count=${this.num}&product_id=0`
        );
      }
      
    }

    // 关闭规格弹框
    this.onClose()();
  }
  // 键盘落下页面被撑起来不回去
  inputFocus = () => {
    window.scroll(0, 0);
  };

  render() {
    const { isShow, specSelected } = this.state;
    const { specData, name,good } = this.props;

    if (!specData) return null;

    const imgs = this.props.specData.map(i => i.image);
    const selectIndex = imgs.findIndex(i => i === specSelected.image);

    return (
      <div>
        <Modal
          popup
          // visible={this.state.showSpecModal}
          visible={isShow}
          onClose={this.onClose()}
          animationType="slide-up"
          afterClose={() => {
            // alert("afterClose");
          }}
          wrapClassName="goods-spec-modal"
        >
          <List className="popup-list goods-detail-spec-modal">
            <div className={specSelected.price?"main":"mainNoSpec"}>
              <div className="goods-info">
                <div style={{ flexBasis: "1rem" }}>
                  <img
                    src={specSelected.image?specSelected.image:good.cover}
                    alt=""
                    onClick={() => {
                      this.setState({ isShow: false });
                      this.imageView.openViewer(selectIndex);
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between"
                  }}
                >
                  <span className="goods-spec-price">
                    ￥
                    <span style={{ fontSize: "0.18rem" }}>
                      {specSelected.price?specSelected.price:good.price}
                    </span>
                  </span>
                  <span style={{ textAlign: "left" }}>{name}</span>
                  <span style={{ fontSize: "0.12rem" }}>
                    库存：{specSelected.price?specSelected.onhand:good.onhand}
                  </span>
                </div>
                <Icon type="cross" size="lg" onClick={this.onClose()} />
              </div>
              {specData&&specData.length>0?<div className="spec-list">
                <p className="tip-title">选择规格</p>

                <ol className="spec-item-wrapper clearfix">
                  {specData.length > 0 &&
                    specData.map(spec => (
                      <li
                        className={classnames("spec-item fl", {
                          selected:
                            specSelected.value_ids === spec.value_ids &&
                            spec.onhand !== 0,
                          disabled: spec.onhand === 0
                        })}
                        key={spec.value_ids}
                        onClick={() => {
                          if (spec.onhand === 0) {
                            return;
                          }
                          this.setState({ specSelected: spec });
                        }}
                      >
                        {spec.standard}
                      </li>
                    ))}
                </ol>
              </div>:null}

              <div className="buy-num-section">
                <p className="tip-title">购买数量</p>
                <div className="num">
                  <Stepper
                    style={{
                      height: "0.2rem",
                      lineHeight: "0.2rem",
                      width: "0.75rem",
                      minWidth: "0.75rem"
                    }}
                    showNumber
                    max={specSelected.price?specSelected.onhand:good.onhand}
                    min={1}
                    step={1}
                    onBlur={this.inputFocus}
                    onFocus={this.inputFocus}
                    defaultValue={1}
                    disabled={false}
                    onChange={item => {
                      this.onCountChange(item);
                    }}
                  />
                </div>
              </div>
            </div>
            <List.Item>
              <Button
                className="confirm-btn"
                type="primary"
                onClick={() => this.confirm()}
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#FFB516",
                  border: 0
                }}
              >
                确认
              </Button>
            </List.Item>
          </List>
        </Modal>
        <ImageViewerWx
          ref={imageView => (this.imageView = imageView)}
          urls={imgs}
          onClose={() => this.setState({ isShow: true })}
        />
      </div>
    );
  }
}

export default GoodsSpecModal;
