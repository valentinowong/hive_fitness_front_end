import { SAVE_CURRENT_USER, LOGOUT, SELECT_GROUP } from '../actions/types';

const initialState = {
    usersArray: [],
    currentUserId: null, 
    selectedUser: null
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
        case LOGOUT:
            return {
                usersArray: [],
                currentUserId: null, 
                selectedUser: null
            }
        case SELECT_GROUP:
            const usersArray = action.payload.included.filter(item => item.type === 'user')
            return {
                ...state,
                usersArray: usersArray,
                selectedUser: null,
            }
        default: 
            return state;
    }
}