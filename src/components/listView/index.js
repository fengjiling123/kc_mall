import React from "react";
import { ListView, PullToRefresh } from "antd-mobile";
import * as ReactDOM from "react-dom";
import "./index.less";
import { rem2px } from "../../util/methods";

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
});

class MyListView extends React.Component {
  state = {
    dataSource,
    refreshing: true,
    isLoading: true,
    height: document.documentElement.clientHeight
  };

  componentDidUpdate() {
    document.body.style.overflow = "hidden";
  }

  componentDidMount() {
    let offset = this.props.offset ? this.props.offset : 0;
    const hei =
      this.state.height -
      ReactDOM.findDOMNode(this.lv).offsetTop -
      rem2px(offset);
    this.setState({
      height: hei
    });
    this.onRefresh();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.onDataChange) {
      if (nextProps.onDataChange.isRefresh) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(
            nextProps.onDataChange.data
          ),
          refreshing: false,
          isLoading: nextProps.onDataChange.isLoading
            ? nextProps.onDataChange.isLoading
            : false
        });
      } else {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(
            nextProps.onDataChange.data
          ),
          isLoading: nextProps.onDataChange.isLoading
            ? nextProps.onDataChange.isLoading
            : false
        });
      }
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    if (this.props.onRefresh) {
      this.props.onRefresh();
    }
    this.setState({ isLoading: true });
  };

  onEndReached = event => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    if (this.props.onEndReached) {
      this.props.onEndReached();
    }
  };

  render() {
    let separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: "#F5F5F9",
          height: 5
        }}
      />
    );
    if (this.props.separator) {
      separator = this.props.separator;
    }
    return (
      <ListView
        key={"1"}
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderFooter={() => {
          if (this.props.loadCompleteMsg) {
            return (
              <div style={{ textAlign: "center", whiteSpace: "pre-line" }}>
                {this.state.isLoading
                  ? "加载中..."
                  : typeof this.props.loadCompleteMsg != "undefined"
                  ? this.props.loadCompleteMsg
                  : "加载完成"}
              </div>
            );
          } else {
            return null;
          }
        }}
        renderRow={this.props.row}
        renderSeparator={separator}
        useBodyScroll={false}
        style={{
          height: this.state.height
        }}
        pullToRefresh={
          <PullToRefresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        onEndReached={this.onEndReached}
        pageSize={5}
      />
    );
  }
}

export default MyListView;
