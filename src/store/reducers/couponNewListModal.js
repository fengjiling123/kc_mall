import * as actions from "../actions/couponNewListModal";

const initialState = {
  showPage: false,
  couponList: []
};

const defaultAction = {
  type: "doNothing"
};

const couponNewListModal = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    //显示新人优惠券弹窗
    case actions.CHANGE_SHOW_PAGE:
      return Object.assign({}, state, {
        showPage: action.data
      });
    //获取新人优惠券列表
    case actions.GET_COUPON_NEW_LIST:
      return Object.assign({}, state, {
        couponList: action.data
      });
    default:
      return state;
  }
};

export default couponNewListModal;
