import React, { Component, Fragment } from "react";
import WxImageViewer from "react-wx-images-viewer";
import "./index.less";
class WxImage extends Component {
  state = {
    index: 0,
    isOpen: false
  };

  onClose = () => {
    this.setState({
      isOpen: false
    });

    this.props.onClose && this.props.onClose();
  };

  openViewer(index) {
    this.setState({
      index,
      isOpen: true
    });
  }

  render() {
    const { index, isOpen } = this.state;

    const { urls } = this.props;

    return (
      <Fragment>
        {isOpen ? (
          <WxImageViewer
            onClose={this.onClose}
            urls={urls}
            index={index}
            zIndex={1000}
          />
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

export default WxImage;
