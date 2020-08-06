import React from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import routes from "./defaultRouts";
import activityRoutes from "./activityRoutes";
import cacheRoutes from "./cacheRoutes";
import { statistics } from "../util/statistics";
import history from "../util/history";

//404
import page_404 from "../pages/error";
import { shareHomePage } from "../util/share";

import isWeixin from "@/util/tools";

export default () => {
  const pathname = window.location.pathname.toLowerCase();
  if (isWeixin) {
    shareHomePage();
    console.log('shareHomePage');
  }

  statistics();
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Router history={history}>
        <CacheSwitch>
          {cacheRoutes.map(item => (
            <CacheRoute key={item.path} {...item} />
          ))}
        </CacheSwitch>
      </Router>
      <Router history={history}>
        <Switch>
          {activityRoutes.map(item => (
            <Route key={item.path} {...item} />
          ))}
          {routes.map(item => (
            <Route key={item.path} {...item} />
          ))}
          {/* <Route path="/404" component={page_404} /> */}
          {cacheRoutes.find(
            item => item.path.toLowerCase() === pathname
          ) ? null : (
            <Redirect to="/invalidpage" />
          )}
        </Switch>
      </Router>
    </div>
  );
};
