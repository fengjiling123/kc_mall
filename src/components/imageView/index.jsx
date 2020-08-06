import React from "react";
import "./index.less";

export class RoundImageView extends React.Component {
  render() {
    return (
      <div className="--imageParent">
        <img
          className="roundImageStyle"
          style={{
            width: this.props.width,
            height: this.props.height,
            ...this.props.style
          }}
          src={this.props.src}
          alt="img"
        />
      </div>
    );
  }
}

export default ({ style, src, ...args }) => (
  <div
    className="--imageParent"
    style={{
      ...style,
      flex: "none"
    }}
    {...args}
  >
    <img className="imageStyle" src={src} alt="img" />
  </div>
);
