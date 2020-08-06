/** 商品列表组件
 * 搜索结果页面，分类列表页面，店铺主页，新人专享列表页，满减活动列表使用该组件
 */
import React from "react";
import FilterBar from "@/components/filterBar";
import { withRouter } from "react-router-dom";
import GoodsItemType1 from "@/components/goodsItemType1";
import GoodsItemType2 from "@/components/goodsItemType2";
import qs from "qs";
import http from "@/util/http";
import * as ReactDOM from "react-dom";
import { ListView, PullToRefresh, ActivityIndicator } from "antd-mobile";
import classnames from "classnames";
import "./index.less";

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row2
});

@withRouter
class GoodsListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showType: 1,
      showCommendSelect: false,
      page: 1,
      limit: 10,
      sort: 1, //1综合排序，2新品排序，3销量排序，4价格升序，5价格降序
      goodsList: [],
      last_page: 1,
      loading: true,
      refreshing: false,
      height: document.documentElement.clientHeight
    };
  }

  componentDidMount() {
    this.getGoodsList();
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.setState({
      height: hei
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.category_id !== prevProps.category_id) {
      this.setState({ page: 1, goodsList: [] }, () => {
        this.getGoodsList();
      });
    }

    if (this.props.keyword !== prevProps.keyword) {
      if (!this.props.keyword) {
        this.props.history.replace("/searchresult");
      }
      this.setState({ page: 1, goodsList: [] }, () => {
        this.getGoodsList();
      });
    }
  }

  getGoodsList = () => {
    const { page, limit, sort } = this.state;
    const { isNewcommerChannel, isReduction } = this.props;
    const searchValue = qs.parse(window.location.search.split("?")[1]);
    let { keyword, store_id, coupon_id } = searchValue;
    const params = {
      page,
      limit,
      sort,
      category_id: this.props.category_id || searchValue.category_id,
      keyword,
      store_id,
      coupon_id
    };
    this.setState({ showCommendSelect: false });

    //判断是否是新人频道列表
    const url = isNewcommerChannel
      ? "/activities.new.list"
      : isReduction
      ? "/activities.reduction.list"
      : "/goods.list";

    http({
      url,
      params
    })
      .then(res => {
        this.setState({
          loading: false,
          refreshing: false,
          last_page: res.data.data.last_page,
          goodsList:
            page === 1
              ? res.data.data.data
              : [...this.state.goodsList, ...res.data.data.data]
        });
      })
      .catch(err => {
        this.setState({ loading: false, refreshing: false });
      });
  };

  onRefresh = () => {
    this.setState({ page: 1, refreshing: true }, () => {
      this.getGoodsList("refresh");
    });
  };

  onEndReached = () => {
    const { page, last_page } = this.state;
    if (page !== last_page) {
      this.setState({ page: page + 1, loading: true }, () => {
        this.getGoodsList();
      });
    }
  };

  scrollToTop = () => {
    document.getElementsByClassName(
      "goods-list-component-list-view"
    )[0].scrollTop = 0;
  };

  render() {
    // isNewcommerChannel 是否新人专享列表
    const { className, isNewcommerChannel, isReduction } = this.props;
    const {
      showType,
      sort,
      showCommendSelect,
      goodsList,
      height,
      loading,
      refreshing
    } = this.state;
    const { coupon_id, reach_money, money } = qs.parse(
      window.location.search.split("?")[1]
    );
    return (
      <div className={`--goods-list-component ${className}`}>
        {this.props.children}
        <FilterBar
          style={{
            borderTopRightRadius: "0.1rem",
            borderTopLeftRadius: "0.1rem",
            padding: "0.15rem",
            marginBottom: isNewcommerChannel || isReduction ? ".1rem" : "0"
          }}
          showType={showType}
          sort={sort}
          showCommendSelect={showCommendSelect}
          changeShowType={showType => {
            this.scrollToTop();
            this.setState({ showType });
          }}
          changeSort={sort => {
            this.scrollToTop();
            this.setState({ sort, page: 1 }, () => {
              this.getGoodsList();
            });
          }}
          changeShowCommendSelect={showCommendSelect => {
            this.setState({ showCommendSelect });
          }}
        />
        {coupon_id && (
          <div className="coupon-info">
            以下促销商品可使用
            {Number(reach_money) ? `满${Number(reach_money)}` : "无门槛"}减
            {Number(money)}的优惠券
          </div>
        )}

        <ListView
          className={classnames({
            "goods-list-component-list-view": true,
            "list-view": true,
            type1: showType === 1,
            type2: showType === 2,
            "newconner-list": isNewcommerChannel || isReduction ? true : false,
            "is-coupon": coupon_id ? true : false
          })}
          ref={el => (this.lv = el)}
          dataSource={dataSource.cloneWithRows(goodsList)}
          renderFooter={() => (
            <div
              style={{
                padding: 5,
                display: "flex",
                justifyContent: "center",
                width: "100%"
              }}
            >
              {loading ? <ActivityIndicator animating /> : null}
            </div>
          )}
          renderRow={
            showType === 1
              ? rowData => (
                  <GoodsItemType1
                    goods={rowData}
                    isNewcommerChannel={isNewcommerChannel}
                    isReduction={isReduction}
                  />
                )
              : rowData => (
                  <GoodsItemType2
                    goods={rowData}
                    isNewcommerChannel={isNewcommerChannel}
                    isReduction={isReduction}
                  />
                )
          }
          useBodyScroll={false}
          style={{ height }}
          pullToRefresh={
            <PullToRefresh refreshing={refreshing} onRefresh={this.onRefresh} />
          }
          onEndReached={this.onEndReached}
        />
      </div>
    );
  }
}

export default GoodsListComponent;
