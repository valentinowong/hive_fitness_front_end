import { FETCH_GROUPS, SAVE_CURRENT_USER, SELECT_GROUP } from './types';
import { AsyncStorage } from 'react-native';
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
    
export const selectGroup = (id, token) => dispatch => {
  console.log('Selecting Group');
  // Fetch Specific Group Info
  GroupAdapter.show(id, token).then(response => {
    // console.log("Group Show Response JSON: ", response)
    dispatch({
      type: SELECT_GROUP,
      payload: response
    })
  })
  
}


