const initialState = {
    lists: JSON.parse(localStorage.getItem('lists')) || []
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_LIST':
            return {
                ...state,
                lists: [
                    ...state.lists,
                    action.newList
                ]
            }
        case 'ADD_TASK':
            let newLists = state.lists.map(list => {
                if(action.newTask.listId === list.listId){
                    list.tasks.push(action.newTask);
                }
                return list;
            })
            return { 
                ...state,
                lists: newLists
            }
        case 'REMOVE_LIST':
            const removeList = state.lists.filter(list => action.listId !== list.listId);
            return {
                ...state,
                lists: removeList
            }
        case 'REMOVE_TASK':
            return { ...state
            }
        default:
            break;
    }
    return state;
}

export default reducer;