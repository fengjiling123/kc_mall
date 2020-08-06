import React from "react";
import TopBar from "../../components/topBar";
import { Carousel } from "antd-mobile";
import right_arror from "@/assets/images/you1@3x.png";
import kefu_img from "@/assets/images/kefu@3x.png";
import shoucang_img from "../../assets/images/shoucang@3x.png";
import shoucang_img_1 from "../../assets/images/shoucang1@3x.png";
import EquityTagsModal from "./equityTagsModal";
import CouponModal from "./couponModal";
import StoreHotGoods from "./storeHotGoods";
import CountDown from "@/components/countDown";
import http from "@/util/http";
import { Toast } from "antd-mobile";
import cart_img from "@/assets/images/gouwuche.png";
import * as orderActions from "@/store/actions/order";
import "./index.less";
import { connect } from "react-redux";
import { setEvent } from "../../util/methods";
import { cartInfo } from "../../store/actions/cart";
import add_to_cart_icon from "../../assets/images/icon-xiangqingye-jiarugouwuche.png";
import BackToHome from "@/components/backToHome";
import ShareModal from "../../components/shareModal";
import ShareGoodsImg from "./shareGoodsImg";
import back_icon from "../../assets/images/icon-chanpinxiangqingye-fanhui-kedianji.png";
import cart_icon from "../../assets/images/icon-chanpinxiangqingye-gouwuche-kedianji.png";
import { setCookie, getCookie } from "@/util/methods";
import xiangqing_arror from "../../assets/images/xiangqing-arror-icon.png";
import youhuiquan_bj from "../../assets/images/youhuiquan-bj.png";
import { getShareUrl, share } from "../../util/share";

import isWeixin from "@/util/tools";
import qs from "qs";
import GoodsSpecModalFromDetail from "@/components/goodsSpecModal_Detail/index";

