'use strict'
import React,{Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  LayoutAnimation,
  StyleSheet
} from 'react-native'

export default class animation extends Component {
  constructor(props){
    super(props);
    this.state = {
      w:100,
      h:100
    }
    this._onPress = this._onPress.bind(this);
  }

  componentWillMount(){  //生命周期函数
    LayoutAnimation.spring();
  }

  _onPress(){
    LayoutAnimation.spring();
    this.setState({
      w:this.state.w + 15,
      h:this.state.h + 15
    })
  }

  _onBigPress(){
    LayoutAnimation.spring();
    this.setState({
      w:this.state.w - 15,
      h:this.state.h - 15
    })
  }

    render(){
      return (
        <View style = {styles.container}>
          <TouchableOpacity onPress = {()=>this._onBigPress()}>
            <View style={[styles.box,{width: this.state.w,height:this.state.h}]}/>
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=>this._onPress()}>
            <View style={styles.button}>
              <Text style = {styles.buttonText}>Press me!</Text>
            </View>
          </TouchableOpacity>
        </View>

      );
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection:'row', //子空间的布局方向
      justifyContent:'center',//水平方向
      backgroundColor:'green',
      alignItems: 'center',//竖直方向
    },
    box:{
      backgroundColor:'red',
      // alignSelf:'stretch'
    },
    button:{
      marginLeft:10,
      backgroundColor:'black',
      width:80,
      height:40
    },
    buttonText:{
      color:'white'
    }

});
