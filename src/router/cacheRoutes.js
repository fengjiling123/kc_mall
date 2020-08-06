import React, { lazy } from "react";

import Loadable from "react-loadable";
import AsyncLoadingComponent from "../components/asynLoadingComponent";

export default [
  //首页
  {
    path: "/",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/home"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //搜索结果
  {
    path: "/searchResult",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/searchResult"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //分类页面
  {
    path: "/classifyPage",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/classifyPage"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //分类商品列表
  {
    path: "/classifyGoodsList",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/classifyGoodsList"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //店铺主页
  {
    path: "/store",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/storeGoodsList"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  // 新人频道
  {
    path: "/newcomerChannel",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/newcomerChannel"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  // 秒杀专区
  {
    path: "/flashSale",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/flashSale"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  // 满减活动列表
  {
    path: "/reduction",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/reductionGoodsList"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //收获地址
  {
    path: "/myAddress",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/myAddress"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },

  //订单列表
  {
    path: "/myCenter/order",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/order"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    path: "/myCenter/order/refundList",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/order/orderRefund/list"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //企业入驻申请提交
  {
    path: "/applyOpenShop/company",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/applyOpenShop/company"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //优惠券列表
  {
    path: "/couponGoodsList",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/couponGoodsList"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //我的钱包
  {
    path: "/wallet",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/myCenter/myWallet/wallet"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //商品失效、活动已下架、不是新人承载页面
  {
    path: "/invalidpage",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/invalidPage"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  //优惠券详情
  {
    path: "/coupondetail",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/couponDetail"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  }
];
