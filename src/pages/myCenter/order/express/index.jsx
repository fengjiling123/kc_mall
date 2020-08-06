import React from "react";
import history from "@/util/history";
import http from "@/util/http";
import TopBar from "@/components/topBar";
import ImageView from "@/components/imageView";
import MyListView from "@/components/listView";
import storeRight from "@/assets/images/ic_order_store_right.png";
import "./index.less";
import { ListView, PullToRefresh, Tabs } from "antd-mobile";
import qs from "qs";
import * as classnames from "classnames";

class Index extends React.Component {
  state = {
    data: {},
    express_query: []
  };

  componentDidMount() {
    this.params = qs.parse(window.location.search.split("?")[1]);
    let params = {
      order_id: this.params.id
    };
    http({
      url: "/order.logistics",
      params,
      loading: true
    }).then(res => {
      let result = res.data.data;
      this.setState({
        express_query: result.express_query,
        data: result
      });
    });
  }

  render() {
    let { data, express_query } = this.state;
    return (
      <div className="--expressPage">
        <TopBar name="物流详情" style={{ background: "#ffffff" }} />
        <div className="topLay">
          {/*<ImageView*/}
            {/*src={data.icon}*/}
            {/*style={{*/}
              {/*width: "0.24rem",*/}
              {/*height: "0.24rem",*/}
              {/*borderRadius: "0.1rem"*/}
            {/*}}*/}
          {/*/>*/}
          <div className="name">{data.name}</div>
          <div>|</div>
          <div className="number">{data.number}</div>
        </div>
        <div className="express">
          {express_query.map((item, index) => (
            <div className="expressItem">
              <div
                className={classnames({
                  round: true,
                  active: index == 0
                })}
              />

              <div
                className={classnames({
                  content: true,
                  active: index == 0
                })}
              >
                {item.content}
              </div>
              <div
                className={classnames({
                  time: true,
                  active: index == 0
                })}
              >
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Index;
