'use strict'
import React,{Component} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text
} from 'react-native'

import '../GlobalVar/GlobalConstVar.js';
import Icon from 'react-native-vector-icons/Ionicons';


export default class MSNavBar extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const {title,leftTitle,leftImage,leftAction,rightTitle,rightImage,rightAction,barTinColor} = this.props;
    return(
        //在冲突值的情况下，从最右边元素的值将会优先，并且 falsy 值如 false，undefined 和 null 将被忽略。一个常见的模式是基于某些条件有条件地添加一个样式
      <View style = {[styles.container,barTinColor && {backgroundColor:barTinColor}]}>
          {//左侧按钮或者文字
                (()=>{
                  if (leftTitle) {
                    return <TouchableOpacity onPress = {()=>leftAction()}>
                      <View style = {styles.textView}>
                        <Text style = {styles.textColor}>{leftTitle}</Text>
                      </View>
                    </TouchableOpacity>
                  }else if (leftImage) {
                      return <TouchableOpacity onPress = {()=>leftAction()}>
                        <View style = {styles.textView}>
                            <Icon name = {leftImage} size = {25}/>
                        </View>
                      </TouchableOpacity>
                  }
                })()
          }
          {
              //闭包表达式立即执行
            (()=>{
              if (title) {
                return <View style = {styles.titleView}>
                  <Text>{title}</Text>
                </View>
              }

            })()


          }
          {

            (()=>{
              if (rightTitle) {

              }else if (rightImage) {

              }

            })()

          }
      </View>

    );
  }

}

const styles = StyleSheet.create({

  container:{
    marginTop:20,
    height:44,
    width:global.constants.windowWidth,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'blue'
  },
  titleView:{
    alignSelf:'center',
    marginRight:global.constants.windowWidth*0.5-30,
  },
  textView:{
    flex:1,
    alignSelf:'flex-start',
    justifyContent:'center',
    marginLeft:10,
  },
  textColor:{
    color:'black',
  }

});
