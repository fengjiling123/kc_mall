import React from "react";
import * as ReactDOM from "react-dom";
import history from "@/util/history";
import { ListView,PullToRefresh } from 'antd-mobile';
import { connect } from "react-redux";
import TopBar from "@/components/topBar";
import "./index.less"
import http from "@/util/http";
import * as actions from '../../../store/actions/address';
import storeRight from "@/assets/images/ic_order_store_right.png";
import qs from 'qs';
import Auth from '@/components/auth';


@connect(state => ({
  ...state.address
}))
@Auth
class MyAddress extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      refreshing: true,
      isLoading: true,
      dataSource,
      isEdit:false,
      height: document.documentElement.clientHeight
    }
    this.data = null;
    this.page = 1;
    props.cacheLifecycles.didRecover(this.componentDidRecover);
  }
  componentWillMount() {
    const params = qs.parse(window.location.search.split('?')[1])
    // params.state
    if(params.type == 'edit') {
      this.setState({
        isEdit:true
      })
    }
    this.sendDataRequest(this.page);
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.setState({
      height: hei
    });
  }

  componentDidRecover= ()=> {
    this.sendDataRequest(this.page);
  }
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    this.page = 1;
    this.sendDataRequest(this.page);
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading) {
      return;
    }
    this.setState({ isLoading: true });
    this.page = this.page+1;
    this.sendDataRequest(this.page);
  };

  sendDataRequest(page) {
    var url = '/receiving.list';
    var params = { page, limit: 10 };
    http({
      url,
      params
    }).then(res => {
      if (this.page == 1) {
        this.data = res.data.data.data;
        this.setState({
          refreshing: false,
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(this.data)
        });
      } else {
        this.data = [...this.data, ...res.data.data.data];
        console.log('data',this.data);
        this.setState({
          isLoading: false,
          refreshing: false,
          dataSource: this.state.dataSource.cloneWithRows(this.data)
        });
      }
    });
  }
  addAction = ()=> {
    history.push('/addaddress')
  }
  selectRow = (rowData)=> {
    if(this.state.isEdit) {
      history.push('/addaddress?id='+rowData.id)
    } else {
      const {dispatch} = this.props;
      dispatch(actions.selectAddress(rowData));
      history.goBack();
    }
  }
  render() {
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID} className='address-item' onClick={this.selectRow.bind(this,rowData)}>
          <div className='itemContent'>
            <div className='topView'>
              <div className='leftView'>
                {rowData.is_default==1&&<div className='tag'>默认</div>}
                <div className='name'>{rowData.name}</div>
                <div className='mobile'>{rowData.phone}</div>
              </div>
              <img className='goImg' src={storeRight}></img>
            </div>
            <div className='address'>{rowData.province_name+rowData.city_name+rowData.county_name+rowData.address}</div>
          </div>
          
        </div>
      );
    };

    return (
      <div className='myAddress'>
        <TopBar name="我的收货地址" className='topBar'
        rightTitle='添加新地址' onRightClick={this.addAction}/>
        <div className='content'>
        <ListView  style={{
            height: this.state.height
          }}
        key='1' className='listView'
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ height:'100px'}}>
        
        </div>)}
        renderRow={row}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached}
        pageSize={10}
      />
        </div>
      </div>
    );
  }
}
export default MyAddress;


