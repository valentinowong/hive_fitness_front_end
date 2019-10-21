import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MemberProfileScreen from '../screens/MemberProfileScreen';
import MemberWorkoutsScreen from '../screens/MemberWorkoutsScreen';

const MyProfileStackNavigator = createStackNavigator(
  {
    MyProfile: MemberProfileScreen,
    MemberWorkouts: MemberWorkoutsScreen,
  },
  {
    initialRouteName: 'MyProfile'
  }
);

export default MyProfileStackNavigator;