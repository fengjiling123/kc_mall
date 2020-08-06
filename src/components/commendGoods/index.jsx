import React from "react";
import title_icon from "../../assets/images/icon-commend-goods@3x.png";
import CommendGoodsItem from "./commendGoodsItem";
import { ActivityIndicator } from "antd-mobile";
import http from "@/util/http";
import "./index.less";

class CommendGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      loading: false,
      page: 1,
      last_page: 1,
      limit: 10
    };
  }

  componentDidMount() {
    this.getGoodsList();
  }

  getGoodsList = () => {
    const { page, limit } = this.state;
    this.setState({ loading: true });
    http({
      url: "/hot.goods.get",
      params: { page, limit }
    })
      .then(res => {
        this.setState({
          loading: false,
          goodsList: [...this.state.goodsList, ...res.data.data.data],
          last_page: res.data.data.last_page
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  componentDidUpdate(prevProps) {
    const { isBottom } = this.props;
    const { loading, last_page, page } = this.state;
    if (
      !loading &&
      last_page !== page &&
      isBottom &&
      isBottom !== prevProps.isBottom
    ) {
      this.setState({ page: page + 1 }, () => {
        this.getGoodsList();
      });
    }
  }

  render() {
    const { goodsList, loading, page } = this.state;
    const { isBottom, style } = this.props;
    if (goodsList.length === 0) {
      return null;
    }
    return (
      <div className="--other-commend-goods" style={{ ...style }}>
        <div className="title">
          <img src={title_icon} />
          <div>推荐商品列表</div>
          <img src={title_icon} />
        </div>
        <div className="goods-container">
          {goodsList.map(item => (
            <CommendGoodsItem key={item.id} goodsInfo={item} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: ".05rem 0",
            height: "0.2rem"
          }}
        >
          {page !== 1 && loading && isBottom && <ActivityIndicator animating />}
        </div>
      </div>
    );
  }
}
export default CommendGoods;
