import React,{ Component } from 'react';
import '../styles/List.component.scss';
import Task from './Task.component';
import ListType from './List.type';
import { connect } from 'react-redux';
import { addNewTask, removeList, dndTask } from '../actions/actionCreators';

const propTypes = {
    data: ListType
}

class List extends Component {
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
                    <button onClick={(e) => this.handleAddNewTask(e)}>+</button>
                </div>
                {this.props.data.tasks.map(taskData => 
                <Task
                    taskId={taskData.taskId} 
                    listId={taskData.listId}
                    onHandledragStart={this.dragStartTask}
                    key={taskData.taskId}
                />)}
            </div>
        )
    }
}

List.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
    const listId = ownProps.listId
    const list = state.lists.filter(list => list.listId === listId);

    return {
        data: list[0]
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onHandleNewTask: (name, listId) => dispatch(addNewTask(name, listId)),
        onHandleRemoveList: (listId) => dispatch(removeList(listId)),
        onHandleDnDTask: (taskId, listId, endListId) => dispatch(dndTask(taskId, listId, endListId))
    }
}

const ListConnected = connect( mapStateToProps, mapDispatchToProps)(List)

export default ListConnected;