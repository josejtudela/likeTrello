import React from 'react';
import { connect } from 'react-redux';
import { removeTask } from './store/actionCreators';
import './Task.component.css';

const Task = ({listId,taskId,onHandleRemoveTask}) => {
    return (
        <div id="3">
            <button className="taskCross" onClick={()=>onHandleRemoveTask(taskId, listId)}>X</button>  
            <span className="taskText">
            test
                </span>
        </div>
    );

}

const mapStateToProps = (state,ownProps) => {
    return {
        listId: ownProps.data.listId,
        taskId: ownProps.data.taskId
    }
};
const mapDispatchToProps = (dispatch) => ({onHandleRemoveTask: (taskId, listId) => dispatch(removeTask(taskId, listId))})

const TaskConnected = connect(mapStateToProps, mapDispatchToProps)(Task);

export default TaskConnected;