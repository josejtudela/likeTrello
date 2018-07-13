const initialState = {
    lists: []
}

function reducer( state = initialState, action){
    switch (action.type) {
        case 'ADD_LIST':
            return {...state}
        case 'ADD_TASK':
            return {...state}
        case 'REMOVE_LIST':
            return {...state}
        case 'REMOVE_TASK':
            return {...state}
        default:
            break;
    }
    return state;
}

export default reducer;
