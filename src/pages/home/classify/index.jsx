import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classifyImg1 from "../../../assets/images/jiating@3x.png";
import allClassify from "../../../assets/images/quanbu@3x.png";
import * as actions from "@/store/actions/classify";
import "./index.less";
import { setEvent } from "../../../util/methods";

@withRouter
@connect(state => ({
  ...state.classify
}))
class HomeClassify extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(actions.getClassify({ id: -1 }));
  }

  render() {
    const { history, classifyList } = this.props;
    if (classifyList.length === 0) {
      return null;
    }
    return (
      <div className="--home-classify">
        {classifyList.slice(0, 9).map(item => (
          <div
            key={item.id}
            onClick={() => {
              setEvent("首页", `icon分类`, item.name);
              history.push(`/classifygoodslist?category_id=${item.id}`);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="img-container">
              <img src={item.image} />
            </div>
            <div className="line-clamp-one text" style={{ padding: "0 .1rem" }}>
              {item.name}
            </div>
          </div>
        ))}
        <div
          onClick={() => {
            setEvent("首页", `icon分类`, "全部分类");
            history.push(`classifypage`);
          }}
        >
          <div className="img-container">
            <img src={allClassify} />
          </div>

          <div className="text">全部分类</div>
        </div>
      </div>
    );
  }
}

export default HomeClassify;
