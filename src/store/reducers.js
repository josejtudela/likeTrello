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
            const listsWithRemoveTask = state.lists.map(list => {
                if(action.listId === list.listId){
                    // list.tasks = list.tasks.filter(task => action.taskId !== task.taskId);
                    let newListTasks = list.tasks.filter(task => action.taskId !== task.taskId);
                    return Object.assign({},list,{
                        tasks: newListTasks
                    })
                }
                return list;
            })
            return { 
                ...state,
                lists: listsWithRemoveTask
            }
        default:
            break;
    }
    return state;
}

export default reducer;