import React from "react";
import history from "@/util/history";
import TopBar from "@/components/topBar";
import { connect } from "react-redux";
import * as actions from "@/store/actions/login";
import "./index.less";

@connect(state => ({
  ...state.login,
}))
class HelpCenter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.getPlatformInfo());
  }

  render() {

    const data = {
      buy:[{question:'1、订单付款以后，多久发货？',answer:'答：一般当日订单当日发货，最晚不超过72小时。'},
      {question:'2、订单什么时候自动确认收货？',
      answer:'答：亲，可以到【个人中心】—【我的订单】找到具体的订单，点击“订单详情”查看该笔交易超时时间。实物类订单，自“卖家已发货”状态起的10天后，系统会自动确认收货。'},
      {question:'3、什么时候可以发起申请退款？',
      answer:'答：交易成功前，可以随时发起“申请退款”；交易成功后，在订单交易完成后的0-15天内可以发起“申请退款”。'},
      {question:'4、优惠券使用规则？',
      answer:'答：同一订单只可使用一张优惠券。使用条件可至【个人中心】—【优惠券】查看优惠券的使用条件。'},
      {question:'5、订单发生退款，优惠券是否退还？',
      answer:'答：使用优惠券的订单，若买家在订单状态为等待卖家发货时申请退款，系统自动返还优惠券；其他订单状态下申请退款，优惠券均不返还。'},
      {question:'6、买家的订单申请退款后，钱款退回到哪里？',
      answer:'订单钱款原路退回。'}],
      sell:[{question:'1、买家收到货后，不点击确认收货怎么办？',answer:'卖家可以联系买家确认，同时系统会在卖家发货的7天后自动为买家确认收货。'},
      {question:'2、平台交易是否需要手续费？',answer:'订单交易暂不收取手续费。'},
      {question:'3、平台商家提现规则？',answer:'商家每月提现次数不限，单笔提现金额不低于100元，每笔提现收取提现金额的2%作为手续费。'},]
    }
    return (
      <div className='helpCenter'>
        <TopBar name="帮助中心"  className='topBar'/>
        <div className='content' >
          <div className='titleView'>常见问题</div>
          {data.buy.map((item)=>{
            return (<div className='qa'>
            <div className='question'>{item.question}</div>
            <div className='answer'>{item.answer}</div>
            <div className='lineView'></div>
          </div>);
          })}
          <div className='lineView'></div>
          {/* <div className='titleView'>卖家常见问题</div>
          {data.sell.map((item)=>{
            return (<div className='qa'>
            <div className='question'>{item.question}</div>
            <div className='answer'>{item.answer}</div>
            <div className='lineView'></div>
          </div>);
          })}
          <div className='lineView'></div> */}
        <div className='footerView'>如有其它问题，您可通过{this.props.service_phone}联系康策良品客服小二咨询。</div>
        </div>
      </div>
    );
  }
}
export default HelpCenter;
