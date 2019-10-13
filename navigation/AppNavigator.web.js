import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import RootSwitchNavigator from './RootSwitchNavigator';

RootSwitchNavigator.path = '';

export default createBrowserApp(RootSwitchNavigator, { history: 'hash' });
