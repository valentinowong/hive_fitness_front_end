import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ChatFeedScreen from '../screens/ChatFeedScreen';

const ChatStackNavigator = createStackNavigator(
    {
      ChatFeed: ChatFeedScreen,
    },
    {
      initialRouteName: 'ChatFeed',
    }
);

export default ChatStackNavigator;
  
  