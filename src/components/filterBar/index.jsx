import React from "react";
import up_arror from "../../assets/images/shang@3x.png";
import down_arror from "../../assets/images/xia1@3x.png";
import up_arror_select from "../../assets/images/shang2@3x.png";
import down_arror_select from "../../assets/images/xia2@3x.png";
import show_type_img_2 from "../../assets/images/jiuge@3x.png";
import show_type_img_1 from "../../assets/images/liebiao@3x.png";

import "./index.less";

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      showType,
      changeShowType,
      sort,
      changeSort,
      showCommendSelect,
      changeShowCommendSelect
    } = this.props;
    return (
      <div className="--filter-bar-component" style={{ ...this.props.style }}>
        <div
          className="commend"
          onClick={() => {
            changeShowCommendSelect(!showCommendSelect);
          }}
          style={{ color: [1, 2].indexOf(sort) !== -1 ? "#3776EC" : "#2D343B" }}
        >
          <span>推荐</span>
          <img
            src={[1, 2].indexOf(sort) !== -1 ? down_arror_select : down_arror}
            style={{ marginLeft: "0.05rem" }}
          />
        </div>
        <div
          style={{
            margin: "0 .6rem 0 .45rem",
            lineHeight: ".2rem",
            color: sort === 3 ? "#3776EC" : "#2D343B"
          }}
          onClick={() => {
            changeSort(3);
          }}
        >
          销量
        </div>
        <div
          className="price"
          style={{ color: [4, 5].indexOf(sort) !== -1 ? "#3776EC" : "#2D343B" }}
          onClick={() => {
            if ([4, 5].indexOf(sort) === -1) {
              changeSort(4);
            } else {
              changeSort(sort === 4 ? 5 : 4);
            }
          }}
        >
          <span>价格</span>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "0.05rem"
            }}
          >
            <img
              src={sort === 4 ? up_arror_select : up_arror}
              style={{ marginBottom: "0.02rem" }}
            />
            <img src={sort === 5 ? down_arror_select : down_arror} />
          </span>
        </div>

        <div
          style={{ position: "absolute", right: ".16rem" }}
          onClick={() => {
            changeShowType(showType === 1 ? 2 : 1);
            changeShowCommendSelect(false);
          }}
        >
          <img
            src={showType === 1 ? show_type_img_1 : show_type_img_2}
            style={{ width: ".2rem", height: ".2rem" }}
          />
        </div>

        {showCommendSelect && (
          <div className="commend-select">
            <div
              onClick={() => {
                changeSort(1);
              }}
              style={{ color: sort === 1 ? "#3776EC" : "#2D343B" }}
            >
              综合优先
            </div>
            <div
              onClick={() => {
                changeSort(2);
              }}
              style={{ color: sort === 2 ? "#3776EC" : "#2D343B" }}
            >
              新品推荐
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FilterBar;
