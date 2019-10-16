import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LogNewWorkoutScreen from '../screens/LogNewWorkoutScreen';

const NewWorkoutStackNavigator = createStackNavigator(
    {
      LogWorkout: LogNewWorkoutScreen,
    },
    {
      initialRouteName: 'LogWorkout',
    }
);

export default NewWorkoutStackNavigator;
  
  