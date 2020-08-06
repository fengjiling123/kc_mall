import React, { Component } from "react";
import BScroll from "better-scroll";

export default class Scroll extends Component {
  static defaultProps = {
    probeType: 1,
    click: true,
    pullup: false,
    stopPropagation: false,
    eventPassthrough: false,
    scrollY: true,
    scrollX: false,
    freeScroll: true,
  };

  render() {
    return (
      <div ref="scrollWrapper" style={{ ...this.props.cssStyle }}>
        {this.props.children}
      </div>
    );
  }

  componentDidMount() {
    // 初始化
    this._initScroll();
  }

  componentDidUpdate() {
    setTimeout(() => this.scroll.refresh(), 20);
  }

  componentWillUnmount() {
    this.scroll.destroy();
  }

  _initScroll() {
    this.scroll = new BScroll(this.refs.scrollWrapper, {
      probeType: this.props.probeType,
      click: this.props.click,
      scrollX: this.props.scrollX,
      stopPropagation: this.props.stopPropagation,
      eventPassthrough: this.props.eventPassthrough
    });

    // 上拉加载
    if (this.props.pullup) {
      // 判断是否滚动到底部
      this.scroll.on("scrollEnd", () => {
        if (this.scroll.y <= this.scroll.maxScrollY + 70) {
          this.props.onScrollToEnd({ scrollY: this.scroll.y });
        }
      });
    }

    // 灵敏实时监听滚动
    if (this.props.probeType) {
      this.props.onScroll &&
        this.scroll.on("scroll", () => {
          this.props.onScroll({ ...this.scroll });
        });
    }
  }

  refresh() {
    this.scroll && this.scroll.refresh();
  }

  enable() {
    this.scroll && this.scroll.enable();
  }
  disable() {
    this.scroll && this.scroll.disable();
  }

  scrollTo() {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
  }
  scrollToElement() {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
  }

  getScroll = () => this.scroll;
}
