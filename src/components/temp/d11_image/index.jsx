import React from "react";
import moment from "moment";

const expire = moment("2019-12-13 23:59:59").valueOf();

// 双十一活动图标
export default function D11() {
  let now = moment().valueOf();
  if (now - expire >= 0) {
    return null;
  }

  return (
    <div>
      <img
        src={require("@/assets/images/1212.png")}
        alt=""
        style={{ width: "0.24rem", height: "0.24rem" }}
      />
    </div>
  );
}
