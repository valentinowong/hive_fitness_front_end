import { FETCH_PUBLIC_HELLO, FETCH_PRIVATE_HELLO } from '../actions/types';

const initialState = {
    messages: [],
    message: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_PUBLIC_HELLO:
            return {
                ...state,
                messages: [action.payload]
            }
        case FETCH_PRIVATE_HELLO:
                return {
                    ...state,
                    messages: [action.payload]
                }
        default: 
            return state;
    }
}