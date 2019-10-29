import { combineReducers } from 'redux';
import helloReducer from './helloReducer';
import groupReducer from './groupReducer';
import userReducer from './userReducer';
import workoutReducer from './workoutReducer';
import goalReducer from './goalReducer';
import penaltyReducer from './penaltyReducer';

export default combineReducers({
    messages: helloReducer,
    groups: groupReducer,
    users: userReducer,
    workouts: workoutReducer,
    goals: goalReducer,
    penalties: penaltyReducer,
});
