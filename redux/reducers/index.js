import { combineReducers } from 'redux';
import helloReducer from './helloReducer';
import groupReducer from './groupReducer';
import userReducer from './userReducer';

export default combineReducers({
    messages: helloReducer,
    groups: groupReducer,
    users: userReducer
});
