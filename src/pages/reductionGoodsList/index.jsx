import React from "react";
import TopBar from "@/components/topBar";
import GoodsList from "@/components/goodsList";
import "./index.less";

class ReductionGoodsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GoodsList isReduction className="--reduction-goods-list-page">
        <TopBar name="满减活动" />
      </GoodsList>
    );
  }
}

export default ReductionGoodsList;
