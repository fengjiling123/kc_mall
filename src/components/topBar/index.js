import React from "react";
import history from "@/util/history";
import "./index.less";

import back from "@/assets/images/ic_back.png";

export class RoundTopBar extends React.Component {
  render() {
    return (
      <div
        id={this.props.id}
        className="--RoundTopGroup"
        style={{
          ...this.props.style
        }}
      >
        <img className="back" src={back} alt="" onClick={history.goBack} />
        <div className="titleName">{this.props.name}</div>
        {this.props.onRightClick && (
          <div
            className="titleButton"
            onClick={() => {
              this.props.onRightClick();
            }}
          >
            {this.props.rightButton}
          </div>
        )}
      </div>
    );
  }
}

//props：name、onRightClick、rightTitle
export default class TopBar extends React.Component {
  render() {
    return (
      <div
        className="--TopGroup"
        style={{
          ...this.props.style
        }}
      >
        <img
          className="back"
          src={back}
          alt=""
          onClick={() => {
            if (this.props.onBack) {
              this.props.onBack();
            } else {
              console.log("goBack");
              history.goBack();
            }
          }}
        />
        <div className="titleName line-clamp-one">{this.props.name}</div>

        {this.props.onRightClick && (
          <div
            className="rightTitle"
            onClick={() => {
              this.props.onRightClick();
            }}
          >
            {this.props.rightTitle}
          </div>
        )}

        {this.props.rightChild && (
          <div className="rightGroup">{this.props.rightChild}</div>
        )}
      </div>
    );
  }
}

//props：name、rightRender、onRightClick
export class TopBarRenderRight extends React.Component {
  render() {
    return (
      <div
        className="--TopGroup"
        style={{
          ...this.props.style
        }}
      >
        <img
          className="back"
          src={back}
          alt=""
          onClick={() => {
            if (this.props.onBack) {
              this.props.onBack();
            } else {
              history.goBack();
            }
          }}
        />
        <div className="titleName line-clamp-one">{this.props.name}</div>
        {this.props.rightRender && (
          <div
            className="rightTitle"
            onClick={() => {
              this.props.onRightClick();
            }}
          >
            {this.props.rightRender}
          </div>
        )}
      </div>
    );
  }
}
