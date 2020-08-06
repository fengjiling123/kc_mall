import React from "react";
import http from "@/util/http";
import { withRouter } from "react-router-dom";
import "./index.less";

@withRouter
class StoreHotGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeInfo: null
    };
  }

  componentDidMount() {
    this.getStoreGoods();
  }

  componentDidUpdate(prevProps) {
    if (this.props.store_id && this.props.store_id !== prevProps.store_id) {
      this.getStoreGoods();
    }
  }

  //获取店铺信息与本店热销商品
  getStoreGoods = () => {
    http({
      url: "/store.goods.get",
      params: { store_id: this.props.store_id }
    }).then(res => {
      this.setState({ storeInfo: res.data.data });
    });
  };

  render() {
    const { storeInfo } = this.state;
    if (!storeInfo) return null;
    return (
      <div className="--hot-goods">
        <div className="title">
          <div className="store-name">
            {storeInfo.store && <img src={storeInfo.store.logo} alt="" />}
            <span className="line-clamp-one">{storeInfo.store.name}</span>
          </div>
          <div
            className="button"
            onClick={() => {
              this.props.history.push(`/store?store_id=${storeInfo.store.id}`);
            }}
          >
            进店逛逛
          </div>
        </div>
        <div
          style={{
            lineHeight: ".2rem",
            margin: ".1rem 0",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          本店热销
        </div>
        <div className="hot-goods-list">
          {storeInfo.goods.map(item => (
            <div
              key={item.id}
              onClick={() => {
                document.getElementById(
                  "goods-detail-scroll-view"
                ).scrollTop = 0;
                this.props.history.replace(`/goodsDetail/${item.id}`);
              }}
            >
              <div className="goods-cover">
                <img src={item.cover} />
              </div>
              <div className="goods-name line-clamp-two">{item.name}</div>
              <div className="price">
                ￥<span>{parseFloat(item.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default StoreHotGoods;
