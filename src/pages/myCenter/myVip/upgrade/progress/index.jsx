import React from "react";
import "./index.less";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="--progressParent">
        <div
          className="progressChild"
          style={{ width: `${this.props.progress * 100}%` }}
        ></div>
      </div>
    );
  }
}
export default Index;
