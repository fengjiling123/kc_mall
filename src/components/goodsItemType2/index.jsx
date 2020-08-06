import React from "react";
import right_arror from "@/assets/images/you1@3x.png";
import { withRouter } from "react-router-dom";
import newcommer_img from "@/assets/images/xinren@3x.png";
import D11Image from "@/components/temp/d11_image";
import "./index.less";

@withRouter
class GoodsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now_time: parseInt(new Date().getTime() / 1000)
    };
  }

  componentDidMount() {
    const { goods } = this.props;
    const { now_time } = this.state;
    if (
      goods.activity === 2 &&
      goods.activity_info &&
      goods.activity_info.end_time > now_time
    ) {
      this.type2Timer = setInterval(() => {
        let now_time = parseInt(new Date().getTime() / 1000);
        this.setState({ now_time });
      }, 1000);
    }
  }

  toDetailPage = goods_id => {
    const { history } = this.props;
    history.push(`/goodsdetail/${goods_id}`);
  };

  componentWillUnmount() {
    this.clearInterval();
  }

  //移除定时器
  clearInterval = () => {
    if (this.type2Timer) {
      clearInterval(this.type2Timer);
      this.type2Timer = false;
    }
  };

  render() {
    const { goods, history, isNewcommerChannel, isReduction } = this.props;
    const { now_time } = this.state;
    let is_secondkill =
      goods.activity === 2 &&
      goods.activity_info &&
      goods.activity_info.start_time <= now_time &&
      goods.activity_info.end_time > now_time
        ? true
        : false;
    return (
      <div className='--goods-item-type2'>
        {isNewcommerChannel && (
          <img src={newcommer_img} className='newcommer-img' />
        )}
        <div
          className='goods-cover'
          onClick={() => {
            this.toDetailPage(goods.id);
          }}
        >
          <div className='act-img'>
            <D11Image />
          </div>
          <img src={goods.cover} />
        </div>
        <div>
          <div
            className='goods-name line-clamp-one'
            onClick={() => {
              this.toDetailPage(goods.id);
            }}
          >
            {goods.brand} {goods.name}
          </div>
          <div className='tags'>
            {goods.activity === 3 && (
              <span className='tag'>
                满
                {Number(
                  isReduction
                    ? goods.reach_money
                    : goods.activity_info && goods.activity_info.reach_money
                )}
                减
                {Number(
                  isReduction
                    ? goods.reduce_money
                    : goods.activity_info && goods.activity_info.reduce_money
                )}
              </span>
            )}
            {Number(goods.freight) === 0 && <span className='tag'>包邮</span>}
            {Number(goods.brokerage_money) ? (
              <span
                className='tag'
                style={{ background: "#FF5000", color: "#fff" }}
              >
                赚{parseFloat(goods.brokerage_money)}元
              </span>
            ) : null}
          </div>
          <div className='price-count'>
            <span className='price'>
              ￥
              {isNewcommerChannel ? (
                <span>{parseFloat(goods.activity_price)}</span>
              ) : (
                <span>
                  {is_secondkill
                    ? parseFloat(goods.activity_info.price)
                    : parseFloat(goods.price)}
                </span>
              )}
            </span>
            <span className='count'>{goods.sales}人已购买</span>
          </div>
          {/* <div
            className="store-name"
            onClick={() => {
              if (window.location.pathname === "/store") {
                return;
              }
              history.push(`/store?store_id=${goods.store_id}`);
            }}
          >
            <span className="line-clamp-one">{goods.store_name}</span>
            <img src={right_arror} className="right-arror" />
          </div> */}
        </div>
      </div>
    );
  }
}

export default GoodsItem;
