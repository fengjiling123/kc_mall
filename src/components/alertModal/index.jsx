import React from "react";
import { Modal } from 'antd-mobile';
import "./index.less"
class AlertModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {visible,onCancel,onConfirm,title,cancelTitle,okTitle,phone} = this.props;
    console.log('phone',phone);
    return (
      <Modal maskClosable= {false}
          popup
          visible={visible}
          animationType="slide-up"
        >
          <div className='alertContent'>
            <div className='title'>{phone?'是否拨打客服电话 '+phone:title}</div>
            <div className='buttons'>
              <div className='cancel' onClick={onCancel}>{cancelTitle?cancelTitle:'取消'}</div>
              <div className='confirm' onClick={onConfirm}>
                {phone?<a className='a' href={'tel:'+phone}>{okTitle?okTitle:'确定'}</a>:
                <div>{okTitle?okTitle:'确定'}</div>}
              </div>
            </div>
          </div>
        </Modal>
    );
  }
}
export default AlertModal;
