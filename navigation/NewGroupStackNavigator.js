import React from 'react';
import { createStackNavigator } from 'react-navigation';
import AddMembersScreen from '../screens/AddMembersScreen';
import NewGroupDetailsScreen from '../screens/NewGroupDetailsScreen';

const NewGroupStackNavigator = createStackNavigator(
    {
        AddMembers: AddMembersScreen,
        NewGroupDetails: NewGroupDetailsScreen,
    },
    {
      initialRouteName: 'AddMembers'
    }
  );
  
  export default NewGroupStackNavigator;