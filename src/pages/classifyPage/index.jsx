import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TopBar from "@/components/topBar";
import right_arror from "@/assets/images/you1@3x.png";
import * as actions from "@/store/actions/classify";
import Scroll from "react-bscroll";
import "./index.less";

@withRouter
@connect(state => ({
  ...state.classify
}))
class ClassifyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(actions.getClassify({ id: -1 }));
  }

  leftClick = activeClassify => {
    this.props.dispatch(actions.changeActivityClassify(activeClassify));
    let rightEle = document.getElementById("right_" + activeClassify);
    let leftEle = document.getElementById("left_" + activeClassify);
    this.rightScrollEle.getScrollObj().scrollToElement(rightEle, 200);
    this.LeftScrollEle.getScrollObj().scrollToElement(leftEle, 200, true, -120);
  };

  render() {
    const { history, classifyList, activeClassify } = this.props;
    return (
      <div className="--classify-page">
        <TopBar name="商品分类" />
        <div className="scroll-view">
          {/* 左侧分类 */}

          <Scroll
            ref={e => (this.LeftScrollEle = e)}
            click={true}
            scrollbar={false}
          >
            <div className="left">
              {classifyList.map(item => (
                <div
                  key={item.id}
                  className={`line-clamp-one ${
                    activeClassify === item.id ? "active" : ""
                  }`}
                  id={`${"left_" + item.id}`}
                  onClick={() => {
                    this.leftClick(item.id);
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </Scroll>

          {/* 右侧分类 */}
          <Scroll
            ref={e => (this.rightScrollEle = e)}
            click={true}
            scrollbar={false}
            doScroll={({ y }) => {
              let divs = document.getElementsByClassName("right_div");
              for (let i = 0; i < divs.length; i++) {
                let top =
                  divs[i].offsetTop - document.documentElement.scrollTop;
                if (top + y < 5 && top + y > -5) {
                  let leftEle = document.getElementById(
                    "left_" + classifyList[i].id
                  );
                  this.LeftScrollEle.getScrollObj().scrollToElement(
                    leftEle,
                    200,
                    true,
                    -120
                  );
                  this.props.dispatch(
                    actions.changeActivityClassify(classifyList[i].id)
                  );
                  continue;
                }
              }
            }}
          >
            <div
              className="right"
              ref={e => {
                this.right = e;
              }}
            >
              {classifyList.map(item => (
                <div
                  key={item.id}
                  id={`${"right_" + item.id}`}
                  className="right_div"
                >
                  <div
                    className="classify-title"
                    onClick={() => {
                      history.push(`/classifyGoodsList?category_id=${item.id}`);
                    }}
                  >
                    <div
                      className="line-clamp-one"
                      style={{ fontWeight: "bold" }}
                    >
                      {item.name}
                    </div>
                    <div>
                      查看全部
                      <img src={right_arror} className="right-arror" />
                    </div>
                  </div>
                  {item.down && item.down.length > 0 && (
                    <div className="childs">
                      {item.down.map((child, index) => (
                        <div
                          className="child-item"
                          style={{
                            marginBottom:
                              index > item.down.length - 3 ? "0" : ".2rem"
                          }}
                          key={child.id}
                          onClick={() => {
                            history.push(
                              `/classifyGoodsList?category_id=${child.id}`
                            );
                          }}
                        >
                          <div className="classify-img">
                            <img src={child.image} alt="" />
                          </div>
                          <div className="line-clamp-one">{child.name}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Scroll>
        </div>
      </div>
    );
  }
}

export default ClassifyPage;
