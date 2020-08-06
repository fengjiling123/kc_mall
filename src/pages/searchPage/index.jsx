import React from "react";
import back from "@/assets/images/ic_back.png";
import DelSearchHistoryModal from "./delSearchHistoryModal";
import { SearchBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import qs from "qs";
import http from "@/util/http";
import * as actions from "@/store/actions/cache";
import "./index.less";
import { setEvent } from "../../util/methods";
import TopBar from "@/components/topBar";

@withRouter
@connect(state => ({
  ...state.cache
}))
class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotSearch: [],
      search_hint: "",
      showDelModal: false,
      keyword: ""
    };
  }

  componentDidMount() {
    this.setState({
      search_hint: qs.parse(window.location.search.split("?")[1]).search_hint
    });
    this.autoFocusInst.focus();
    this.getHotSearch();
    this.props.dispatch(actions.getCache("searchList"));
  }

  getHotSearch() {
    http({
      url: "/keyword.get"
    }).then(res => {
      this.setState({
        hotSearch: res.data.data.hot_search
          ? res.data.data.hot_search.split(",")
          : []
        // search_hint: res.data.data.search_hint
      });
    });
  }

  // 键盘落下页面被撑起来不回去
  inputFocus = () => {
    window.scroll(0, 0);
  };

  doSearch = () => {
    const { searchList, history, dispatch } = this.props;
    const { keyword, search_hint } = this.state;
    //缓存搜索记录
    if (searchList) {
      !searchList.find(i => i === keyword) &&
        keyword &&
        dispatch(
          actions.setCache({
            searchList: [keyword, ...searchList].slice(0, 5)
          })
        );
    } else {
      keyword && dispatch(actions.setCache({ searchList: [keyword] }));
    }

    if (!keyword && search_hint) {
      if (searchList) {
        !searchList.find(i => i === search_hint) &&
          dispatch(
            actions.setCache({
              searchList: [search_hint, ...searchList].slice(0, 5)
            })
          );
      } else {
        dispatch(actions.setCache({ searchList: [search_hint] }));
      }
    }

    setEvent("搜索页", "用户自主搜索关键词");
    this.keywordClick(keyword || search_hint, 2);
    history.replace(`/searchresult?keyword=${keyword || search_hint}`);
  };

  //记录用户搜索的关键词
  keywordClick = (keyword, type) => {
    //type 1:运营配置的热搜词，2用户主动搜索的词
    const data = { keyword, type };
    http({
      url: "/keyword.click",
      data,
      method: "post"
    }).then(res => {});
  };

  componentWillUnmount() {
    if (document.getElementsByTagName("input")[0]) {
      document.getElementsByTagName("input")[0].blur();
    }
  }

  render() {
    const { hotSearch, showDelModal, search_hint } = this.state;
    const { history, searchList } = this.props;
    return (
      <div className="--search-page">
        <TopBar name="搜索" />
        <div className="search-bar">
          {/* <img
            src={back}
            className="back"
            style={{ height: ".18.5rem", width: ".1rem" }}
            onClick={this.props.history.goBack}
          /> */}
          <SearchBar
            className="search-inp"
            placeholder={search_hint}
            ref={ref => (this.autoFocusInst = ref)}
            // autoFocus
            onChange={keyword => {
              this.setState({ keyword });
            }}
            onSubmit={() => {
              this.doSearch();
            }}
            onBlur={this.inputFocus}
            onFocus={this.inputFocus}
          />
          <span style={{ color: "#657281" }} onClick={this.doSearch}>
            搜索
          </span>
        </div>
        <div className="scroll-view">
          {/* 热门搜索 */}
          {hotSearch && hotSearch.length > 0 && (
            <div>
              <div className="title">热门搜索</div>
              <div className="tags">
                {hotSearch.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setEvent("搜索页", "平台默认搜索关键词");
                      this.keywordClick(item, 1);
                      history.replace(`/searchresult?keyword=${item}`);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 搜索历史 */}
          {searchList && searchList.length > 0 && (
            <div>
              <div className="title">
                历史记录
                <i
                  onClick={() => {
                    this.setState({ showDelModal: true });
                  }}
                  className="iconfont iconshanchu"
                  style={{
                    color: "#657281",
                    fontSize: ".15rem",
                    float: "right"
                  }}
                />
              </div>
              <div className="tags">
                {searchList.slice(0, 10).map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setEvent("搜索页", "用户自主搜索关键词");
                      this.keywordClick(item, 2);
                      history.replace(`/searchresult?keyword=${item}`);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {showDelModal && (
          <DelSearchHistoryModal
            onClose={() => {
              this.setState({ showDelModal: false });
            }}
          />
        )}
      </div>
    );
  }
}

export default SearchPage;
