import React from "react";
import "./index.less";

export default class stepper extends React.Component {
  render() {
    return (
      <div className="--stepper">
        <div>-</div>
        <input
          type="number"
          max="100"
          min="1"
          // ref={input => (this.input = input)}
          // onChange={() => {
          //   console.log("onchange", this.input.value);
          // }}
        />
        <div>+</div>
      </div>
    );
  }
}
