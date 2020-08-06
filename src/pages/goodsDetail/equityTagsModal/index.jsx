import React from "react";
import { Modal } from "antd-mobile";
import "./index.less";

class EquityTagsModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onClose, goodsDetail } = this.props;
    return (
      <Modal
        popup
        visible
        onClose={onClose}
        animationType="slide-up"
        afterClose={() => {}}
        className="--equity-tags-modal"
      >
        <div className="modal-content" onClick={onClose}>
          <div className="title">商品权益</div>
          <div className="equity-detail">
            {goodsDetail.is_quality_guarantee ? (
              <div>
                <div className="label">正品保证</div>
                <div className="detail">商家承诺，所有商品均为正品。</div>
              </div>
            ) : null}
            {goodsDetail.is_fast_delivery ? (
              <div>
                <div className="label">极速发货</div>
                <div className="detail">商家承诺，买家支付后72小时内发货。</div>
              </div>
            ) : null}
            {goodsDetail.is_privacy_distribution ? (
              <div>
                <div className="label">隐私配送</div>
                <div className="detail">
                  商家承诺，发货时外包装仅显示收货地址等必要信息，不出现购买商品的名称。
                </div>
              </div>
            ) : null}
            {goodsDetail.is_gratuitous_refund ? (
              <div>
                <div className="label">7天无理由退换</div>
                <div className="detail">
                  买家在签收商品之日起7天内，在不影响二次销售的情况下支持无理由退换货。
                </div>
              </div>
            ) : (
              <div>
                <div className="label">不支持7天无理由退换</div>
                <div className="detail">
                  特殊商品，一经售出，不支持非质量问题的退换货。
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    );
  }
}

export default EquityTagsModal;
