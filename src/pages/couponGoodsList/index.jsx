import React from "react";
import back from "@/assets/images/ic_back.png";
import GoodsList from "@/components/goodsList";
import top_arror from "@/assets/images/shang@3x.png";
import bottom_arror from "@/assets/images/xia1@3x.png";
import search_img from "@/assets/images/cha@3x.png";
import qs from "qs";
import http from "@/util/http";
import "./index.less";

class CouponGoodsList extends React.Component {
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
    const { history } = this.props;
    const { search_hint } = this.state;
    return (
      <GoodsList className="--coupon-goods-list-page">
        <div className="top-bar">
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
      </GoodsList>
    );
  }
}

export default CouponGoodsList;
