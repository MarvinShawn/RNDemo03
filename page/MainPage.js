'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native';

import HomePage from './HomePage.js';
import AnimationPage from './AnimationPage.js';
import NetWorkPage from './NetWorkPage.js';
import Icon from 'react-native-vector-icons/Ionicons';
import TodolistPage from './ToDoListPage.js';

export default class MainPage extends Component{
constructor(props){
  super(props);
  this.state = {
    homeFlag:true,
    cloudFlag:false,
    meFlag:false,
    todoFlag:false
  }
}


    _renderContent = () => {
      return (
        <HomePage />
      );
    };

    _renderAnimation = () => {
      return (
          <AnimationPage />
      );
    };
    _renderNetWork = () => {
        return(
          <NetWorkPage />
        );
    };

    _renderToDolist = ()=>{
      return(
          <TodolistPage />
      );
    };


  render(){
    return(
    <TabBarIOS
      unselectedTintColor = '#2c2c2c'
      tintColor = '#d81e06'
      barTinyColor='darkslateblue'>
      <Icon.TabBarItem
        iconName = "ios-home-outline"
        selectedIconName = "ios-home"
        renderAsOriginal
        selected={this.state.homeFlag}
        title="Home"
        onPress={() => {
              this.setState({
                homeFlag:true,
                cloudFlag:false,
                meFlag:false,
                todoFlag:false
              });
            }}>{this._renderContent()}
      </Icon.TabBarItem>

      <Icon.TabBarItem
        title = "Cloud"
        iconName = "ios-cloud-outline"
        selectedIconName = "ios-cloud"
        badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
        selected={this.state.cloudFlag}
        onPress= {()=>{
          this.setState({
            homeFlag:false,
            cloudFlag:true,
            meFlag:false,
            todoFlag:false
          });
        }}>{this._renderAnimation()}
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title = "Me"
          iconName = "ios-person-outline"
          selectedIconName = "ios-person"
          selected={this.state.meFlag}
          onPress={ () => {
            this.setState({
              homeFlag:false,
              cloudFlag:false,
              meFlag:true,
              todoFlag:false
            });
          }}
          >{this._renderNetWork()}
        </Icon.TabBarItem>

      <Icon.TabBarItem
        title = "ToDo"
        iconName = "ios-timer-outline"
        selectedIconName = "ios-timer"
        selected = {this.state.todoFlag}
        onPress={ () => {
          this.setState({
            homeFlag:false,
            cloudFlag:false,
            meFlag:false,
            todoFlag:true,
          })
        }}
        >{this._renderToDolist()}
      </Icon.TabBarItem>

    </TabBarIOS>
    );
  }
}

const styles=StyleSheet.create({
  tabContent:{
    flex:1,
    alignItems:'center'
  },
  tabText:{
    color:'white',
    margin:50
  }
});
