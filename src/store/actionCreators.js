export function addNewList(name) {
    return {
        type: 'ADD_LIST',
        newList: {
            listId: generateId('list'),
            name: name,
            tasks: []
        }
    }
}
const generateId = (namespace) => {
    return `${namespace}-${Date.now()}-${Math.round(Math.random()*100)}`
}

export function addNewTask(name, listId) {
    return {
        type: 'ADD_TASK',
        newTask: {
            "taskId": generateId('task'),
            "text": name,
            "completed": false,
            "editable": false,
            "color": "gray",
            "listId": listId
        }
    }
}

export function removeList(listId) {
    return {
        type: 'REMOVE_LIST',
        listId
    }
}

export function removeTask(taskId, listId) {
    return {
        type: 'REMOVE_TASK',
        taskId,
        listId
    }
}

export function completedTask(taskId, listId, completed) {
    return {
        type: 'COMPLETE_TASK',
        taskId,
        listId,
        completed
    }
}

export function changeTaskColor(color, taskId, listId){
    return {
        type: 'CHANGE_TASK_COLOR',
        color,
        taskId,
        listId
    }
}

export function editTask(text, taskId, listId){
    return {
        type: 'EDIT_TASK',
        text,
        taskId,
        listId
    }
}