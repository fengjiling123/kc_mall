import React from "react";
import history from "@/util/history";
import TopBar from "@/components/topBar";
import Alert from "@/components/alertModal"
import { connect } from "react-redux";
import storeRight from "@/assets/images/ic_order_store_right.png";
import "./index.less";

@connect(state => ({
  ...state.login,
}))
class ChooseShopType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneVisible:false
    }
  }
  callAction= ()=> {
    console.log('打电话')
    this.setState({
      phoneVisible:true
    })
  }
  cancelAction = () => {
    this.setState({
      phoneVisible:false
    })
  }
  confirmAction = () => {
    this.setState({
      phoneVisible:false
    })
  }
  selectRow(index) {
    var type = index+1;
    history.push('/applyopenshop/company?type='+type)
  }
  render() {
    const data = [{title:'个人卖家入驻',desc:'需要上传身份证正反面照'},
    {title:'个体工商户入驻',desc:'需要上传身份证正反面照、个体工商户营业执照'},
    {title:'企业入驻',desc:'需要上传法人身份证正反面照、企业营业执照、企业开户许可证'}]
    return (
      <div className='chooseShopType'>
        <TopBar className='topBar' name="选择入驻类型" rightTitle='联系客服' onRightClick={this.callAction} />
        <div className='content'>
          {data.map((item,index)=>{
            return (<div key={index} className='address-item' onClick={this.selectRow.bind(this,index)}>
            <div className='itemContent'>
              <div className='topView'>
                <div className='leftView'>
                  {item.title}
                </div>
                <img className='goImg' src={storeRight}></img>
              </div>
              <div className='address'>{item.desc}</div>
            </div>
            
          </div>)
            
          })}
          <Alert visible={this.state.phoneVisible} phone={this.props.service_phone} 
        onCancel={this.cancelAction} onConfirm={this.confirmAction}></Alert>
        </div>
      </div>
    );
  }
}
export default ChooseShopType;
