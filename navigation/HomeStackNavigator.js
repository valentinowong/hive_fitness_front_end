import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen'
import MembersScreen from '../screens/MembersScreen'
import MemberProfileScreen from '../screens/MemberProfileScreen'
import GroupStatsScreen from '../screens/GroupStatsScreen'
import WeekStatsScreen from '../screens/WeekStatsScreen'
import PenaltiesScreen from '../screens/PenaltiesScreen'


const HomeStackNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Members: MembersScreen,
        MemberProfile: MemberProfileScreen,
        GroupStats: GroupStatsScreen,
        WeekStats: WeekStatsScreen,
        Penalties: PenaltiesScreen,
    },
    {
      initialRouteName: 'Home'
    }
);
  
export default HomeStackNavigator;
  
  