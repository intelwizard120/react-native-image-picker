import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { StackNavigator } from 'react-navigation'
import Login from './src/containers/Login'
import Profile from './src/containers/Profile';
import Signup from  './src/containers/Signup'
import Landing from './src/containers/Landing';

// Stack Navigator
export const Application = StackNavigator({
  Login:    {screen: Login},
  Signup:   {screen: Signup},
  Landing:  {screen: Landing},
  Profile:  {screen: Profile},
  }, {
    initialRouteName: 'Login'
  });

export default class App extends React.Component {
  render() {
    return <Application />;
  }
}
