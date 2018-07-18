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
        case 'COMPLETE_TASK':
            const listsWithCompletedTask = state.lists.map(list => {
                if(action.listId === list.listId){
                    let newListCompletedTasks = list.tasks.map(task => {
                        if(action.taskId === task.taskId) {
                            task.completed = action.completed;
                        }
                        return {
                            ...task,
                        }
                    });
                    return Object.assign({},list,{
                        tasks: newListCompletedTasks
                    })
                }
                return list;
            })
            return { 
                ...state,
                lists: listsWithCompletedTask
            }
        case 'CHANGE_TASK_COLOR':
            const listsWithColorTask = state.lists.map(list => {
                if(action.listId === list.listId){
                    let newListColorTasks = list.tasks.map(task => {
                        if(action.taskId === task.taskId) {
                            task.color = action.color;
                        }
                        return {
                            ...task,
                        }
                    });
                    return Object.assign({},list,{
                        tasks: newListColorTasks
                    })
                }
                return list;
            })
            return { 
                ...state,
                lists: listsWithColorTask
            }
        case 'EDIT_TASK':
            const listEditTask = state.lists.map(list => {
                if (action.listId === list.listId) {
                    const editTaks = list.tasks.map(task => {
                        if (action.taskId === task.taskId) {
                            task.text = action.text;
                        }
                        return task;
                    })
                    return Object.assign({},list,{
                        tasks: editTaks
                    })
                }
                return list;
            })
            return {
                ...state,
                lists: listEditTask
            }
        default:
            break;
    }
    return state;
}

export default reducer;