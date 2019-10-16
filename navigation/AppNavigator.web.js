import { createBrowserApp } from '@react-navigation/web';
import { createAppContainer } from 'react-navigation';

import RootSwitchNavigator from './RootSwitchNavigator';

const AppNavigator = createAppContainer(
    RootSwitchNavigator
);

AppNavigator.path = '';

export default createBrowserApp(AppNavigator, { history: 'hash' });