@connect(state => ({}))
class GoodsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsDetail: null,
      currentImgIndex: 1,
      showEquityTagsModal: false,
      couponList: [],
      showCouponModal: false,
      now_time: parseInt(new Date().getTime() / 1000),
      countInfo: {},
      doCollect: false,
      showShareModal: false,
      showShareGoods: false,
      showTopbar: false,
      userInfo: {},
      showSpecModal: false // 选择规格弹框
    };
  }

  componentDidMount() {
    this.getCountInfo();
    this.getUserInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ currentImgIndex: 1 });
      this.getGoodsDetail();
    }
  }

  componentWillUnmount() {
    this.clearInterval();
    Toast.hide();
  }

  getUserInfo() {
    http({
      url: "/self.get"
    }).then(res => {
      this.setState({ userInfo: res.data.data });
    });
  }

  //获取商品详情
  getGoodsDetail = () => {
    const goods_id = window.location.pathname.split("/")[2];
    this.clearInterval();
    http({
      url: "/goods.get",
      params: { goods_id },
      loading: true
    }).then(res => {
      const goodsDetail = res.data.data;
      if (isWeixin) {
        let title = goodsDetail ? goodsDetail.name : ""; // 分享标题
        let desc = goodsDetail ? `${goodsDetail.price}元` : ""; // 分享标题
        let logo = goodsDetail
          ? goodsDetail.cover
          : // : "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2Fshare_logo.png";
            "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fshare_logo.png?";
        share(title, desc, getShareUrl(false), logo);
      }

      this.setState({ goodsDetail }, () => {
        this.getCouponList();
      });

      if (goodsDetail.activity === 2) {
        this.goodsDetailTimer = setInterval(() => {
          let now_time = parseInt(new Date().getTime() / 1000);
          this.setState({ now_time });
          if (goodsDetail.end_time < now_time) {
            this.clearInterval();
          }
        }, 1000);
      }
    });
  };

  //添加到购物车
  addToCart = e => {
    const { goodsDetail } = this.state;
    // if (goodsDetail.is_specification === 0) {
    //   // 如果没有规格，直接加入购物车
    //   let inviter_id = getCookie("inviter_id");
    //   let data = {
    //     goods_id: this.state.goodsDetail.id,
    //     count: 1,
    //     product_id: 0
    //   };
    //   if (inviter_id) data.inviter_id = inviter_id;
    //   http({
    //     url: "/cart.add",
    //     data,
    //     method: "post"
    //   }).then(res => {
    //     setEvent(
    //       "商品详情页",
    //       "加入购物车",
    //       `商品id=${this.state.goodsDetail.id}`
    //     );
    //     Toast.info("添加成功", 1);
    //     setTimeout(() => {
    //       this.getCountInfo("add");
    //       this.props.dispatch(cartInfo());
    //     }, 1000);
    //   });
    // } else {
    //   // 弹出选择规格弹框
    //   this.specModal.onShow("cart");
    // }
     // 弹出选择规格弹框
     this.specModal.onShow("cart");
  };

  //获取购物车商品数量
  getCountInfo = add => {
    http({
      url: "/order.count",
      method: "get"
    }).then(res => {
      if (res.data.data) this.setState({ countInfo: res.data.data });
      if (add) {
        // Toast.info("添加成功", 1);
      } else {
        this.getGoodsDetail();
      }
    });
  };

  //获取店铺优惠券
  getCouponList = () => {
    const { goodsDetail } = this.state;
    http({
      url: "/coupon.get",
      params: { goods_ids: goodsDetail.id, store_id: goodsDetail.store_id }
    }).then(res => {
      this.setState({ couponList: res.data.data });
    });
  };

  //移除定时器
  clearInterval = () => {
    if (this.goodsDetailTimer) {
      clearInterval(this.goodsDetailTimer);
      this.goodsDetailTimer = false;
    }
  };

  toMessage = goodsDetail => {
    this.props.history.push(
      `/mycenter/message/detail?id=${goodsDetail.store_id}&&goods_id=${goodsDetail.id}`
    );
  };

  //收藏、取消收藏商品
  collectionGoods = () => {
    const { goodsDetail, doCollect } = this.state;
    if (doCollect) return;
    let url = "/user.collection.add";
    let method = "post";
    let info = "收藏成功";
    if (goodsDetail.is_collection === 1) {
      url = "/user.collection.delete";
      method = "delete";
      info = "已取消收藏";
    }
    this.setState({ doCollect: true });
    http({
      url,
      data: { type: 1, ids: [goodsDetail.id] },
      method
    })
      .then(res => {
        if (goodsDetail.is_collection === 1) {
          setEvent("商品详情页", "取消收藏", `商品id=${goodsDetail.id}`);
        } else {
          setEvent("商品详情页", "收藏", `商品id=${goodsDetail.id}`);
        }
        goodsDetail.is_collection = goodsDetail.is_collection === 1 ? 0 : 1;
        this.setState({ goodsDetail, doCollect: false });
        Toast.info(info, 1);
      })
      .catch(err => {
        this.setState({ doCollect: false });
      });
  };

  showShareImgModal = showShareGoods => {
    this.setState({ showShareGoods });
  };

  //检查滚动高度
  onScrollHandle = () => {
    const scrollTop = this.scrollRef.scrollTop;
    if (scrollTop >= (3.3 * document.documentElement.clientWidth) / 3.75) {
      this.setState({ showTopbar: true });
    } else {
      this.setState({ showTopbar: false });
    }
  };

  render() {
    if (!this.state.goodsDetail) {
      return null;
    }
    const {
      goodsDetail,
      currentImgIndex,
      showEquityTagsModal,
      showCouponModal,
      couponList,
      now_time,
      countInfo,
      showShareModal,
      showShareGoods,
      showTopbar,
      userInfo
    } = this.state;
    const { history } = this.props;
    let is_secondkill =
      goodsDetail &&
      goodsDetail.activity === 2 &&
      goodsDetail.activity_info &&
      goodsDetail.activity_info.start_time <= now_time &&
      goodsDetail.activity_info.end_time > now_time
        ? true
        : false;
    let secondkill_not_start =
      goodsDetail &&
      goodsDetail.activity === 2 &&
      goodsDetail.activity_info &&
      goodsDetail.activity_info.start_time > now_time
        ? true
        : false;

    //商品下架、新人专享商品、秒杀商品不能加入购物车
    const canAddToCart =
      goodsDetail &&
      (goodsDetail.is_open !== 1 ||
        goodsDetail.activity === 4 ||
        is_secondkill ||
        secondkill_not_start)
        ? false
        : true;

    //返佣金额
    let has_brokerage_money =
      goodsDetail && Number(goodsDetail.brokerage_money) !== 0 ? true : false;

    let params = qs.parse(window.location.search.split("?")[1]);

    return (
      <div className="--goods-detail-component">
        {showTopbar ? (
          <div className="goods-detail-top-bar">
            <TopBar
              name="商品详情"
              rightTitle={
                <div className="cart-icon">
                  <img src={cart_img} />
                  {countInfo.cart_count > 0 && (
                    <span className="cart-number">
                      {countInfo.cart_count > 99 ? "99+" : countInfo.cart_count}
                    </span>
                  )}
                </div>
              }
              onRightClick={() => {
                history.push("/mycenter/cart");
              }}
              onBack={() => {
                if (params.from) {
                  history.replace("/");
                } else {
                  history.goBack();
                }
              }}
            />
          </div>
        ) : (
          <div className="operation-icon">
            <img
              src={back_icon}
              onClick={() => {
                let params = qs.parse(window.location.search.split("?")[1]);
                if (params.from) {
                  history.replace("/");
                } else {
                  history.goBack();
                }
              }}
            />
            <img
              src={cart_icon}
              onClick={() => {
                history.push("/mycenter/cart");
              }}
            />
            {countInfo.cart_count > 0 && (
              <span
                className="cart-number"
                onClick={() => {
                  history.push("/mycenter/cart");
                }}
              >
                {countInfo.cart_count > 99 ? "99+" : countInfo.cart_count}
              </span>
            )}
          </div>
        )}
        <BackToHome />
        {goodsDetail && (
          <div
            className="scroll-view"
            id="goods-detail-scroll-view"
            onScrollCapture={() => this.onScrollHandle()}
            ref={c => {
              this.scrollRef = c;
            }}
          >
            {/* 商品轮播图 */}
            <div className="goods_banner">
              <Carousel
                autoplay={false}
                infinite
                selectedIndex={currentImgIndex - 1}
                dots={false}
                afterChange={currentImgIndex => {
                  this.setState({ currentImgIndex: currentImgIndex + 1 });
                }}
              >
                {goodsDetail.images.map((url, index) => (
                  <div key={index} className="banner-img-container">
                    <img src={url} />
                  </div>
                ))}
              </Carousel>

              <div className="count_tag">
                {currentImgIndex}/{goodsDetail.images.length}
              </div>
            </div>

            {/* 价格活动 */}
            <div className="price-activity">
              <div className="left">
                {/* 新人专享活动显示新人专享标签 */}
                {goodsDetail.activity === 4 && (
                  <div className="tag">新人专享</div>
                )}

                {/* 秒杀时间内显示秒杀标签 */}
                {is_secondkill && <div className="tag">秒杀</div>}

                {/* 新人专享或秒杀时间内显示活动价格 */}
                <div className="price">
                  ￥
                  <span>
                    {(goodsDetail.activity === 4 &&
                      goodsDetail.activity_info) ||
                    is_secondkill
                      ? parseFloat(goodsDetail.activity_info.price)
                      : parseFloat(goodsDetail.price)}
                  </span>
                </div>

                {/* 除秒杀未开始外显示划掉的原价 */}
                {!secondkill_not_start && (
                  <div className="old-price">
                    {parseFloat(goodsDetail.market_price)}
                  </div>
                )}

                {/* 满减活动显示满减标签 */}
                {goodsDetail.activity === 3 && (
                  <div className="tag-border">
                    满
                    {Number(
                      goodsDetail.activity_info &&
                        goodsDetail.activity_info.reach_money
                    )}
                    减
                    {Number(
                      goodsDetail.activity_info &&
                        goodsDetail.activity_info.reduce_money
                    )}
                  </div>
                )}

                {/* 新人专享或秒杀活动商品不显示是否包邮 */}
                {goodsDetail.activity !== 4 &&
                !is_secondkill &&
                !secondkill_not_start &&
                Number(goodsDetail.freight) === 0 ? (
                  <div className="tag-border">包邮</div>
                ) : null}
              </div>

              {/* 秒杀时间内显示活动结束倒计时 */}
              {is_secondkill && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: ".1rem", fontSize: ".12rem" }}>
                    距结束
                  </span>
                  <CountDown time={goodsDetail.activity_info.end_time} />
                </div>
              )}
            </div>

            {/* 秒杀未开始显示秒杀价和活动开始倒计时*/}
            {secondkill_not_start && (
              <div className="spike-activity">
                <div className="price">
                  <span>秒杀价</span>
                  <span>￥{parseFloat(goodsDetail.activity_info.price)}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: ".1rem", fontSize: ".12rem" }}>
                    距开始
                  </span>
                  <CountDown
                    time={goodsDetail.activity_info.start_time}
                    background="#657281"
                  />
                </div>
              </div>
            )}

            {/* 商品名称 */}
            <div className="goods_name">{goodsDetail.name}</div>
            {/* 商品简介 */}
            <div
              style={{
                padding: "0 0.16rem .1rem",
                background: "#fff",
                marginBottom: ".05rem",
                lineHeight: ".2rem"
              }}
            >
              <span className="line-clamp-one ">{goodsDetail.description}</span>
              {Number(goodsDetail.freight) > 0 && (
                <div
                  style={{
                    color: "#A1ADB9",
                    marginTop: goodsDetail.description ? ".1rem" : 0,
                    fontSize: ".12rem"
                  }}
                >
                  配送费：￥{parseFloat(goodsDetail.freight)}
                </div>
              )}
            </div>

            {/* 优惠券 */}
            {couponList && couponList.length > 0 && (
              <div
                className="coupon"
                onClick={() => {
                  setEvent("商品详情页", "领券");
                  this.setState({ showCouponModal: true });
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#A1ADB9",
                      marginRight: ".16rem",
                      fontSize: ".13rem"
                    }}
                  >
                    领券
                  </div>
                  {couponList.map(item => (
                    <span
                      key={item.id}
                      style={{
                        position: "relative"
                      }}
                    >
                      <img
                        src={youhuiquan_bj}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          left: 0,
                          top: 0
                        }}
                      />
                      <span style={{ position: "relative" }}>
                        {Number(item.reach_money)
                          ? `满${Number(item.reach_money)}`
                          : "无门槛"}
                        减{Number(item.money)}
                      </span>
                    </span>
                  ))}
                </div>
                <div>
                  <img src={xiangqing_arror} />
                </div>
              </div>
            )}

            {/* 权益标签 */}
            <div
              className="equity-tags"
              onClick={() => {
                this.setState({ showEquityTagsModal: true });
              }}
            >
              <div className="line-clamp-one">
                <span>服务</span>
                {goodsDetail.is_quality_guarantee ? (
                  <span>正品保证</span>
                ) : null}
                {goodsDetail.is_fast_delivery ? <span>极速发货</span> : null}
                {goodsDetail.is_privacy_distribution ? (
                  <span>隐私配送</span>
                ) : null}
                <span>
                  {goodsDetail.is_gratuitous_refund
                    ? "7天无理由退换"
                    : "不支持7天无理由退换"}
                </span>
              </div>
              <img src={xiangqing_arror} />
            </div>

            {/* 本店热销 */}
            {goodsDetail && goodsDetail.store_id && (
              <StoreHotGoods store_id={goodsDetail.store_id} />
            )}

            {/* 商品详情 */}
            <div className="goods-detail">
              <div className="title">
                <span>商品详情</span>
              </div>
              <div className="content">
                <div
                  dangerouslySetInnerHTML={{ __html: goodsDetail.content }}
                />
              </div>
            </div>

            {/* 价格说明 */}
            <div className="price-introduction">
              <div className="title" style={{ marginBottom: ".12rem" }}>
                价格说明
              </div>
              <div className="conetnt">
                <span className="title">划线价格：</span>
                <span>
                  商品展示的划线价或参考价可能是品牌专柜价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在考拉上曾经展示过的销售价；由于地区、时间的差异性和市场行情的波动，品牌专柜标价、商品吊牌价等
                  可能会与您购物时展示的不一致，该价格仅供您参考。
                </span>
              </div>
              <div className="conetnt">
                <span className="title">非划线价格：</span>
                <span>
                  指商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化最终以订单结算页价格为准。
                </span>
              </div>
              <div className="conetnt">
                <span className="title">价格异常：</span>
                <span>
                  因可能存在系统缓存、页面更新延迟等不确定性情况，导致价格显示异常，商品具体售价请以订单结算页价格为准。如您发现异常情况出现，请立即联系我们补正，以便您能顺利购物。
                </span>
              </div>
            </div>
          </div>
        )}

        {goodsDetail && (
          <div className="opeartion-footer">
            {has_brokerage_money ? (
              <div
                className="member-icon"
                style={{ marginRight: ".1rem" }}
                onClick={() => {
                  this.toMessage(goodsDetail);
                }}
              >
                <img src={kefu_img} />
                <div>客服</div>
              </div>
            ) : (
              <div
                onClick={() => {
                  this.toMessage(goodsDetail);
                }}
              >
                <img src={kefu_img} /> 客服
              </div>
            )}

            {has_brokerage_money ? (
              <div onClick={this.collectionGoods} className="member-icon">
                <img
                  src={
                    goodsDetail.is_collection === 1
                      ? shoucang_img_1
                      : shoucang_img
                  }
                />
                <div>收藏</div>
              </div>
            ) : (
              <div onClick={this.collectionGoods}>
                <img
                  src={
                    goodsDetail.is_collection === 1
                      ? shoucang_img_1
                      : shoucang_img
                  }
                />
                收藏
              </div>
            )}

            {has_brokerage_money && (
              <div onClick={this.addToCart} className="member-icon">
                <img src={add_to_cart_icon} />
                <div>加入购物车</div>
              </div>
            )}

            {has_brokerage_money ? (
              <div className="member-buttons">
                {goodsDetail.is_open ? (
                  goodsDetail.onhand === 0 ? (
                    <div className="disabled">
                      <div>库存</div>
                      <div>不足</div>
                    </div>
                  ) : (
                    <div
                      onClick={e => {
                        setEvent(
                          "商品详情页",
                          "立即购买",
                          `商品id=${goodsDetail.id}`
                        );
                        this.props.dispatch(orderActions.setNewOrder());
                        // if (goodsDetail.is_specification === 0) {
                        //   // 如果没有规格
                        //   this.props.history.push(
                        //     `/mycenter/order/orderconfirm/goodsid_${goodsDetail.id}?count=1&product_id=0`
                        //   );
                        // } else {
                        //   this.specModal.onShow("buy");
                        // }
                        this.specModal.onShow("buy");
                      }}
                    >
                      <div>购买</div>
                      <div>返{Number(goodsDetail.brokerage_money)}元</div>
                    </div>
                  )
                ) : (
                  <div className="disabled">
                    <div>商品</div>
                    <div>已下架</div>
                  </div>
                )}
                <div
                  onClick={() => {
                    this.setState({ showShareModal: true });
                  }}
                >
                  <div>分享</div>
                  <div>赚{Number(goodsDetail.brokerage_money)}元</div>
                </div>
              </div>
            ) : (
              <div className="buttons">
                <div
                  style={{
                    background: canAddToCart ? "#FFB516" : "#A1ADB9",
                    borderRight: canAddToCart ? "none" : "1px solid #fff"
                  }}
                  onClick={canAddToCart && this.addToCart}
                >
                  加入购物车
                </div>
                <div
                  style={{
                    background: goodsDetail.is_open
                      ? goodsDetail.onhand === 0
                        ? "#A1ADB9"
                        : "#FF8816"
                      : "#A1ADB9"
                  }}
                  onClick={e => {
                    if (goodsDetail.is_open && goodsDetail.onhand) {
                      setEvent(
                        "商品详情页",
                        "立即购买",
                        `商品id=${goodsDetail.id}`
                      );
                      this.props.dispatch(orderActions.setNewOrder());
                      // if (goodsDetail.is_specification === 0) {
                      //   // 如果没有规格
                      //   this.props.history.push(
                      //     `/mycenter/order/orderconfirm/goodsid_${goodsDetail.id}?count=1&product_id=0`
                      //   );
                      // } else {
                      //   this.specModal.onShow("buy");
                      // }
                      this.specModal.onShow("buy");
                    }
                  }}
                >
                  {goodsDetail.is_open
                    ? goodsDetail.onhand === 0
                      ? "库存不足"
                      : "立即购买"
                    : "商品已下架"}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 权益标签弹窗 */}
        {showEquityTagsModal && (
          <EquityTagsModal
            goodsDetail={goodsDetail}
            onClose={() => {
              this.setState({ showEquityTagsModal: false });
            }}
          />
        )}

        {/* 领取优惠券弹窗 */}
        {showCouponModal && (
          <CouponModal
            couponList={couponList}
            onClose={() => {
              this.setState({ showCouponModal: false });
            }}
            getCouponList={this.getCouponList}
          />
        )}

        {/* 分享弹窗 */}
        {showShareModal && (
          <ShareModal
            shareHomePage={false}
            showShareImgModal={this.showShareImgModal}
            onClose={() => {
              this.setState({ showShareModal: false });
            }}
          />
        )}

        {/* 商品分享图片 */}
        {goodsDetail && showShareGoods && (
          <ShareGoodsImg
            userInfo={userInfo}
            goods={goodsDetail}
            showShareImgModal={this.showShareImgModal}
          />
        )}

        {/* 选择规格 */}
        <GoodsSpecModalFromDetail
            ref={specModal => (this.specModal = specModal)}
            specData={this.state.goodsDetail.product}
            name={this.state.goodsDetail.name}
            good={this.state.goodsDetail}
          />
      </div>
    );
  }
}

export default GoodsDetail;
