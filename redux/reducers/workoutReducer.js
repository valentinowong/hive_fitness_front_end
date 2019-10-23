import { NEW_WORKOUT_FORM, CHANGE_WORKOUT_FORM_DATETIME, CHANGE_WORKOUT_FORM_DESCRIPTION, SELECT_WORKOUT_IMAGE, LOG_WORKOUT, SELECT_GROUP, REFRESH_WORKOUTS, FETCH_WORKOUTS } from '../actions/types';

const initialState = {
    workoutsArray: [],
    refreshing: false,
    formData: {
        workoutDescription: '',
        datetime: new Date(),
        image: null,
    },
}

export default function(state = initialState, action) {
    switch(action.type) {
        case NEW_WORKOUT_FORM:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    datetime: new Date(),
                }
            }
        case CHANGE_WORKOUT_FORM_DATETIME:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    datetime: action.payload,
                }
            }
        case CHANGE_WORKOUT_FORM_DESCRIPTION:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    workoutDescription: action.payload,
                }
            }
        case SELECT_WORKOUT_IMAGE:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    image: action.payload,
                }
            }
        case LOG_WORKOUT:
            return {
                ...state,
                workoutsArray: action.payload,
                formData: {
                    workoutDescription: '',
                    datetime: new Date(),
                    image: null,
                },

            }
        case SELECT_GROUP:
            const workoutsArray = action.payload.included.filter(item => item.type === 'workout')
            return {
                workoutsArray: workoutsArray,
                selectedWorkout: null,
                refreshing: false,
                formData: {
                    workoutDescription: '',
                    datetime: new Date(),
                }
            }
        case REFRESH_WORKOUTS:
            return {
                ...state,
                refreshing: true,
            }
        case FETCH_WORKOUTS:
            return {
                ...state, 
                workoutsArray: action.payload,
                refreshing: false,
            }
        default: 
            return state;
    }
}