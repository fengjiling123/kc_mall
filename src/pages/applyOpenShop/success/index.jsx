import React from "react";
import history from "@/util/history";
import TopBar from "@/components/topBar";
import { connect } from "react-redux";
import Alert from "@/components/alertModal"
import * as seller from "@/store/actions/seller";
import qs from 'qs';
import "./index.less";
@connect(state => ({
  ...state.seller,
  ...state.login,
}))
class Commitment extends React.Component {
  constructor(props) {
    super(props);
    this.state ={

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

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(seller.getSeller());
  }

  goCertificatePage() {
    history.push('/applyopenshop/shopcertificate')
  }
  render() {

    return (
      <div className='success'>
        <TopBar className='topBar' rightTitle='联系客服'
          onRightClick={this.callAction}  />
        <div className='content'>
          <div className='title'>您已成功入驻</div>
          <div className='p'>您可以登录商户端进行管理商铺，如有疑问可以拨打客服电话进行联系</div>
          <div className='p'>商户端链接地址：{this.props.seller?this.props.seller.url:''}</div>
          <div className='p'>您的登录账号：{this.props.seller?this.props.seller.phone:''}</div>
          <div className='shopCertificate' onClick={this.goCertificatePage}>
          查看店铺经营证明
          </div>

          <Alert visible={this.state.phoneVisible} phone={this.props.service_phone} 
        onCancel={this.cancelAction} onConfirm={this.confirmAction}></Alert>
        </div>
      </div>
    );
  }
}
export default Commitment;
