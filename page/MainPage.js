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
import Icon from 'react-native-vector-icons/Ionicons'

export default class MainPage extends Component{
constructor(props){
  super(props);
  this.state = {
    selectedTab:'blueTab',
    notifCount:0,
    presses:0,
  }
}


    _renderContent(color:string,pageText:string,num?:number){
      return (
        <HomePage />
      );
    }

    _renderAnimation(){
      return (
          <AnimationPage />
      );
    }
    _renderNetWork(){
        return(
          <NetWorkPage />
        );
    }


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
        selected={this.state.selectedTab === 'blueTab'}
        title="Home"
        onPress={() => {
              this.setState({
                selectedTab:'blueTab',
              });
            }}>{this._renderContent('#414A92','Blue Tab')}
      </Icon.TabBarItem>

      <Icon.TabBarItem
        title = "Cloud"
        iconName = "ios-cloud-outline"
        selectedIconName = "ios-cloud"
        badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
        selected={this.state.selectedTab === 'redTab'}
        onPress= {()=>{
          this.setState({
            selectedTab:'redTab',
            notifCount: this.state.notifCount + 1
          });
        }}>{this._renderAnimation()}
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title = "Me"
          iconName = "ios-person-outline"
          selectedIconName = "ios-person"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={ () => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}
          >{this._renderNetWork()}
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
