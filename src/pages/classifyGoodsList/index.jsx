import React from "react";
import back from "@/assets/images/ic_back.png";
import GoodsList from "@/components/goodsList";
import top_arror from "@/assets/images/shang@3x.png";
import bottom_arror from "@/assets/images/xia1@3x.png";
import search_img from "@/assets/images/cha@3x.png";
import qs from "qs";
import http from "@/util/http";
import "./index.less";

class ClassifyGoodsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllList: false,
      classifyList: [],
      activeClassify: "",
      search_hint: ""
    };
  }

  componentDidMount() {
    this.getClassifyList();
    this.getHotSearch();
  }

  getClassifyList = () => {
    const id = qs.parse(window.location.search.split("?")[1]).category_id;
    http({
      url: "/category.list",
      params: { id }
    }).then(res => {
      this.setState({
        classifyList: res.data.data ? res.data.data[0].down : []
      });
    });
  };

  changeActiveClassify = (activeClassify, index) => {
    this.setState({ activeClassify, showAllList: false });
    if (activeClassify) {
      const { classifyList } = this.state;
      const active = classifyList[index];
      classifyList.splice(index, 1);
      classifyList.unshift(active);
      this.setState({ classifyList });
    }
  };

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
    const { history } = this.props;
    const {
      classifyList,
      showAllList,
      activeClassify,
      search_hint
    } = this.state;
    return (
      <GoodsList
        className="--classify-goods-list-page"
        category_id={activeClassify}
      >
        <div
          className="top-bar"
          style={{ marginBottom: showAllList ? ".38rem" : "" }}
        >
          <img src={back} className="back" onClick={history.goBack} />
          {/* 搜索 */}
          <div
            className="search"
            onClick={() => {
              this.props.history.push(`/searchpage?search_hint=${search_hint}`);
            }}
          >
            <img src={search_img} />
            <span>{search_hint}</span>
          </div>
        </div>
        <div />

        {/* 二级分类 */}
        {classifyList && classifyList.length > 0 && (
          <div className={`classify ${showAllList ? "show-all" : ""}`}>
            <div className="list">
              <div
                className={activeClassify ? "" : "active"}
                onClick={() => {
                  this.changeActiveClassify("");
                }}
              >
                全部
              </div>
              {classifyList.map((item, index) => (
                <div
                  key={item.id}
                  className={
                    activeClassify === item.id
                      ? "line-clamp-one active"
                      : "line-clamp-one"
                  }
                  onClick={() => {
                    this.changeActiveClassify(item.id, index);
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
            <img
              src={showAllList ? top_arror : bottom_arror}
              onClick={() => {
                this.setState({ showAllList: !showAllList });
              }}
            />
          </div>
        )}

        {showAllList && <div className="mask" />}
      </GoodsList>
    );
  }
}

export default ClassifyGoodsList;
