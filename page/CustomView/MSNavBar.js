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
