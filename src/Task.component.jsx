import React from 'react';
import ColorPicker from './ColorPicker.component';
import TaskType from './Task.type.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeTask, completedTask, editTask } from './store/actionCreators';
import './Task.component.css';

const propTypes = {
    data: TaskType,
    onHandledragStart: PropTypes.func.isRequired
}

class Task extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editable: false,
            tempTextTask: ''
        }
    }

    onHandleEditableTask = () => {
        this.setState({editable: true, tempTextTask: this.props.data.text});
    }
    onChangeValueTextTask = (e) => {
        this.setState({tempTextTask: e.target.value});
    }
    onHandleValueEditableTask = (e) => {
        if(e.keyCode === 13){
            this.setState({editable: false});
            this.props.onHandleEditTask(this.state.tempTextTask, this.props.data.taskId, this.props.data.listId)
        }
    }

    render () {
        return (
            <div draggable="true" onDragStart={this.props.onHandledragStart} className={`taskItem ${this.props.data.completed ? 'completed': ''}` } id={this.props.data.taskId}>
                <button className="taskCross" onClick={(e) => this.props.onHandleRemoveTask(
                            this.props.data.taskId, 
                            this.props.data.listId)
                            }>X</button>  
                <ColorPicker data={this.props.data} /> 
                <input 
                    type="checkbox" 
                    onChange={(e)=> 
                        this.props.onHandleMarkAsCompleted(
                            this.props.data.taskId, 
                            this.props.data.listId,
                            e.target.checked
                        )}
                    checked={this.props.data.completed}/>
                <div className="taskText" onClick={() => this.onHandleEditableTask()}>
                    {this.state.editable ? 
                    <input type="text" value={this.state.tempTextTask} 
                        onChange={(e) => this.onChangeValueTextTask(e)}
                        onKeyUp={(e) => this.onHandleValueEditableTask(e)}
                    /> 
                    : this.props.data.text}
                  </div>
            </div>
        );
    }
}

Task.propTypes = propTypes;

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => {
    return {
        onHandleRemoveTask: (taskId, listId) => dispatch(removeTask(taskId, listId)),
        onHandleMarkAsCompleted: (taskId, listId, completed) => dispatch(completedTask(taskId, listId, completed)),
        onHandleEditTask: (text, taskId, listId) => dispatch(editTask(text, taskId, listId))
    }
}

const TaskConnected = connect(mapStateToProps, mapDispatchToProps)(Task);

export default TaskConnected;