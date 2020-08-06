import React from "react";
import history from "@/util/history";
import TopBar from "@/components/topBar";
import * as ReactDOM from "react-dom";
import http from "@/util/http";
import { ListView,PullToRefresh,ActivityIndicator } from 'antd-mobile';
import unselect from "@/assets/images/unselect.png";
import select from "@/assets/images/xieyitongyi.png";
import "./index.less"
import _ from 'lodash'
import Auth from "@/components/auth";
 
@Auth
class MyCollection extends React.Component {
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
      selectIds:[],
      allSelect:false,
      height: document.documentElement.clientHeight
    }
    this.data = null;
    this.page = 1;

  }
  componentWillMount() {
    this.sendDataRequest(this.page);
  }
  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.setState({
      height: hei
    });
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
  
    var url = '/user.collection.paging';
    var params = { page, limit: 10 ,type:1};
    http({
      url,
      params
    }).then(res => {
      console.log('data',res);
      if (this.page == 1) {
        this.data = res.data.data.data;
        this.setState({
          refreshing: false,
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(this.data)
        });
      } else {
        this.data = [...this.data, ...res.data.data.data];
        this.setState({
          isLoading: false,
          refreshing: false,
          dataSource: this.state.dataSource.cloneWithRows(this.data)
        });
      }
    }).catch(res => {
      this.setState({
        isLoading: false,
        refreshing: false,
      })
    });;
  }
  editAction = ()=> {
    this.setState({
      isEdit:!this.state.isEdit,
    })
  }
  selectRow = (id,is_open)=> {
    if(this.state.isEdit) {
      //选中或取消
      var result = this.state.selectIds.find((item)=>{
        if(id === item) {
          return true;
        } else {
          return false;
        }
      })
      var ids = this.state.selectIds;
      if(result) {
        //取消
        _.remove(ids, (item) => {
          return item === id;
        });
        console.log(ids);
      } else {
        //选中
        ids.push(id);
      }
      var allSelect = false;
      if(this.data.length == ids.length) {
        allSelect = true
      }
      this.setState({
        selectIds:ids,
        allSelect
      })
    } else {
      //进入详情
      if(is_open) {
        history.push('/goodsdetail/'+id)
      }
      
    }
  }
  handleCancelAction = () => {
    this.sendDeleteRequest()
  }
  handleAllSelect = () => {
    console.log('点击')
    if(this.state.allSelect) {
      this.setState({
        allSelect:false,
        selectIds:[]
      })
    } else {
      var allIds = this.data.map((item) => {
        return item.collection_info.id;
      })
      this.setState({
        allSelect:true,
        selectIds:allIds
      })
    }
    
  }
  sendDeleteRequest() {
    if(this.state.selectIds.length < 1) {
      return;
    }
    var params = {ids:this.state.selectIds,type:1};
    var url = '/user.collection.delete';
    this.setState({
      isLoading:true
    })
    http({
      url,
      data:params,
      method:'delete'
    }).then(res => {
      this.onRefresh();
      this.setState({
        isLoading:false
      })
    }).catch(res => {
      this.setState({
        isLoading:false
      })
    });
  }

  checkStatus(id) {
    var result = this.state.selectIds.find((item)=>{
      if(id === item) {
        return true;
      } else {
        return false;
      }
    })
    return result?select:unselect;
  }
  render() {
   const {isEdit} = this.state;

   const row = (rowData, sectionID, rowID) => {
     if (!rowData.collection_info) {
       return <div></div>
     }
    return (
      <div key={rowID} className='collection-item' onClick={this.selectRow.bind(this, rowData.collection_info.id,rowData.collection_info.is_open)}>
        <div className='itemContent'>
          {isEdit &&<img src={this.checkStatus(rowData.collection_info.id)} className='selectImg'></img>}
          
          <div className="rightContent">
            <div className="cover">
              <img src={rowData.collection_info.cover} />
            </div>
            <div className='textContent'>
              <div className="goods-name line-clamp-two">
                {rowData.collection_info.brand} {rowData.collection_info.name}
              </div>
              <div className="tags">
                {Number(rowData.collection_info.freight) === 0 && 
                <span className="tag">包邮</span>}
                {rowData.collection_info.activity === 3 && (
              <span className="tag">
                满
                {Number(
                  rowData.collection_info && rowData.collection_info.activity_reach_money
                )}
                减
                {Number(rowData.collection_info && rowData.collection_info.activity_reduce_money
                )}
              </span>
            )}
              </div>
              {rowData.collection_info.is_open===1?<div className="price-count">
                <span className="price">
                  ￥ <span>{parseFloat(rowData.collection_info.price)}</span>
                </span>
                <span className="count">{rowData.collection_info.sales}人已购买</span>
              </div>:
            <div className='xiajia'>已下架</div>}
            </div>
          </div>
        </div>
      </div>
    );
  };


    return (
      <div className='myCollection'>
        <TopBar name="我的收藏" className='topBar'
        rightTitle={isEdit?'完成':'编辑'} onRightClick={this.editAction} />
        <div className='content'>
        <ListView   style={{
            height: this.state.height
          }}
        key='1' className='listView'
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ height:'100px'}}>
        
        </div>)}
        renderRow={row}
        useBodyScroll={false}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached}
        pageSize={10}
      />
      {this.state.isEdit && 
      <div className='bottomView'>
        <div className='bottom-left' onClick={this.handleAllSelect}>
        <img src={this.state.allSelect?select:unselect} className='selectImg'></img>
        <div>全选</div>
        </div>
        <div className='cancelBtn' onClick={this.handleCancelAction}>取消收藏</div>
      </div>}
        </div>
        <ActivityIndicator
                toast
                text="Loading..."
                animating={this.state.isLoading}
              />
      </div>
    );
  }
}
export default MyCollection;


