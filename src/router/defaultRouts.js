import React, { lazy } from "react";
import Loadable from "react-loadable";
import AsyncLoadingComponent from "@/components/asynLoadingComponent";

import Login from "../pages/login";

export default [
  //个人中心
  {
    path: "/myCenter",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //消息中心
  {
    path: "/myCenter/message",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/message"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //系统通知
  {
    path: "/myCenter/message/notice",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/message/notice"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //订单确认
  {
    path: "/myCenter/order/orderConfirm/:idWithName",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/order/orderConfirm"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //订单支付
  {
    path: "/myCenter/order/pay/index",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/order/orderPay"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //订单支付结果
  {
    path: "/myCenter/order/pay/result",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/order/orderPay/result"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //订单取消
  {
    path: "/myCenter/order/orderCancel",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/order/orderCancel"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //申请退款页面
    path: "/myCenter/order/orderRefund",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/order/orderRefund"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //售后详情页面
    path: "/myCenter/order/refundList/detail",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/order/orderRefund/list/detail"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //售后订单协商
    path: "/myCenter/order/refundList/detail/negotiate",
    exact: true,
    component: Loadable({
      loader: () =>
        import("../pages/myCenter/order/orderRefund/list/detail/negotiate"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //物流详情页面
    path: "/myCenter/order/express",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/order/express"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //消息中心，聊天页面
    path: "/myCenter/message/detail",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/message/detail"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //订单详情
    path: "/myCenter/order/detail/:id",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/order/detail"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //购物车
    path: "/myCenter/cart",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/cart"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //搜索页
    path: "/searchPage",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/searchPage"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //商品详情
    path: "/goodsDetail/:goods_id",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/goodsDetail"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //帮助中心
    path: "/myCenter/helpCenter",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/helpCenter"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //我的收藏
    path: "/myCenter/myCollection",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/myCollection"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //用户信息
    path: "/myCenter/userInfo",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/userInfo"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //升级会员
    path: "/myvip",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/myVip"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //升级会员
    path: "/myvip/upgrade",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/myVip/upgrade"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //激活会员
    path: "/myvip/active",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/myVip/active"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //邀请列表
    path: "/myvip/invite",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/myVip/invite"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //添加地址
    path: "/addAddress",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/myAddress/addAddress"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //平台合作
    path: "/cooperation",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/cooperation"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },

  {
    //关于我们
    path: "/aboutUs",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/aboutUs"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //商家入驻
    path: "/applyOpenShop",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/applyOpenShop"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //
    path: "/applyOpenShop/commitment",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/applyOpenShop/commitment"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //
    path: "/applyOpenShop/agreement",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/applyOpenShop/agreement"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    path: "/applyOpenShop/result",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/applyOpenShop/success"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //选择入驻类型
    path: "/applyOpenShop/chooseShopType",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/applyOpenShop/chooseShopType"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    path: "/applyOpenShop/shopCertificate",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/applyOpenShop/shopCertificate"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //优惠券
    path: "/myCenter/myCoupon",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/myCoupon"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    //登录
    path: "/login",
    exact: true,
    component: Login
  },
  {
    //提现
    path: "/cashout",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/myWallet/cashout"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //钱包说明
  {
    path: "/walletexplain",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/myWallet/explain"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //提现记录
  {
    path: "/cashoutrecord",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/myWallet/cashoutRecord"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //提现账号
  {
    path: "/accountedit",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/myWallet/accountEdit"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //返佣详情
  {
    path: "/rakeback",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/myWallet/rakeback"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //店铺详情
  {
    path: "/store/detail",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/storeDetail"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  }
];
