'use strict';
import React,{Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native'

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <View style = {styles.mainView}></View>
    );
  }
}


const styles = StyleSheet.create({
  mainView:{
    flex:1,
    backgroundColor:'yellow'
  }

});
