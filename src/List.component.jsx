import React from 'react';
import './List.component.css';
import Task from './Task.component.jsx';
import ListType from './List.type.js';
import { connect } from 'react-redux';
import { addNewTask, removeList } from './store/actionCreators';

class List extends React.Component {
    static propTypes = {
        data: ListType,
        // onHandledragStart: PropTypes.func.isRequired,
        // onHandledragOverTask: PropTypes.func.isRequired,
        // onHandleDropTask: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            newTaskName: ''
        }
    }
    handleInputChange = (e) => {
        this.setState({newTaskName: e.target.value})
    }
    handleAddNewTask = (e) => {
        if(e.keyCode === 13 || e.type === 'click') {
            this.props.onHandleNewTask(this.state.newTaskName, this.props.data.listId)
            this.setState({newTaskName: ''})
        }
    }
    render() {
        return (
            <div className="list"
                // onDragOver={this.props.onHandledragOverTask}
                // onDrop={this.props.onHandleDropTask}
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
                        onChange={this.handleInputChange} 
                        onKeyUp={this.handleAddNewTask} />
                    <button onClick={this.handleAddNewTask}>add task</button>
                </div>
                {this.props.data.tasks.map(taskData => 
                <Task
                    data={taskData} 
                    // onHandledragStart={this.props.onHandledragStart}
                    key={taskData.taskId}/>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => {
    return {
        onHandleNewTask: (name, listId) => dispatch(addNewTask(name, listId)),
        onHandleRemoveList: (listId) => dispatch(removeList(listId))
    }
}

const ListConnected = connect( mapStateToProps, mapDispatchToProps)(List)

export default ListConnected;