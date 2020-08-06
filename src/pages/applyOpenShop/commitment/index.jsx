import React from "react";
import history from "@/util/history";
import TopBar from "@/components/topBar";
import "./index.less"
class Commitment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='commitment'>
        <TopBar name="商家诚信经营承诺书" className='topBar' />
        <div className='content'>
        <p>为共同构建诚信、透明的网络消费环境，共同维护公平、规范的网络经营秩序，
            共同促进电子商务生态系统的健康持续发展，
            本店（本人）特向广大网民及康策良品承诺如下：</p>
        <p>一、 不参与、不加入、不组建任何交易信用炒作组织（该交易信用包括商品销量、评价、DSR评分等）； </p>
        <p>二、 不进行 任何交易信用炒作行为，保证每一笔交易内容、交易信用均为真实、可信，绝无虚构、炒作行为。</p>
        <p>三、 不发布、不传播、不推广任何有关交易信用炒作的违规信息，并积极举报此类违规信息；</p>
        <p>四、 积极接受广大网民及康策良品网的监督，严格遵守、积极维护康策良品交易信用体系的各项规则；</p>
        <p>四、 若本店违反康策良品网交易信用体系的各项规则，
          本店愿意接受康策良品的相应处理措施，并承担因此引发的相关责任。 </p>
        <p>本店郑重承诺：本店将始终恪守上述承诺，不进行任何形式的交易信用炒作行为，严格遵守国家法律法规及康策良品的相关规定，
          诚信、公平、规范地开展经营活动。 </p>
        </div>
      </div>
    );
  }
}
export default Commitment;
