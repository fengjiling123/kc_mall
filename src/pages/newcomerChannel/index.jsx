import React from "react";
import TopBar from "@/components/topBar";
import GoodsList from "@/components/goodsList";
import "./index.less";

class NewcomerChannel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GoodsList isNewcommerChannel className="--newcomer-channel-page">
        <TopBar name="新人频道" />
      </GoodsList>
    );
  }
}

export default NewcomerChannel;
