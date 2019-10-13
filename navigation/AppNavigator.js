import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import RootSwitchNavigator from './RootSwitchNavigator';

const AppNavigator = createAppContainer(
  RootSwitchNavigator
);

export default AppNavigator;
