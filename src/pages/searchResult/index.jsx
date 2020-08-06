import React from "react";
import SEARCH_ICON from "@/assets/images/icon-sousuo.png";
import { withRouter } from "react-router-dom";
import qs from "qs";
import GoodsList from "@/components/goodsList";
import TopBar from "@/components/topBar";
import "./index.less";

@withRouter
class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
    };
    props.cacheLifecycles.didCache(this.componentDidCache);
    props.cacheLifecycles.didRecover(this.componentDidRecover);
  }

  componentDidMount() {
    const keyword = qs.parse(window.location.search.split("?")[1]).keyword;
    this.setState({ keyword });
  }

  //被缓存时生命周期
  componentDidCache() {}

  //被恢复时生命周期
  componentDidRecover = () => {
    const keyword = qs.parse(window.location.search.split("?")[1]).keyword;
    if (keyword !== this.state.keyword) {
      this.setState({ keyword });
    }
  };

  render() {
    const { history } = this.props;
    const { keyword } = this.state;
    return (
      <GoodsList className="--search-result-page" keyword={keyword}>
        <TopBar name="搜索" />
        <div className="top-bar">
          <div
            onClick={() => {
              history.replace(`/searchpage?search_hint=${keyword}`);
            }}
          >
            <img src={SEARCH_ICON} className="search-icon" />
            {keyword}
          </div>
          <span
            className="cancel"
            onClick={() => {
              this.setState({ keyword: "" });
            }}
          >
            取消
          </span>
        </div>
      </GoodsList>
    );
  }
}

export default SearchResult;
