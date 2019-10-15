import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import RootStackNavigator from './RootSwitchNavigator';

const AppNavigator = createAppContainer(
  RootStackNavigator
);

export default AppNavigator;
