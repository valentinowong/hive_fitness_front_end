import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MyAccountScreen from '../screens/MyAccountScreen';
import EditAccountScreen from '../screens/EditAccountScreen';

const AccountStackNavigator = createStackNavigator(
    {
        MyAccount: MyAccountScreen,
        EditAccount: EditAccountScreen,
    },
    {
      initialRouteName: 'MyAccount'
    }
  );
  
  export default AccountStackNavigator;
  