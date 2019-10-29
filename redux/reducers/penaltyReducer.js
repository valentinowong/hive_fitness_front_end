import { SELECT_GROUP } from '../actions/types';

const initialState = {
    penaltiesArray: [],
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SELECT_GROUP:
            const penaltiesArray = action.payload.included.filter(item => item.type === 'penalty')
            const penaltiesArraySorted = penaltiesArray.sort((a,b) => {
                a = a.attributes.goal_days;
                b = b.attributes.goal_days;
                return a > b ? 1 : a < b ? -1 : 0;
            })
            return {
                ...state,
                penaltiesArray: penaltiesArraySorted,
            }
        default: 
            return state;
    }
}