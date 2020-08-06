import React from "react";
import history from "@/util/history";
import "./index.less";
import TopBar from "@/components/topBar";
import Alert from "@/components/alertModal"
import http from "@/util/http";
import * as actions from "../../store/actions/login";
import * as seller from "../../store/actions/seller";
import { connect } from "react-redux";
import kuaisu from "@/assets/images/kuaisu.png";
import hezuo from "@/assets/images/hezuo.png";
import liuliang from "@/assets/images/liuliang.png";
import gongju from "@/assets/images/gongju.png";
import xitong from "@/assets/images/xitong.png";
import shenqing from "@/assets/images/shenqing.png";
import Auth from '@/components/auth';

@connect(state => ({
  ...state.seller,
  ...state.login,
}))
@Auth
class ApplyOpenShop extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      phoneVisible:false
    }
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.getPlatformInfo());
    dispatch(seller.getSeller());
  }
 
  goApply = () => {
    const {seller} = this.props;
    if(seller) {
      switch (seller.check_status) {
        case -1:
            history.push('/applyopenshop/chooseshoptype');
          return;
        case 0:
          return;
        case 1:
            history.push("/applyopenshop/result");
          return ;
        case 2:
            history.push('/applyopenshop/chooseshoptype');
          return ;
  
      }
    }
    history.push('/applyopenshop/chooseshoptype');
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

  getStatusBtn() {
    const { seller } = this.props;
    if (seller) {
      switch (seller.check_status) {
        case -1:
          return { className: 'button', title: '立即入驻' };
        case 0:
          return { className: 'buttonN', title: '入驻申请中' };
        case 1:
          return { className: 'button', title: '已通过,立即查看' };
        case 2:
          return { className: 'buttonN', title: '已拒绝,重新申请' };

      }
    }
    return { className: 'button', title: '立即入驻' };
  }
  render() {
    const listData = [{img:kuaisu,title:'快速开店',des:'一键快捷注册，0门槛，省时省力'},

    {img:hezuo,title:'多种合作模式',des:'支持商家入驻、托管合作、供应商合作，让您灵活经营'},
    {img:liuliang,title:'多渠道流量来源',des:'为您赋能多种社交玩法，助力玩转多种流量渠道'},
    {img:gongju,title:'完善的营销工具',des:'完善的营销工具'},
    {img:xitong,title:'系统化管理客户',des:'多功能商家后台，了解客户标签画像，精准营销'}]

    const {seller} = this.props;

   
    return (
      <div className='applyOpenShop'>
        <TopBar className='topBar' rightTitle='联系客服' onRightClick={this.callAction}/>
        <div className='content'>
            <div className='title'>
              <img className='imageView' src={shenqing}></img>
            </div>
            {listData.map((item, index)=>{
              return (<div className='item' key={index}>
                <div className='topView'>
                  <img src={item.img} className='img'></img>
                  <div>{item.title}</div>
                </div>
                <div className='bottomView'>{item.des}</div>
              </div>)
            })}
            <div className={this.getStatusBtn().className} 
            onClick={this.goApply}>{this.getStatusBtn().title}</div>
          
        </div>
        <Alert visible={this.state.phoneVisible} phone={this.props.service_phone} 
        onCancel={this.cancelAction} onConfirm={this.confirmAction}></Alert>
      </div>
    );
  }
}
export default ApplyOpenShop;


