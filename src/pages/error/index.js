import React from "react";
import history from "@/util/history";
import bg_chucuoyemian_img from "../../assets/images/yemianbucunzai@2x.png";

class Page404 extends React.Component {
  render() {
    return (
      <div
        style={{
          height: "100%",
          background: `url(${bg_chucuoyemian_img})`,
          backgroundSize: "cover"
        }}
      >
        <div style={{ paddingTop: "4.2rem" }}>
          <div
            style={{
              margin: "0 auto",
              background: "#3776EC",
              color: "#fff",
              fontSize: ".16rem",
              padding: ".12rem 0",
              width: "1.5rem",
              textAlign: "center",
              borderRadius: ".2rem"
            }}
            onClick={() => {
              history.go(-1);
            }}
          >
            返回
          </div>
        </div>
      </div>
    );
  }
}

export default Page404;
