import React from "react";
import history from "@/util/history";
import TopBar from "@/components/topBar";
import { connect } from "react-redux";
import * as actions from "@/store/actions/login";
// import cooperrationbg from "@/assets/images/cooperrationbg.png"
import hezuoPoint from "@/assets/images/hezuoPoint.png"
import "./index.less";
let cooperrationbg = "http://e6kang.oss-cn-hangzhou.aliyuncs.com/kclp%2Fimages%2Fcooperrationbg.png"
@connect(state => ({
  ...state.login,
}))
class Cooperation extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.getPlatformInfo());
  }
  handleCallAction = ()=> {
    console.log(this.props.service_phone)
  }
  render() {
    return (
      <div className='cooperation'>
        <TopBar className='topBar' />
        <div className='content'>
          <div className='bgView' style={{backgroundImage: `url(${cooperrationbg})` }}>
            <div className='title'>欢迎加入康策良品供应商大家庭</div>
            <div className='desc'>如果您有货品资源，并且具备相关资质，可以为平台提供供应服务 </div>
            <div className='desc'>康策良品欢迎一切正直，有优质品格的供应商朋友，加入康策良品的供应链</div>
          </div>
          <div className='centerTitle'>我们的原则</div>
          <div className='itemView'>
            <div className='leftView'>
              <img className='pointView' src={hezuoPoint}></img>
            </div>
            <div className='rightView'>廉洁正直的合作关系</div>
          </div>
          <div className='itemView'>
            <div className='leftView'>
              <img className='pointView' src={hezuoPoint}></img>
            </div>
            <div className='rightView'>互助互补，互利共赢的合作模式</div>
          </div>
          <div className='itemView'>
            <div className='leftView'>
              <img className='pointView' src={hezuoPoint}></img>
            </div>
            <div className='rightView'>致力于长期，战略性合作</div>
          </div>
          <div className='bottomView'>欢迎致电了解详情。</div>

          <div className='btn'>
          <a className='a' href={'tel:'+this.props.service_phone}>立即联系</a>
            </div>
        </div>
      </div>
    );
  }
}
export default Cooperation;
