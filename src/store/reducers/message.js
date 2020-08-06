import * as actions from "../actions/message";

const initState = {
  sendSuccess: true,
  version: 0
};

const detafutAction = {
  type: "doNothing"
};

const message = (state = initState, action = detafutAction) => {
  switch (action.type) {
    // //发送消息
    // case actions.MESSAGE_SEND:
    //   return Object.assign({}, state, action.data);
    //
    // //发送消息 成功
    case actions.MESSAGE_SEND_SUCCESS:
      return Object.assign({}, state, {
        sendSuccess: action.data,
        version: Math.ceil(Math.random() * 1000)
      });

    default:
      return state;
  }
};

export default message;
