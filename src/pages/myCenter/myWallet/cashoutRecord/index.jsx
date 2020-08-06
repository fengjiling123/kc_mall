import React from "react";
import TopBar from "@/components/topBar";
import { ActivityIndicator } from "antd-mobile";
import http from "@/util/http";
import moment from "moment";
import "./index.less";

const CASHOUT_STATUS = { 0: "申请中", 1: "已打款", 2: "拒绝" };

class CashoutRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordList: [],
      loading: true,
      page: 1,
      limit: 10,
      last_page: 1
    };
  }

  componentDidMount() {
    this.getRecordList();
  }

  getRecordList = () => {
    const { page, limit } = this.state;
    const params = { page, limit };
    http({
      url: "/payee.list",
      params
    }).then(res => {
      this.setState({
        loading: false,
        recordList: [...this.state.recordList,...res.data.data.data],
        last_page: res.data.data.last_page
      });
    });
  };

  //检查是否滚动到底部
  onScrollHandle = () => {
    const { page, last_page } = this.state;
    const scrollTop = this.scrollRef.scrollTop;
    const clientHeight = this.scrollRef.clientHeight;
    const scrollHeight = this.scrollRef.scrollHeight;
    const isBottom = scrollHeight - (scrollTop + clientHeight) < 200;
    if (isBottom && scrollTop && last_page !== page) {
      this.setState({ page: page + 1 }, () => {
        this.getRecordList();
      });
    }
  };

  render() {
    const { loading, recordList, page } = this.state;
    return (
      <div className="--cashout-record">
        <TopBar name="提现记录" />
        <div
          className="scroll-view"
          onScrollCapture={() => this.onScrollHandle()}
          ref={c => {
            this.scrollRef = c;
          }}
        >
          <div className="text">
            <div>已打款的记录请查收账户是否到账</div>
            <div>提现拒绝的请核对提现账户后重新申请</div>
          </div>
          <div className="all-record">
            {recordList &&
              recordList.length > 0 &&
              recordList.map(item => (
                <div className="record-item" key={item.id}>
                  <div>
                    <div className="name">
                      用户提现（{CASHOUT_STATUS[item.status]}）
                    </div>
                    <div className="time">
                      {moment.unix(item.create_time).format("YYYY.MM.DD HH:mm")}
                      {item.status !== 0 ? "-" : ""}
                      {item.status !== 0
                        ? moment
                            .unix(item.update_time)
                            .format("YYYY.MM.DD HH:mm")
                        : ""}
                    </div>
                  </div>
                  <div className="money">{parseFloat(item.money)}</div>
                </div>
              ))}
          </div>
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: ".1rem 0",
            height: "0.2rem"
          }}
        >
          {page !== 1 && loading && <ActivityIndicator animating />}
        </div>
        </div>
      </div>
    );
  }
}

export default CashoutRecord;
