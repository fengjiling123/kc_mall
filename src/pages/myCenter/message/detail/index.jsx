import React from "react";
import http from "@/util/http";
import history from "@/util/history";
import ImageView, { RoundImageView } from "@/components/imageView";
import { RoundTopBar } from "@/components/topBar";
import icPicture from "@/assets/images/ic_picture.png";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import * as actions from "@/store/actions/message";
import qs from "qs";
import "./index.less";
import { connect } from "react-redux";
import { PullToRefresh } from "antd-mobile";
import moment from "moment";
import axios from "axios";
import uploadUrl from "@/util/uploadConfig";
import { renderBigImg, removeBigImg } from "@/util/methods";
import Auth from "@/components/auth";

@connect(state => ({
  ...state.message,
  face: state.login.face
}))
@Auth
class Index extends React.Component {
  page = 1;
  limit = 20;
  state = {
    height: 0,
    store: {},
    refreshing: false,
    haveSend: false,
    message: []
  };

  reSizeHeight = () => {
    let h1 = document.body.clientHeight;
    if (
      document.getElementById("roundTopBar") &&
      document.getElementById("bottomGroup")
    ) {
      let h2 = document.getElementById("roundTopBar").offsetHeight;
      let h3 = document.getElementById("bottomGroup").offsetHeight;
      this.setState({
        height: h1 - h2 - h3
      });
    }
  };

  componentDidMount() {
    this.params = qs.parse(window.location.search.split("?")[1]);

    this.reSizeHeight();
    this.loadMessage();
    this.loadNew();
    let that = this;
    let originalHeight =
      document.documentElement.clientHeight || document.body.clientHeight;

    window.onresize = function() {
      //键盘弹起与隐藏都会引起窗口的高度发生变化
      let resizeHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (resizeHeight - 0 < originalHeight - 0) {
        //当软键盘弹起，在此处操作
        that.reSizeHeight();
        that.toBottom();
      } else {
        that.reSizeHeight();
        that.toBottom();
      }
    };
  }

  toBottom = () => {
    let messageBottom = document.getElementsByClassName("messageBottom")[0];
    if (messageBottom) {
      messageBottom.scrollIntoView();
    }
  };

  onLoadMore = () => {
    this.page = this.page + 1;
    this.loadMessage();
  };

  loadMessage = () => {
    let message = this.state.message;
    let recall_from_id;
    if (message.length > 0) {
      recall_from_id = message[0].id;
    }
    if (recall_from_id == 0) {
      recall_from_id = null;
    }
    http({
      url: "/chat.get",
      method: "post",
      data: {
        store_id: this.params.id,
        limit: this.limit,
        recall_from_id
      }
    }).then(res => {
      let result = res.data.data;
      let array = res.data.data.sdialogues.reverse();
      this.setState(
        {
          refreshing: false,
          store: result.store,
          titleName: result.store.name,
          // message: this.state.message.concat(array)
          message: array.concat(this.state.message)
        },
        () => {
          this.toBottom();
          if (this.params.goods_id && !this.hasSend) {
            this.loadGoods(this.params.goods_id);
          }
        }
      );
    });
  };

  loadNew = () => {
    if (!this.isDistory) {
      setTimeout(() => {
        this.loadNew();
        this.loadNewMessage();
      }, 5000);
    }
  };

  componentWillUnmount() {
    this.isDistory = true;
    removeBigImg();
  }

  loadNewMessage = () => {
    let message = this.state.message;
    let lastId;
    if (message.length > 0) {
      lastId = message[message.length - 1].id;
    } else {
      lastId = 0;
    }

    http({
      url: "/chat.get",
      method: "post",
      data: {
        store_id: this.params.id,
        outlook_from_id: lastId
      }
    }).then(res => {
      let result = res.data.data;
      let array = res.data.data.sdialogues;
      this.setState(
        {
          refreshing: false,
          store: result.store,
          titleName: result.store ? result.store.name : "",
          message: this.state.message.concat(array)
        },
        () => {
          if (array.length > 0) {
            this.toBottom();
          }
        }
      );
    });
  };

  onSend = () => {
    let input = this.myInput.innerText;
    let { store } = this.state;
    if (store) {
      this.props.dispatch(actions.sendMessage(store.id, input));
    }
  };

