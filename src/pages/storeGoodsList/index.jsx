import React from "react";
import BACK_IMG from "@/assets/images/icon-fanhui-baise.png";
import STORE_BG_IMG from "@/assets/images/dianpu-bj.png";
import SEARCH_IMG from "@/assets/images/icon-sousuo.png";
import STORE_DETAIL_IMG from "@/assets/images/icon-dianpuxiangqing.png";
import GoodsList from "@/components/goodsList";
import { withRouter } from "react-router-dom";
import GoodsItemType1 from "@/components/goodsItemType1";
import GoodsItemType2 from "@/components/goodsItemType2";
import FilterBar from "@/components/filterBar";
import BackToHome from "@/components/backToHome";
import qs from "qs";
import http from "@/util/http";
import "./index.less";
import { setEvent } from "@/util/methods";
import { Toast, ActivityIndicator } from "antd-mobile";
import { getShareUrl, share } from "@/util/share";
import classNames from "classnames";
import BG_IMG from "@/assets/images/dianpu-bj.png";
import FIXED_BACK_ARROR from "@/assets/images/ic_back.png";
import isWeixin from "@/util/tools";

@withRouter
class StoreGoodsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeInfo: null,
      store_id: "",
      search_hint: "",
      showType: 1,
      showCommendSelect: false,
      page: 1,
      limit: 10,
      sort: 1, //1综合排序，2新品排序，3销量排序，4价格升序，5价格降序
      goodsList: [],
      last_page: 1,
      loading: true,
      showFixHeader: false
    };
  }

  componentDidMount() {
    this.getHotSearch();
    this.getStoreDetail();
    this.getGoodsList();
  }

  getGoodsList = () => {
    const { page, limit, sort } = this.state;
    const { store_id } = qs.parse(window.location.search.split("?")[1]);
    const params = {
      page,
      limit,
      sort,
      store_id
    };
    //判断是否是新人频道列表
    const url = "/goods.list";
    this.setState({ showCommendSelect: false, loading: true });
    http({
      url,
      params
    })
      .then(res => {
        this.setState({
          loading: false,
          last_page: res.data.data.last_page,
          goodsList:
            page === 1
              ? res.data.data.data
              : [...this.state.goodsList, ...res.data.data.data]
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  //获取店铺详情
  getStoreDetail() {
    const { store_id } = qs.parse(window.location.search.split("?")[1]);
    this.setState({ store_id });
    http({
      url: "/store.get",
      params: { id: store_id }
    }).then(res => {
      this.setState({
        storeInfo: res.data.data
      });
      if (isWeixin) {
        let storeItem = res.data.data;
        let logo =
          // "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-06%2Fshare_logo.png";
          "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fshare_logo.png?";
        logo = storeItem ? storeItem.logo : logo;
        let title = storeItem ? storeItem.name : ""; // 分享标题
        let desc = `我在康策良品发现了一家好店@${title}，推荐给你哟！`; // 分享标题
        share(title, desc, getShareUrl(false), logo);
      }
    });
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

  scrollToTop = () => {
    if (this.scrollRefStorePage.scrollTop > 60) {
      document.getElementsByClassName(
        "--store-goods-list-page"
      )[0].scrollTop = 60;
    }
  };

  //检查是否滚动到底部
  onScrollHandle = () => {
    const { last_page, page } = this.state;
    const scrollTop = this.scrollRefStorePage.scrollTop;
    const clientHeight = this.scrollRefStorePage.clientHeight;
    const scrollHeight = this.scrollRefStorePage.scrollHeight;
    const isBottom = scrollHeight - (scrollTop + clientHeight) < 180;
    if (isBottom && scrollTop && last_page > page) {
      this.setState({ page: page + 1 }, () => {
        this.getGoodsList();
      });
    }

    if (scrollTop >= 60) {
      this.setState({ showFixHeader: true });
    } else {
      this.setState({ showFixHeader: false });
    }
  };

  render() {
    const { history } = this.props;
    const {
      storeInfo,
      search_hint,
      showType,
      showCommendSelect,
      sort, //1综合排序，2新品排序，3销量排序，4价格升序，5价格降序
      goodsList,
      loading,
      showFixHeader
    } = this.state;
    if (!storeInfo) return null;
    return (
      <div
        className="--store-goods-list-page"
        onScrollCapture={() => this.onScrollHandle()}
        ref={c => {
          this.scrollRefStorePage = c;
        }}
      >
        {/* fixed头部 */}
        {showFixHeader ? (
          <div className="fixed-header">
            <div className="search-bar">
              <div
                className="back-img-container"
                onClick={() => {
                  history.go(-1);
                }}
              >
                <img
                  src={FIXED_BACK_ARROR}
                  style={{ height: ".2rem", width: ".13rem" }}
                />
              </div>
              <div
                className="search-inp"
                onClick={() => {
                  history.push(`/searchpage?search_hint=${search_hint}`);
                }}
              >
                <img src={SEARCH_IMG} />
                <span>{search_hint}</span>
              </div>
            </div>

            <FilterBar
              style={{
                borderTopRightRadius: "0.1rem",
                borderTopLeftRadius: "0.1rem",
                padding: ".15rem"
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
          </div>
        ) : null}

        {/* 头部 */}
        <div
          style={{
            background: `url(${BG_IMG})`,
            backgroundSize: "cover"
          }}
        >
          <div className="store-title">
            <div className="search-bar">
              <div
                className="back-img-container"
                onClick={() => {
                  history.go(-1);
                }}
              >
                <img src={BACK_IMG} />
              </div>
              <div
                className="search-inp"
                onClick={() => {
                  history.push(`/searchpage?search_hint=${search_hint}`);
                }}
              >
                <img src={SEARCH_IMG} />
                <span>{search_hint}</span>
              </div>
            </div>
            <div
              className="store-name"
              onClick={() => {
                history.push(`/store/detail?store_id=${storeInfo.id}`);
              }}
            >
              <img src={storeInfo.logo} />
              <div>
                <div className="name">
                  <span>{storeInfo.name}</span>
                  <img src={STORE_DETAIL_IMG} />
                </div>
                {storeInfo.is_self ? <div className="is-self">自营</div> : null}
              </div>
            </div>
          </div>

          {/* 筛选 */}

          <FilterBar
            style={{
              borderTopRightRadius: "0.1rem",
              borderTopLeftRadius: "0.1rem",
              padding: "0.15rem"
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
        </div>

        <div
          className={classNames({
            goods_list_container: true,
            type1: showType === 1,
            type2: showType === 2
          })}
        >
          {goodsList.map(item =>
            showType === 1 ? (
              <GoodsItemType1 key={item.id} goods={item} />
            ) : (
              <GoodsItemType2 key={item.id} goods={item} />
            )
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: ".05rem 0",
              height: "0.2rem",
              width: "100%"
            }}
          >
            {this.state.page !== 1 && loading && (
              <ActivityIndicator animating />
            )}
          </div>
        </div>

        <BackToHome />
      </div>

      // <GoodsList className="--store-goods-list-page">
      //   <div className="store-title">
      //     <div className="search-bar">
      //       <div
      //         className="back-img-container"
      //         onClick={() => {
      //           history.go(-1);
      //         }}
      //       >
      //         <img src={BACK_IMG} />
      //       </div>
      //       <div
      //         className="search-inp"
      //         onClick={() => {
      //           history.push(`/searchpage?search_hint=${search_hint}`);
      //         }}
      //       >
      //         <img src={SEARCH_IMG} />
      //         <span>{search_hint}</span>
      //       </div>
      //     </div>
      //     <div
      //       className="store-name"
      //       onClick={() => {
      //         history.push(`/store/detail?store_id=${storeInfo.id}`);
      //       }}
      //     >
      //       <img src={storeInfo.logo} />
      //       <div>
      //         <div className="name">
      //           <span>{storeInfo.name}</span>
      //           <img src={STORE_DETAIL_IMG} />
      //         </div>
      //         {storeInfo.is_self ? <div className="is-self">自营</div> : null}
      //       </div>
      //     </div>
      //   </div>

      //   <BackToHome />
      // </GoodsList>
    );
  }
}

export default StoreGoodsList;
