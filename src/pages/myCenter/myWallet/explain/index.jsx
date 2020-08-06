import React from "react";
import TopBar from "@/components/topBar";
import "./index.less";

class WalletExplain extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="--wallet-explain">
        <TopBar name="钱包说明" />
        <div className="scroll-view">
          <div style={{ fontSize: ".16rem", lineHeight: ".3rem" }}>
            <span className="color-bold">一、可提现：</span>
            <span>
              用户交易完成后，待订单超过15天售后期，所得佣金才是您的可提现佣金，在此之前都是您的预估收入。
            </span>
          </div>
          <div style={{ fontSize: ".16rem", lineHeight: ".3rem" }}>
            <span className="color-bold"> 二、上月预计收入：</span>
            <span>
              指上一个自然月内，即上月1日到月底最后一天已经确认收货的预估收入数据。
            </span>
          </div>
          <div style={{ fontSize: ".16rem", lineHeight: ".3rem" }}>
            <span className="color-bold">三、本月预估收入：</span>
            <span>
              指本自然月内，即本月1日到对应查看日期已经确认收货的预估收入数据。
            </span>
          </div>
          <div className="color-bold" style={{ marginTop: ".16rem" }}>
            常见问题
          </div>
          <div className="color-bold" style={{ marginTop: ".1rem" }}>
            什么样的订单会产生收入？
          </div>
          <div> 1、钻石用户自购；</div>
          <div>2、钻石用户邀请的专属粉丝自购；</div>
          <div>3、购买钻石用户分享的商品。</div>
          <div className="color-bold" style={{ marginTop: ".16rem" }}>
            提现什么时候到账？
          </div>
          <div> 每个月的10号和25号，是提现审核日，具体到账细则如下：</div>
          <div>1、10号审核上月25日至本月9日的提现申请；</div>
          <div>2、25日审核本月10日至本月24日的提现申请；</div>
          <div>3、提现通常在审核日后1-3个工作日内到账。</div>
          <div className="color-bold" style={{ marginTop: ".16rem" }}>
            提现到账方式有哪些？
          </div>
          <div>目前提现仅可选择支付宝。 </div>
          <div className="color-bold" style={{ marginTop: ".16rem" }}>
            为什么收入对不上？
          </div>
          <div>
            收入按照买家实付金额来计算，如果买家在订单交易成功之后发生退款，相应收入也会减去。
          </div>
          <div className="color-bold" style={{ marginTop: ".16rem" }}>
            如何获取更多收入？
          </div>
          <div>1、多分享商品；</div>
          <div> 2、多邀请好友注册购买；</div>
          <div> 3、理性消费多购买。</div>
        </div>
      </div>
    );
  }
}

export default WalletExplain;
