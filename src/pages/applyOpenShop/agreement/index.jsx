import React from "react";
import history from "@/util/history";
import TopBar from "@/components/topBar";
// import "./index.less"
class Agreement extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div className='agress'>
        <TopBar name="康策良品平台合作协议" className='topBar' />
        <div className='content'>
        <iframe align="center" width="100%" height="100%" src="/平台合作协议.html" 
        frameborder="no" border="0" marginwidth="0" marginheight="0"
        scrolling="yes"></iframe>
        </div>
      </div>
    );
  }
}
export default Agreement;
