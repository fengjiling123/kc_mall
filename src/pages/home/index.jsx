import React from "react";
import { Carousel } from "antd-mobile";
import SearchHeader from "./searchHeader";
import HomeClassify from "./classify";
import HomeActivity from "./activity";
import CommendGoods from "./commendGoods";
import NormalView from "@/components/normalView";
import cart_img from "@/assets/images/gouwuche@3x.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo } from "@/store/actions/login";
import { setEvent } from "@/util/methods";
import history from "@/util/history";
import http from "@/util/http";
import zizhi_img from "../../assets/images/shouye-zizhiguize@3x.png";
import "./index.less";
import qs from "qs";

@connect()
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBottom: false,
      countInfo: {},
      bannerList: [],
      normalData: []
    };
    props.cacheLifecycles.didCache(this.componentDidCache);
    props.cacheLifecycles.didRecover(this.componentDidRecover);
  }

  componentDidMount() {
    this.getCountInfo();
    this.getBannerList();
    this.getNormalData();
    this.props.dispatch(getUserInfo());
  }

  //被缓存时生命周期
  componentDidCache() {}

  //被恢复时生命周期
  componentDidRecover = () => {
    this.forceUpdate(); // 强制更新 解决回到首页banner空白bug
    this.getCountInfo();
    this.getNormalData();
    this.activeChild.getNewBanner();
    this.activeChild.getReductionList();
    this.activeChild.getSecondkill();
    this.props.dispatch(getUserInfo());
  };

  parentMount = ref => {
    this.activeChild = ref;
  };

  //检查是否滚动到底部
  onScrollHandle = () => {
    const scrollTop = this.scrollRef.scrollTop;
    const clientHeight = this.scrollRef.clientHeight;
    const scrollHeight = this.scrollRef.scrollHeight;
    const isBottom = scrollHeight - (scrollTop + clientHeight) < 180;
    if (isBottom && scrollTop) {
      this.setState({ isBottom: true });
    } else {
      this.setState({ isBottom: false });
    }
  };
  //获取通栏数据
  getNormalData = () => {
    http({
      url: "/setting.get"
    }).then(res => {
      this.setState({
        normalData: res.data.data
      });
    });
  };

  //获取首页统计数量
  getCountInfo = () => {
    http({
      url: "/order.count",
      method: "get"
    }).then(res => {
      if (res.data.data) this.setState({ countInfo: res.data.data });
    });
  };

  //获取轮播图列表
  getBannerList = () => {
    http({
      url: "/banner.list",
      method: "get",
      loading: true
    }).then(res => {
      this.setState({ bannerList: res.data.data });
    });
  };

  render() {
    const { isBottom, countInfo, bannerList, normalData } = this.state;
    return (
      <div className="--home-page">
        {/* 头部消息、搜索栏 */}
        <SearchHeader countInfo={countInfo} />

        {/* 滚动区域 */}
        <div
          className="scroll-view"
          onScrollCapture={() => this.onScrollHandle()}
          ref={c => {
            this.scrollRef = c;
          }}
        >
          {/* 轮播图 */}
          {bannerList && bannerList.length > 0 && (
            <div
              style={{
                margin: "0 0.1rem",
                borderRadius: ".06rem ",
                overflow: "hidden",
                transform: "translateY(0)"
              }}
            >
              <Carousel autoplay={true} infinite>
                {bannerList.map(item =>
                  item.type === 0 ? (
                    <a
                      key={item.id}
                      href={item.redirect}
                      style={{
                        display: "inline-block",
                        width: "100%"
                      }}
                    >
                      <img
                        src={item.image}
                        style={{
                          width: "100%",
                          height: "1.6rem"
                        }}
                        onClick={() => {
                          setEvent("首页", `banner`, item.title);
                        }}
                      />
                    </a>
                  ) : (
                    <Link
                      key={item.id}
                      to={`/goodsdetail/${item.redirect}`}
                      style={{
                        display: "inline-block",
                        width: "100%"
                      }}
                    >
                      <img
                        src={item.image}
                        style={{
                          width: "100%",
                          height: "1.6rem"
                        }}
                        onClick={() => {
                          setEvent("首页", `banner`, item.title);
                        }}
                      />
                    </Link>
                  )
                )}
              </Carousel>
            </div>
          )}

          <img
            src={zizhi_img}
            style={{ width: "100%" }}
            onClick={() => {
              window.location.href =
                "http://mall.kangcemall.com/activity/normal?id=25";
            }}
          />

          {/* 商品分类 */}
          <HomeClassify />

          {/* 活动 */}
          <HomeActivity parentMount={this.parentMount} />

          <div
            style={{
              marginLeft: "0.1rem",
              marginRight: "0.1rem"
            }}
          >
            <NormalView atHomePage={true} data={normalData} />
          </div>

          {/* 推荐商品 */}
          <CommendGoods isBottom={isBottom} />
        </div>
      </div>
    );
  }
}

export default Home;
