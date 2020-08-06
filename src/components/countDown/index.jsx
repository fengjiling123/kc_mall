import React from "react";
import moment from "moment";
import "./index.less";

class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      min: 0,
      second: 0
    };
  }

  componentDidMount() {
    this.getCountDownTime();
  }

  componentDidUpdate(prevProps) {
    if (this.props.time && this.props.time !== prevProps.time) {
      this.clearInterval();
      this.getCountDownTime();
    }
  }

  //倒计时
  getCountDownTime = () => {
    let date = this.props.time - parseInt(new Date().getTime() / 1000);

    if (date > 0) {
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.getCountDownTime();
        }, 1000);
      }
    } else {
      this.clearInterval();
      date = 0;
    }

    let hour = parseInt(date / (60 * 60));
    let min = parseInt((date % (60 * 60)) / 60);
    let second = parseInt(date % 60);
    this.setState({ hour, min, second });
  };

  componentWillUnmount() {
    this.clearInterval();
  }

  //清除定时器
  clearInterval() {
    this.timer && clearInterval(this.timer);
    this.timer = false;
  }

  render() {
    const { hour, min, second } = this.state;
    const { background, style } = this.props;
    return (
      <div className="--count-down-component">
        <div style={{ background, ...style }}>
          {hour < 10 ? "0" + hour : hour}
        </div>
        <span>:</span>
        <div style={{ background, ...style }}>{min < 10 ? "0" + min : min}</div>
        <span>:</span>
        <div style={{ background, ...style }}>
          {second < 10 ? "0" + second : second}
        </div>
      </div>
    );
  }
}

export default CountDown;
