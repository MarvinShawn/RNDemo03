'use strict'
import React,{Component} from 'react'
import {
  View,
  Text,
  Button,
  ListView,
  NavigationBar,
  Navigator,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'

import MSNavBar from './CustomView/MSNavBar.js';

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
      this.setState({

      });
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
  }

  render(){
    return(
      <View style = {styles.container}>
        <MSNavBar barTinColor="#3ddfa0"/>
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

});
