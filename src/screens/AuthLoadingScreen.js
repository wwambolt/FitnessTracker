//This code adapted from the react-navigation documentation for authentication flows.

import React, { Component } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

class AuthLoadingScreen extends Component {
    componentDidMount() {
      this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
      return (
      <SafeAreaView style={{backgroundColor: '#800020'}}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
        <Text>LOADING SCREEN</Text>
      </SafeAreaView>
      );
  }
};

export default AuthLoadingScreen;