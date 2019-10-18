import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LogNewWorkoutScreen from '../screens/LogNewWorkoutScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';

const NewWorkoutStackNavigator = createStackNavigator(
    {
      LogWorkout: LogNewWorkoutScreen,
      WorkoutDetails: WorkoutDetailsScreen,
    },
    {
      initialRouteName: 'LogWorkout',
    }
);

export default NewWorkoutStackNavigator;
  
  