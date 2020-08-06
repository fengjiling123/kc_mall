import React from "react";
import TopBar from "../../components/topBar";
import empty_img from "../../assets/images/quesheng-lianjiebucunzai@3x.png";
import CommendGoods from "../../components/commendGoods";
import BackToHome from "@/components/backToHome";
import "./index.less";

class InvalidPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBottom: false
    };
  }

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

  render() {
    return (
      <div className="--invalid-page">
        <TopBar name="康策良品" />
        <BackToHome />
        <div
          className="scroll-view"
          onScrollCapture={() => this.onScrollHandle()}
          ref={c => {
            this.scrollRef = c;
          }}
        >
          <div className="empty-info">
            <div className="img-conatiner">
              <img src={empty_img} />
            </div>
            <div className="text">链接不存在或已下架</div>
            <div className="button">
              <span
                onClick={() => {
                  this.props.history.go(-1);
                }}
              >
                返回
              </span>
            </div>
          </div>
          <CommendGoods isBottom={this.state.isBottom} />
        </div>
      </div>
    );
  }
}

export default InvalidPage;
