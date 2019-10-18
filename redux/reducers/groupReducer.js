import { FETCH_GROUPS, SELECT_GROUP } from '../actions/types';

const initialState = {
    groupsArray: [],
    selectedGroupId: null,
    admins: [],
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_GROUPS:
            const admins = action.payload.included.filter(item => item.type === "admin")
            return {
                ...state,
                groupsArray: action.payload.data,
                admins: admins
            }
        case SELECT_GROUP:
            return {
                ...state,
                selectedGroupId: action.payload.data.id
            }
        default: 
            return state;
    }
}