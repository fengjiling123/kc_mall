import React from "react";
import http from "@/util/http";
import history from "@/util/history";
import icHome from "@/assets/images/ic_back_home.png";
import ImageView from "@/components/imageView";
import qs from "qs";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: qs.parse(window.location.search.split("?")[1])
    };
  }

  render() {
    let { params } = this.state;
    return (
      <div className="--backToHome">
        {params.from && (
          <div
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "0",
              zIndex: 4,
              borderRadius: "0.5rem 0 0 0.5rem",

              height: "0.24rem",
              lineHeight: "0.24rem",

              paddingLeft: "0.15rem",
              paddingRight: "0.1rem",

              background: "rgba(0,0,0,0.5)"
            }}
            onClick={() => {
              history.replace("/");
            }}
          >
            <div style={{ color: "white" }}>回首页</div>
          </div>
        )}
      </div>
    );
  }
}
export default Index;
