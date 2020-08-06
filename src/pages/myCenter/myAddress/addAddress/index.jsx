import React from "react";
import history from "@/util/history";
import TopBar from "@/components/topBar";
import { Switch,List,Picker,ActivityIndicator } from 'antd-mobile';
import http from "@/util/http";
import Alert from "@/components/alertModal"
import "./index.less"
import qs from 'qs';

import storeRight from "@/assets/images/ic_order_store_right.png";

class AddAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit:false,
      deleteVisible:false,
      animating:false,
      area: null, //选择后显示的完整省市区
      areaValue: [0, 0, 0],//选择记录
    }
    this.id = null;
  }
  componentDidMount() {
    const params = qs.parse(window.location.search.split('?')[1])
    if(params && params.id) {
      this.getAddressDetailData(params.id)
      this.setState({
        isEdit:true
      })
    }
    this.sendAreaRequest();
  }
  sendAreaRequest() {
    http({
      url: "/area.get",
    }).then(res => {
      var provincesList = res.data.data;
      var data = provincesList.map((province)=> {
        var province1 = {value:province.id,label:province.name}
        var citys = province.down.map((city)=>{
          var city1 = {value:city.id,label:city.name}
          var areas = city.down.map((area)=> {
            var area1 = {value:area.id,label:area.name};
            return area1;
          });
          city1.children = areas;
          return city1;
        })
        province1.children =citys;
        return province1;
      })
      this.setState({
        district:data
      })
      
    }).catch(res => {
      this.setState({
        animating:false
      })
    });
  }
  getAddressDetailData(id) {
    this.id =id;
    var params = { id: id }
    this.setState({
      animating:true
    })
    http({
      url: "/receiving.get",
      params
    }).then(res => {
      this.setState({
        animating:false
      })
      var data = res.data.data;
      var area = data.province_name + data.city_name + data.county_name;
      this.id = data.id;
      this.setState({
        name: data.name,
        mobile: data.phone,
        area: area, //选择后显示的地区
        detailAddress: data.address,
        isDefault: data.is_default,
        doorplate:data.doorplate,
        areaValue:[data.province_id,data.city_id,data.county_id]
      })
    }).catch(res => {
      this.setState({
        animating:false
      })
    });
    
  }
  
  addressPickerOnOk= (e)=> {
    console.log(e);
    var district= this.state.district
    var province = district.find((item) =>{
      return item.value === e[0];
    })
    var citys = province.children;
    var city = citys.find((item)=> {
      return item.value === e[1];
    })
    var areas = city.children;
    var area = areas.find((item)=>{
      return item.value === e[2];
    })

  this.setState({
    areaValue:e,
    area:province.label+city.label+area.label
  })
  }
  inputOnChange= (type, e)=> {
   
    this.setState({
      [type]:e.target.value
    })

  }
  deleteAction= ()=> {
    this.setState({
      deleteVisible:true
    })
  }
  deleteCancel= ()=> {
    this.setState({
      deleteVisible:false
    })
  }
  deleteConfirm= ()=> {
    this.setState({
      deleteVisible:false
    })
    this.deleteRequest();
  }
  saveAction= ()=> {
    const {name,mobile,detailAddress,isDefault,doorplate,isEdit,areaValue} = this.state;
    var params = { province_id: areaValue[0], city_id:areaValue[1],county_id:areaValue[2],
      name:name,phone:mobile,address:detailAddress,doorplate,is_default:isDefault?1:0};
    var url = '/receiving.add';
    if(isEdit) {
      url = '/receiving.edit';
      params.id = this.id;
    }
    this.setState({
      animating:true
    })
    http({
      url,
      params
    }).then(res => {
      this.setState({
        animating:false
      })
      history.goBack();
    }).catch(res => {
      this.setState({
        animating:false
      })
    });
  }

  checkParams() {

  }
  deleteRequest() {
    var params = {id:this.id};
    var url = '/receiving.delete';
    this.setState({
      animating:true
    })
    http({
      url,
      data:params,
      method:'delete'
    }).then(res => {
      this.setState({
        animating:false
      })
      history.goBack();
    }).catch(res => {
      this.setState({
        animating:false
      })
    });
  }
  render() {
   

    const {name,mobile,district,detailAddress,doorplate,isDefault,isEdit,
      deleteVisible,area,areaValue} = this.state;
    return (
      <div className='addAddress'>
        <TopBar name={isEdit ? '编辑收货地址' : '添加收货地址'} className='topBar'
          rightTitle='保存' onRightClick={this.saveAction} />
        <div className='content'>
          <div className='item'>
            <div>联系人</div>
            <div>
              <input type="text" value={name}
                placeholder="请输入联系人姓名" className='input'
                style={{ textAlign: "right" }}
                onChange={this.inputOnChange.bind(this, 'name')} />
            </div>
          </div>
          <div className='lineView'></div>
          <div className='item'>
            <div>联系电话</div>
            <div>
              <input type="text" value={mobile}
                placeholder="请输入联系电话" className='input'
                style={{ textAlign: "right" }}
                onChange={this.inputOnChange.bind(this, 'mobile')} />
            </div>
          </div>
          <div className='lineView'></div>
          <div className='item'>
            <div>所在地区</div>
            <Picker 
          data={district}
          value={areaValue}
          onOk={this.addressPickerOnOk}
          // onDismiss={e => console.log('dismiss', e)}
        >
          <div className='rightView'>
              <div className={area ? 'area' : 'selectArea'}>{area ? area : '请选择所在地区'}</div>
              <img className='goImg' src={storeRight}></img>
            </div>
        </Picker>
            
          </div>
          <div className='lineView'></div>
          <div className='item'>
            <div>详细地址</div>
            <div>
              <input type="text" value={detailAddress}
                placeholder="请输入详细地址" className='input'
                style={{ textAlign: "right" }}
                onChange={this.inputOnChange.bind(this, 'detailAddress')} />
            </div>
          </div>
          <div className='lineView'></div>
          <div className='item'>
            <div>邮政编码</div>
            <div>
              <input type="text" value={doorplate}
                placeholder="请输入邮政编码" className='input'
                style={{ textAlign: "right" }}
                onChange={this.inputOnChange.bind(this, 'doorplate')} />
            </div>
          </div>
          <div className='lineView'></div>

          <List.Item style={{ fontSize: '14px', marginTop: '10px',marginBottom: '10px' }}
            extra={<Switch platform="ios" color='#3776EC'
              checked={isDefault}
              onChange={() => {
                this.setState({
                  isDefault: !isDefault,
                });
              }}
            />}
          >设为默认地址</List.Item>
          {isEdit&&<div style={{background:'#fff', color:'#FFB516',fontSize:'14px',padding:'20px'}}
          onClick={this.deleteAction}>删除该收货地址</div>}

        </div>
        <Alert visible={deleteVisible} title='确定删除该收货地址吗？' 
        onCancel={this.deleteCancel} onConfirm={this.deleteConfirm}></Alert>
        <ActivityIndicator
                toast
                text="Loading..."
                animating={this.state.animating}
              />
      </div>
    );
  }
}
export default AddAddress;