  addEmoji = emoji => {};

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.version != nextProps.version) {
      if (nextProps.sendSuccess) {
        this.myInput.innerText = "";
        this.loadNewMessage();
      }
    }
  }

  loadGoods = id => {
    let params = {
      goods_id: id
    };
    http({
      url: "/goods.get",
      params
    }).then(res => {
      let result = res.data.data;
      let content = {
        id: result.id,
        img: result.cover,
        name: result.name,
        price: result.price,
        sales: result.sales
      };

      let msg = this.state.message;
      let lastId;
      if (msg.length > 0) {
        lastId = msg[msg.length - 1].id;
      } else {
        lastId = 0;
      }

      let message = {
        id: lastId,
        from: 0
      };
      if (!this.inList) {
        msg.push(message);
        this.inList = true;
      }
      this.setState({
        goods: content
      });
      //
    });
  };

  onSendGoods = () => {
    http({
      url: "/chat.send",
      method: "post",
      data: {
        store_id: this.state.store ? this.state.store.id : 0,
        content: JSON.stringify(this.state.goods),
        resource_type: 3
      }
    }).then(res => {
      this.setState(
        {
          haveSend: true
        },
        () => {
          this.loadNewMessage();
        }
      );
    });
  };

  toDetail = goods => {
    history.push(`/goodsdetail/${goods.id}`);
  };

  getChatView = data => {
    let drug;
    if (data.resource_type === 3) {
      drug = JSON.parse(data.content);
    }

    switch (data.from) {
      case 0:
        let { goods, haveSend } = this.state;
        if (goods && !haveSend) {
          return (
            <div className="sendView">
              <div className="drugGroup">
                <ImageView
                  src={goods.img}
                  style={{
                    width: "0.6rem",
                    height: "0.6rem",
                    flex: "none"
                  }}
                />
                <div className="drugContent">
                  <div>{goods.name}</div>
                  <div className="amountGroup">
                    <div className="priceGroup">
                      <div className="pricePrefix">￥</div>
                      <div>{parseFloat(goods.price)}</div>
                      <div className="sales">{goods.sales}人已购买</div>
                    </div>
                  </div>
                </div>
                <div
                  className="send"
                  onClick={() => {
                    this.onSendGoods();
                  }}
                >
                  发送
                </div>
              </div>
            </div>
          );
        }
        return <div />;
      case 1: //用户
        return (
          <div className="messageBody">
            <div className="time">
              {moment.unix(data.create_time).format("MM-DD HH:mm")}
            </div>
            <div className="messageGroup right">
              {data.resource_type === 1 && (
                <div className="messageContent right">{data.content}</div>
              )}
              {data.resource_type === 2 && (
                <ImageView
                  src={data.content}
                  style={{
                    width: "1.2rem",
                    height: "0.8rem",
                    marginRight: "0.05rem"
                  }}
                  onClick={() => {
                    renderBigImg(data.content);
                  }}
                />
              )}
              {data.resource_type === 3 && (
                <div
                  className="drugGroup"
                  onClick={() => {
                    this.toDetail(drug);
                  }}
                >
                  <ImageView
                    src={drug.img}
                    style={{
                      width: "0.6rem",
                      height: "0.6rem",
                      flex: "none"
                    }}
                  />
                  <div className="drugContent">
                    <div>{drug.name}</div>
                    <div className="amountGroup">
                      <div className="priceGroup">
                        <div className="pricePrefix">￥</div>
                        <div>{parseFloat(drug.price)}</div>
                        <div className="sales">{drug.sales}人已购买</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <RoundImageView
                src={this.props.face}
                style={{ width: "0.2rem", height: "0.2rem" }}
              />
            </div>
          </div>
        );
      case 2: //店铺
        return (
          <div className="messageBody ">
            <div className="time">
              {moment.unix(data.create_time).format("MM-DD HH:mm")}
            </div>
            <div className="messageGroup left">
              <RoundImageView
                src={this.state.store ? this.state.store.logo : ""}
                style={{ width: "0.2rem", height: "0.2rem" }}
              />

              {data.resource_type === 1 && (
                <div className="messageContent left">{data.content}</div>
              )}
              {data.resource_type === 2 && (
                <ImageView
                  src={data.content}
                  style={{
                    width: "1.2rem",
                    height: "0.8rem",
                    marginLeft: "0.05rem"
                  }}
                  onClick={() => {
                    renderBigImg(data.content);
                  }}
                />
              )}
            </div>
          </div>
        );
    }
  };

  uploadFile = file => {
    let formData = new FormData();
    formData.append("file", file.target.files[0]);
    // //发起上传
    axios({
      url: uploadUrl + "/upload",
      header: {
        "content-type": "multipart/form-data"
      },
      method: "post",
      data: formData
    }).then(resp => {
      let url = resp.data.data[0].url;
      let { store } = this.state;
      if (store) {
        this.props.dispatch(actions.sendMessage(store.id, url, 2));
      }
    });
  };

  inputFocus = () => {
    window.scroll(0, 0);
  };

  render() {
    let { titleName, goods, haveSend } = this.state;
    return (
      <div className="--messageDetailPage">
        <RoundTopBar
          id="roundTopBar"
          name={titleName}
          style={{ background: "#ffffff" }}
        />

        <PullToRefresh
          damping={60}
          ref={el => (this.ptr = el)}
          style={{
            height: this.state.height,
            overflow: "auto"
          }}
          indicator={{}}
          direction={"down"}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.onLoadMore();
            this.setState({ refreshing: true });
          }}
        >
          <div id="messages">
            {this.state.message.map((i, index) => this.getChatView(i, index))}
            <div className="messageBottom" />
          </div>
        </PullToRefresh>

        <div id="bottomGroup" className="bottomGroup">
          <div className="inputParent">
            <div className="inputImg">
              <input
                type="file"
                className="imageUp"
                accept="image/*"
                onBlur={this.inputFocus}
                onFocus={this.inputFocus}
                onChange={file => this.uploadFile(file)}
              />
              <ImageView
                src={icPicture}
                style={{
                  position: "absolute",
                  marginLeft: "0.12rem",
                  marginRight: "0.12rem",
                  width: "0.2rem",
                  height: "0.35rem"
                }}
              />
            </div>
            <div className="inputGroup">
              <div
                ref={ref => {
                  this.myInput = ref;
                }}
                className="input"
                contenteditable="true"
                onBlur={this.inputFocus}
                onFocus={this.inputFocus}
              />
            </div>
            <div
              className="inputSend"
              onClick={() => {
                this.onSend();
              }}
            >
              发送
            </div>
          </div>
          <div className="emoji">
            <Picker onSelect={this.addEmoji} />
          </div>
        </div>
      </div>
    );
  }
}
export default Index;
