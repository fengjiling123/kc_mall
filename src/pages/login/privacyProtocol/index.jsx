import React from "react";
import history from "@/util/history";
import TopBar from "@/components/topBar";
// import "./index.less"
class PrivacyProtocol extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBack = () => {
    if (this.props.onBack) {
      this.props.onBack();
    }
  }

  render() {
    
    return (
      <div className='privacyProtocol'>
        <TopBar name="康策良品隐私协议" className='topBar' onBack={this.handleBack}/>
        <div className='content'>
        <iframe align="center" width="100%" height="100%" src="/康策隐私协议.html" 
        frameborder="no" border="0" marginwidth="0" marginheight="0" 
        scrolling="yes"></iframe>
        </div>
      </div>
    );
  }
}
export default PrivacyProtocol;
