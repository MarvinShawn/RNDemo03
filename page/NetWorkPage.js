'use strict'
import React,{Component} from 'react'
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'

export default class NetWorkPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content:'wait for more data...'
    }
  }
  _buttonClick(){
      fetch('https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json',{method:'GET'})
      .then((response) => response.json())
      .then((responseData)=>{
      this.setState({
        content:responseData.movies[0].posters.thumbnail,
      });
    }).catch((error)=>{
      this.setState({
        content:error.toString()
      });
    })
  }

  render(){
    return(
      <View style = {styles.container}>
        <TouchableHighlight
          onPress = {()=>this._buttonClick()}
          style = {styles.buttonStyle}
         >
           <Text>Click Me</Text>
         </TouchableHighlight>
         <Text style = {styles.contentStyle}>{this.state.content}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'white',
    justifyContent:'center',
  },
  buttonStyle:{
    marginTop:50,
    width:50,
    height:50,
    alignSelf:'center',
    backgroundColor:'green'
  },
  contentStyle:{
    flex:1,
    backgroundColor:'cyan',
  }

});
