'use strict'
import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

import '../GlobalVar/GlobalConstVar.js'

export default class MSNavBar extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const {title,leftTitle,leftImage,leftAction,rightTitle,rightImage,rightAction,barTinColor} = this.props;
    return(
        //在冲突值的情况下，从最右边元素的值将会优先，并且 falsy 值如 false，undefined 和 null 将被忽略。一个常见的模式是基于某些条件有条件地添加一个样式
      <View style = {[styles.container,barTinColor && {backgroundColor:barTinColor}]}>


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
    backgroundColor:'blue'
  },
  leftText:{

  }

});
