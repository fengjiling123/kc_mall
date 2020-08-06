import React from "react";
import { Modal } from "antd-mobile";
import { connect } from "react-redux";
import * as actions from "@/store/actions/cache";
import "./index.less";

@connect()
class DelSearchHistoryModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClose, dispatch } = this.props;
    return (
      <Modal
        popup
        visible
        onClose={onClose}
        animationType="slide-up"
        className="--del-search-history-modal"
      >
        <div className="del-modal-content">
          <div className="title">是否确定清空历史记录？</div>
          <div className="buttons">
            <div className="cancel" onClick={onClose}>
              取消
            </div>
            <div
              className="ok"
              onClick={() => {
                dispatch(actions.setCache({ searchList: [] }));
                onClose();
              }}
            >
              确定
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default DelSearchHistoryModal;
