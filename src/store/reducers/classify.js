import * as actions from "../actions/classify";

const initState = {
  classifyList: [],
  activeClassify: ""
};

const detafutAction = {
  type: "doNothing"
};

const classifyList = (state = initState, action = detafutAction) => {
  switch (action.type) {
    case actions.GET_CLASSIFY_LIST:
      return Object.assign({}, state, {
        classifyList: action.data,
        activeClassify: action.data[0].id
      });
    case actions.CHANGE_ACTIVE_CLASSIFY:
      return Object.assign({}, state, { activeClassify: action.data });
    default:
      return state;
  }
};

export default classifyList;
