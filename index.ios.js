/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import MainPage from './page/MainPage.js';


export default class RNDemo03 extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <MainPage />
      </View>
    );
  }
}

AppRegistry.registerComponent('RNDemo03', () => RNDemo03);
