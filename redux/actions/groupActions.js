import { FETCH_GROUPS, SAVE_CURRENT_USER, SELECT_GROUP } from './types';
import {AsyncStorage} from 'react-native';
import { GroupAdapter } from '../adapters';

export const fetchGroups = (token) => dispatch => {
  console.log('Fetching Groups');
  GroupAdapter.index(token).then(response => {
          dispatch(
              {
                  type: FETCH_GROUPS,
                  payload: response.groups
              }
          )
          dispatch(
              {
                  type: SAVE_CURRENT_USER,
                  payload: response.current_user
              }
          )
      }
  );
  console.log('fetchGroups token:', token);    
}
    
export const selectGroup = (id) => dispatch => {
  console.log('Selecting Group');
  dispatch({
    type: SELECT_GROUP,
    payload: id
  })
}
