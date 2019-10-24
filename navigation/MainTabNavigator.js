import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeStackNavigator from './HomeStackNavigator';
import MyProfileStackNavigator from './MyProfileStackNavigator';
import ChatStackNavigator from './ChatStackNavigator';
import NewWorkoutStackNavigator from './NewWorkoutStackNavigator';

import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

HomeStackNavigator.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-home` : 'md-home'}
    />
  ),
};

HomeStackNavigator.path = '';

MyProfileStackNavigator.navigationOptions = {
  tabBarLabel: 'My Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
  ),
};

MyProfileStackNavigator.path = '';

ChatStackNavigator.navigationOptions = {
  tabBarLabel: 'Workouts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'} />
  ),
};

ChatStackNavigator.path = '';

NewWorkoutStackNavigator.navigationOptions = {
  tabBarLabel: 'New Workout',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
      focused={focused} 
      name={
        Platform.OS === 'ios'
          ? `ios-add-circle${focused ? '' : '-outline'}`
          : 'md-add-circle'
      }
    />
  ),
};

NewWorkoutStackNavigator.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const Example = createStackNavigator(
  {
    Example: LoginScreen,
  },
  config
);

Example.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

Example.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack: HomeStackNavigator,
  MyProfileStack: MyProfileStackNavigator,
  ChatStack: ChatStackNavigator,
  NewWorkoutStack: NewWorkoutStackNavigator,
});

tabNavigator.navigationOptions = {
  header: null,
};

tabNavigator.path = '';

export default tabNavigator;
