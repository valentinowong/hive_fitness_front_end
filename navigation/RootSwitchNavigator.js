import React from 'react';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import GroupStackNavigator from './GroupStackNavigator';

const RootSwitchNavigator = createSwitchNavigator(
  {
    Groups: GroupStackNavigator,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login'
  }
);

export default RootSwitchNavigator;
