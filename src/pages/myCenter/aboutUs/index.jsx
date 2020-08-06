import React from "react";
import history from "@/util/history";
import TopBar from "@/components/topBar";
import logo from "@/assets/images/logo.png";
import "./index.less";
class AboutUs extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='aboutUs'>
        <TopBar name="关于商城"  className='topBar'/>
        <div className='content' >
          <div className='logoView'>
          <img className='logo' src={logo}></img>
          </div>
          
          <div className='bottomView'>
            <div className='name'>杭州康策网络科技有限公司</div>
            <div className='yname'>HangZhou KangCe Network Technology Co.LTD Copyright2017-2020 All Rights Reserved</div>
          </div>
        </div>
      </div>
    );
  }
}
export default AboutUs;
