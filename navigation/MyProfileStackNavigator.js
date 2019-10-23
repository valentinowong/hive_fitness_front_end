import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MemberProfileScreen from '../screens/MemberProfileScreen';
import MemberWorkoutsScreen from '../screens/MemberWorkoutsScreen';
import ChatFeedScreen from '../screens/ChatFeedScreen';


const MyProfileStackNavigator = createStackNavigator(
  {
    MyProfile: MemberProfileScreen,
    MemberWorkouts: ChatFeedScreen,
  },
  {
    initialRouteName: 'MyProfile'
  }
);

export default MyProfileStackNavigator;