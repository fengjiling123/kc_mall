import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopBar from "@/components/topBar";
import Scroll from "@/components/scroll";

export default class Activity20190801 extends Component {
  render() {
    const scrollStyle = {
      position: "fixed",
      width: "100%",
      top: "0.45rem",
      bottom: "0"
    };

    return (
      <div>
        <TopBar name="七夕节活动" className="topBar" />
        <Scroll cssStyle={scrollStyle} ref="scroll">
          <div
            style={{
              width: "100%",
              fontSize: 0
            }}
          >
            <img
              width="100%"
              src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-01%2F01.png"
              alt=""
              onLoad={() => this.refs.scroll.refresh()}
            />
            <Link to="/goodsDetail/152 ">
              <img
                width="100%"
                src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-01%2F02.png"
                alt=""
                onLoad={() => this.refs.scroll.refresh()}
              />
            </Link>
            <Link to="/goodsDetail/151 ">
              <img
                width="100%"
                src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-01%2F03.png"
                alt=""
                onLoad={() => this.refs.scroll.refresh()}
              />
            </Link>
            <Link to="/goodsDetail/149 ">
              <img
                width="100%"
                src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-01%2F04.png"
                alt=""
                onLoad={() => this.refs.scroll.refresh()}
              />
            </Link>
            <Link to="/goodsDetail/150 ">
              <img
                width="100%"
                src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-01%2F05.png"
                alt=""
                onLoad={() => this.refs.scroll.refresh()}
              />
            </Link>
            <img
              width="100%"
              src="http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Factivity%2F19-08-01%2F06.png"
              alt=""
              onLoad={() => this.refs.scroll.refresh()}
              onClick={() => this.props.history.push("/reduction")}
            />
          </div>
        </Scroll>
      </div>
    );
  }
}
