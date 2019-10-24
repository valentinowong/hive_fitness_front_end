import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MemberProfileScreen from '../screens/MemberProfileScreen';
import MemberWorkoutsScreen from '../screens/MemberWorkoutsScreen';
import ChatFeedScreen from '../screens/ChatFeedScreen';
import EditGoalsScreen from '../screens/EditGoalsScreen';


const MyProfileStackNavigator = createStackNavigator(
  {
    MyProfile: MemberProfileScreen,
    MemberWorkouts: ChatFeedScreen,
    EditGoals: EditGoalsScreen,
  },
  {
    initialRouteName: 'MyProfile'
  }
);

export default MyProfileStackNavigator;