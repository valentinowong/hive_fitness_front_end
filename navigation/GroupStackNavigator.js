import React from 'react';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import MyGroupsScreen from '../screens/MyGroupsScreen';
import AddMembersScreen from '../screens/AddMembersScreen';
import NewGroupDetailsScreen from '../screens/NewGroupDetailsScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import EditAccountScreen from '../screens/EditAccountScreen';
// import AccountStackNavigator from './AccountStackNavigator';
// import NewGroupStackNavigator from './NewGroupStackNavigator';

const GroupStackNavigator = createStackNavigator(
    {
        Main: MainTabNavigator,
        MyGroups: MyGroupsScreen,
        MyAccount: MyAccountScreen,
        EditAccount: EditAccountScreen,
        AddMembers: AddMembersScreen,
        NewGroupDetails: NewGroupDetailsScreen,
    },
    {
      initialRouteName: 'MyGroups',
    }
  );
  
  export default GroupStackNavigator;
  