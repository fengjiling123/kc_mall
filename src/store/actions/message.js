import http from "@/util/http";

export const MESSAGE_SEND = "MESSAGE_SEND";

export const MESSAGE_SEND_SUCCESS = "MESSAGE_SEND_SUCCESS";

//获取缓存
export function sendMessage(id, content, type = 1) {
  console.log("sendMessage", id, content, type);
  return dispatch => {
    http({
      url: "/chat.send",
      method: "post",
      data: {
        store_id: id,
        content: content,
        resource_type: type
      }
    }).then(res => {
      dispatch({
        type: MESSAGE_SEND_SUCCESS,
        data: true
      });
    });
  };
}
