'use strict'
import React,{Component} from 'react'
import {
  StyleSheet,
  ListView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';


const reducer = (state = 0,action) => {
  switch (action.type) {
    case 'PLUS': {
      return state + 1;
      break;
    }
    case 'DECR': {
      return state - 1;
      break;
    }
    default: return state
  }
};

const store = createStore(reducer)


export default class TodoListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:0
    }
    store.subscribe(this.test)
  }

  test = ()=>{
    this.setState({
        value:store.getState()
      }
    );
  };

  render(){
    return(
        <View style = {styles.containerStyle}>
            <TouchableOpacity style = {{flex:1,backgroundColor:"orange",justifyContent:"center"}}
              onPress={()=>store.dispatch({type:'PLUS'})}
              >
              <Text style = {{textAlign:"center"}}>
                +
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{flex:1,backgroundColor:"#D3DD56",justifyContent:"center"}}
              onPress={()=>store.dispatch({type:'DECR'})}
              >
              <Text style = {{textAlign:"center"}}>
                -
              </Text>
            </TouchableOpacity>
            <View style = {{flex:1,backgroundColor:"#E34456",justifyContent:"center"}}>
              <Text style = {{textAlign:"center"}}>
                {this.state.value}
              </Text>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle:{
    flex:1,
    marginTop:20,
    backgroundColor:'white',
  },
  plusButton:{


  }


});
