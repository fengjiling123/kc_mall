import React from "react";
import history from "@/util/history";
import "./index.less";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import chart_img from "@/assets/images/liuyan@3x.png";
import search_img from "@/assets/images/cha@3x.png";
import order_img from "@/assets/images/dingdan@3x.png";
import touxiang from "@/assets/images/touxiang.png";
import http from "@/util/http";
import { setEvent } from "../../../util/methods";

@withRouter
@connect(state => ({
  face: state.login.face
}))
class SearchHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_hint: ""
    };
  }

  componentDidMount() {
    this.getHotSearch();
  }

  //获取搜索词
  getHotSearch() {
    http({
      url: "/keyword.get"
    }).then(res => {
      this.setState({
        search_hint: res.data.data.search_hint
      });
    });
  }

  render() {
    const { countInfo, face } = this.props;
    const { search_hint } = this.state;
    return (
      <div className="--home-header-info">
        {/* 搜索 */}
        <div
          className="search"
          onClick={() => {
            setEvent("首页", "搜索框");
            this.props.history.push(`/searchpage?search_hint=${search_hint}`);
          }}
        >
          <img src={search_img} />
          <span>{search_hint}</span>
        </div>
        {/* 消息 */}
        <div
          style={{ position: "relative" }}
          onClick={() => {
            setEvent("首页", `右上角消息`);
            history.push("/mycenter/message");
          }}
        >
          <img src={chart_img} style={{ height: ".2rem" }} />
          {countInfo.message_count > 0 && (
            <div className="info-tag">
              {countInfo.message_count > 99 ? "99+" : countInfo.message_count}
            </div>
          )}
        </div>

      </div>
    );
  }
}

export default SearchHeader;
