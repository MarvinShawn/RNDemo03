'use strict'
import React,{Component} from 'react'
import {
  View,
  Text,
  Button,
  ListView,
  Image,
  RefreshControl,
  NavigationBar,
  Navigator,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'

import MSNavBar from './CustomView/MSNavBar.js';
import '../page/GlobalVar/GlobalConstVar.js';
export default class NetWorkPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  buttonClick = () => { //箭头函数 省略了绑定this的操作
      fetch('http://open3.bantangapp.com/recommend/index?app_id=com.jzyd.BanTang&app_installtime=1462985294&app_versions=5.7&channel_name=appStore&client_id=bt_app_ios&client_secret=9c1e6634ce1c5098e056628cd66a17a5&last_get_time=1463238932&os_versions=9.3.1&screensize=750&track_device_info=iPhone8&track_deviceid=476C2ABB-9058-4621-930B-158CBB91354B&v=12&page=0&pagesize=20',{method:'GET'})
      .then((response) => response.json())
      .then((responseData)=>{
      this.setState({

      });
    }).catch((error)=>{
        console.log(error);
    })
  };



  render(){
    return(
      <Navigator
        initialRoute = {{name:'BanTang',index:0}}
        renderScene = {(route,navigator) => <NetView />}
      />
    );
  }
}

class NetView extends Component {

  constructor(props) {

    super(props);
    var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2});
    this.arr = [{'title':'程博士我们走','likes':'125'}],
    this.state = {
        dataSource:ds.cloneWithRows(this.arr),
        isRefreshing:false,
    }
  }

  leftBarbuttonAction = ()=>{
    console.log('来这儿了');
    this.refs.NavBar.setState({
      color:'#ab2626'
    });

  };

  //cell布局
  _renderRow = (rowData,sectionID,rowID) => {
    return(
      <TouchableHighlight  >
      <View style = {styles.cellStyle}>
        <Image style = {styles.imageSize} source={require('../page/img/cellImage.png')}/>
        <Text style = {styles.TextStyle1}>{this.arr[rowID]['title']}</Text>
        <Text style = {styles.TextStyle2}>💗{this.arr[rowID]['likes']}</Text>
      </View>
      </TouchableHighlight>
    );
  };


//刷新操作
  _refreshData = ()=>{

      this.setState({
          isRefreshing:true,
      });
      fetch('http://open3.bantangapp.com/recommend/index?app_id=com.jzyd.BanTang&app_installtime=1462985294&app_versions=5.7&channel_name=appStore&client_id=bt_app_ios&client_secret=9c1e6634ce1c5098e056628cd66a17a5&last_get_time=1463238932&os_versions=9.3.1&screensize=750&track_device_info=iPhone8&track_deviceid=476C2ABB-9058-4621-930B-158CBB91354B&v=12&page=0&pagesize=20',{method:'GET'})
      .then((response) => response.json())
      .then((responseData)=>{
        this.arr = responseData['data']['topic']
        this.setState({
          isRefreshing:false,
          dataSource:this.state.dataSource.cloneWithRows(this.arr)
        });
    }).catch((error)=>{

        this.arr.push({'title':'皮皮虾，我们走','likes':'1235'})
        this.setState({
          isRefreshing:false,
          dataSource:this.state.dataSource.cloneWithRows(this.arr)
        });
        console.log(error);
    })
  };


  render(){
    return(
      <View style = {styles.container}>
        <MSNavBar
          ref = "NavBar"
          barTinColor ="#3ddfa0"
          title = "BanTang"
          leftImage = "ios-aperture"
          leftAction = {()=>this.leftBarbuttonAction()}
        />
        <ListView
          refreshControl={<RefreshControl
              refreshing = {this.state.isRefreshing}
              onRefresh = {this._refreshData}
              tintColor = "#FF0000"
              title = "加载中"
          />}
          automaticallyAdjustContentInsets={false} //自动偏移20像素的原因
          style= { styles.listView }
          dataSource={this.state.dataSource}
          renderRow= {this._renderRow}
        />
      </View>
    );
  }





}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'white',
  },
  listView:{
    backgroundColor:'orange',
    marginBottom:49
  },
  cellStyle:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'white'
  },
  imageSize:{
    width:global.constants.windowWidth,
    height:global.constants.windowWidth*0.8,
  },
  TextStyle1:{
    fontSize:17,
    marginTop:10,
    textAlign:'center'
  },
  TextStyle2:{
    fontSize:17,
    marginTop:5,
    marginBottom:5,
    textAlign:'center'
  }


});
