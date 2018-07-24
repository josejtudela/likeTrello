import React from 'react';
import './List.component.css';
import Task from './Task.component.jsx';
import ListType from './List.type.js';
import { connect } from 'react-redux';
import { addNewTask, removeList, dndTask } from './store/actionCreators';

const propTypes = {
    data: ListType
}

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTaskName: ''
        }
        this.dragStartTask = this.dragStartTask.bind(this)
    }
    handleInputChange(e) {
        this.setState({newTaskName: e.target.value})
    }
    handleAddNewTask(e){
        if(e.keyCode === 13 || e.type === 'click') {
            this.props.onHandleNewTask(this.state.newTaskName, this.props.data.listId)
            this.setState({newTaskName: ''})
        }
    }
    dragStartTask(e) {
      this.dragged = e.currentTarget;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData("taskId", e.target.id);
      e.dataTransfer.setData("listId", e.target.parentNode.id);
    }
    dragOverTask(e) {
        e.preventDefault();
    }
    dropTask(e) {
        e.preventDefault();
        let taskId = e.dataTransfer.getData("taskId");
        let listId = e.dataTransfer.getData("listId");
        let listIdChaged = e.target.id
        
        this.props.onHandleDnDTask(taskId, listId, listIdChaged);
    }   
    render() {
        return (
            <div className="list"
                onDragOver={(e) => this.dragOverTask(e)}
                onDrop={(e) => this.dropTask(e)}
                id={this.props.data.listId}>
                <div className="listHeader">
                    <h3>{this.props.data.name}
                        <button onClick={() => this.props.onHandleRemoveList(this.props.data.listId)}>X</button>
                    </h3>
                </div>
                <div className="addTask">
                    <input 
                        type="text" 
                        value={this.state.newTaskName} 
                        onChange={(e) => this.handleInputChange(e)} 
                        onKeyUp={(e) => this.handleAddNewTask(e)} 
                    />
                    <button onClick={(e) => this.handleAddNewTask(e)}>add task</button>
                </div>
                {this.props.data.tasks.map(taskData => 
                <Task
                    data={taskData} 
                    onHandledragStart={this.dragStartTask}
                    key={taskData.taskId}
                />)}
            </div>
        )
    }
}

List.propTypes = propTypes;

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => {
    return {
        onHandleNewTask: (name, listId) => dispatch(addNewTask(name, listId)),
        onHandleRemoveList: (listId) => dispatch(removeList(listId)),
        onHandleDnDTask: (taskId, listId, endListId) => dispatch(dndTask(taskId, listId, endListId))
    }
}

const ListConnected = connect( mapStateToProps, mapDispatchToProps)(List)

export default ListConnected;