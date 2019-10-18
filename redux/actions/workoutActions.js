import { NEW_WORKOUT_FORM, CHANGE_WORKOUT_FORM_DATETIME, CHANGE_WORKOUT_FORM_DESCRIPTION, LOG_WORKOUT } from './types';
import { WorkoutAdapter } from '../adapters';

export const openNewWorkoutForm = () => dispatch => {
  console.log('Open New Workout Action')
  dispatch({
    type: NEW_WORKOUT_FORM,
  });
};

export const changeWorkoutFormDatetime = (datetime) => dispatch => {
  console.log('Change Workout Form Datetime Action')
  dispatch({
    type: CHANGE_WORKOUT_FORM_DATETIME,
    payload: datetime,
  });
};

export const changeWorkoutFormDescription = (description) => dispatch => {
  console.log('Change Workout Form Description Action')
  dispatch({
    type: CHANGE_WORKOUT_FORM_DESCRIPTION,
    payload: description,
  });
};

export const submitNewWorkout = (token, data, selectedGroupId) => dispatch => {
  console.log('Submitting New Workout');
  WorkoutAdapter.create(token, data, selectedGroupId)
    .then(response => {
      dispatch({
        type: LOG_WORKOUT,
        payload: response.data,
      })
    });
}