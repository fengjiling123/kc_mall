import React, { lazy } from "react";
import Loadable from "react-loadable";
import AsyncLoadingComponent from "@/components/asynLoadingComponent";

export default [
  {
    path: "/activity/20190801",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/temp/20190801"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    path: "/activity/normal",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/temp/normalActivity"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  },
  {
    path: "/activity/preview",
    exact: true,
    component: Loadable({
      loader: () => import("../pages/temp/normalActivity/preview.js"),
      loading: AsyncLoadingComponent,
      delay: 300
    })
  }
];
