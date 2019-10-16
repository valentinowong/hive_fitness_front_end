import { SAVE_CURRENT_USER } from '../actions/types';

const initialState = {
    usersArray: [],
    currentUserId: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SAVE_CURRENT_USER:
            const filteredUsersArray = state.usersArray.filter(user => user.id !== action.payload.data.id)
            const updatedUsersArray = [...filteredUsersArray, action.payload.data]
            return {
                ...state,
                currentUserId: action.payload.data.id, 
                usersArray: updatedUsersArray
            }
        default: 
            return state;
    }
}