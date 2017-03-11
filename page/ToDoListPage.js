'use strict'
import React,{Component} from 'react'
import {
  StyleSheet,
  ListView,
  View,
} from 'react-native'


export default class TodoListPage extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <View style = {styles.containerStyle}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle:{
    flex:1,
    backgroundColor:'red',
  }

});
