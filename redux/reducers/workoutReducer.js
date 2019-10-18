import { NEW_WORKOUT_FORM, CHANGE_WORKOUT_FORM_DATETIME, CHANGE_WORKOUT_FORM_DESCRIPTION, LOG_WORKOUT, SELECT_GROUP } from '../actions/types';

const initialState = {
    workoutsArray: [],
    selectedWorkout: null,
    formData: {
        workoutDescription: '',
        datetime: new Date(),
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
        case LOG_WORKOUT:
            return {
                ...state,
                workoutsArray:[
                    ...state.workoutsArray,
                    action.payload
                ]
            }
        case SELECT_GROUP:
                const workoutsArray = action.payload.included.filter(item => item.type === 'workout')
                return {
                    workoutsArray: workoutsArray,
                    selectedWorkout: null,
                    formData: {
                        workoutDescription: '',
                        datetime: new Date(),
                    }
                }
        default: 
            return state;
    }
}