import { SELECT_GROUP } from '../actions/types';

const initialState = {
    goalsArray: [],
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SELECT_GROUP:
            const goalsArray = action.payload.included.filter(item => item.type === 'goal')
            return {
                ...state,
                goalsArray: goalsArray,
            }
        default: 
            return state;
    }
}