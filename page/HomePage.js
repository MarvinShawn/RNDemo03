'use strict';
import React,{Component,PropTypes} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Image,
  Text,
  RefreshControl,
  TouchableOpacity,
  NavigatorIOS,
} from 'react-native';

import DetailPage from './DetailPage.js';

export default class HomePage extends Component {

  _onRightButtonPress(){
    this.refs.nav.push({
      component: DetailPage,
      title: 'Scene2'
    });
  }
  render(){
    return(
      <NavigatorIOS
        ref = 'nav'
        initialRoute = {{  //初始化导航条
          component:MyScene,
          title:'Scene1',
          rightButtonSystemIcon:'compose',
          onRightButtonPress:() => this._onRightButtonPress()
        }}

        style = {styles.navigatorStyle}
        />
    );
  }
}

var dataArr = ['John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin']

class MyScene extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(dataArr),
      isRefreshing:false
    }
  }

  _renderSeperator(){
    return (
          <View
            key={Math.random().toString()}
            style={{
              height:1,
              backgroundColor:'#77649c',
            }}
          />
        );
  }

  _onPressCell(title:string){
    this.props.navigator.push({
      component: DetailPage,
      title: title
    });
  }


  _renderRow(rowData:string ,sectionID:number, rowId:number){
    var imgSource = THUMB_URLS[rowId];
    return(
    <TouchableOpacity activeOpacity = {0.5} onPress = {() => this._onPressCell(rowData)} >
        <View>
          <View style = {styles.rowStyle}>
            <Image style = {styles.thumbSize}
              source = {imgSource}
              >
            </Image>
            <Text style = {styles.textStyle}>
              {rowData + '我是测试的行号'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _onRefresh(){
    this.setState({isRefreshing:true});
    //延时3秒
    setTimeout(()=>{
      dataArr.push('MarvinShawn')
      this.setState({
        isRefreshing:false,
        dataSource:this.state.dataSource.cloneWithRows(dataArr)
      });
    },3000);


  }

  render(){
    return(
        <ListView
            style = {styles.listView}
            renderSeparator = {()=>this._renderSeperator()}
            dataSource = {this.state.dataSource}
            renderRow = {this._renderRow.bind(this)}
            refreshControl={<RefreshControl
                refreshing = {this.state.isRefreshing}
                onRefresh = {()=>this._onRefresh()}
                tintColor = "#FF0000"
                title = "加载中"
            />}
        >

        </ListView>

    );
  }
}

var THUMB_URLS = [
  require('./img/阿里游戏.png'),
  require('./img/快递.png'),
  require('./img/亲密付.png'),
  require('./img/淘宝.png'),
  require('./img/校园一卡通.png'),
  require('./img/余额宝.png'),
  require('./img/娱乐宝.png'),
  require('./img/支付宝钱包.png'),
  require('./img/校园一卡通.png')
];

const styles = StyleSheet.create({
  navigatorStyle:{
    flex:1
  },
  mainView:{
    flex:1,
    padding:64,
    backgroundColor:'blue'
  },
  rowStyle:{
    flexDirection:'row',
    justifyContent:'center',
    padding:10,
    backgroundColor:'#F6F6F6',
  },
  thumbSize:{
    width:50,
    height:50,
  },
  textStyle:{
    marginLeft:10,
    padding:15,
    flex:1,
    height:44,
    color:'green',
  },
  listView:{
    flex:1,
  }
});
