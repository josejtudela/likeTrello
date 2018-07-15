import React from 'react';
// import ColorPicker from './ColorPicker.component';
import TaskType from './Task.type.js';
import { connect } from 'react-redux';
import { removeTask } from './store/actionCreators';
import './Task.component.css';

class Task extends React.Component {
    static propTypes = {
        data: TaskType,
        // onHandleMarkAsCompleted: PropTypes.func.isRequired,
        // onHandleRemoveTask: PropTypes.func.isRequired,
        // onHandleChangeColor: PropTypes.func.isRequired,
        // onHandleEditableTask: PropTypes.func.isRequired,
        // onHandleValueEditableTask: PropTypes.func.isRequired,
        // onChangeValueTextTask: PropTypes.func.isRequired,
        // onHandledragStart: PropTypes.func.isRequired
    }

    // dragStart = (e) => {
    //     console.log(e.target)
    // }
    render () {
        return (
            <div draggable="true" onDragStart={this.props.onHandledragStart} className={`taskItem ${this.props.data.completed ? 'completed': ''}` } id={this.props.data.taskId}>
                <button className="taskCross" onClick={(e) => this.props.onHandleRemoveTask(
                            this.props.data.taskId, 
                            this.props.data.listId)
                            }>X</button>  
                {/* <ColorPicker data={this.props.data} onHandleChangeColor={ this.props.onHandleChangeColor }/>    */}
                <input 
                    type="checkbox" 
                    onChange={(e)=> 
                        this.props.onHandleMarkAsCompleted(
                            this.props.data.taskId, 
                            this.props.data.listId,
                            e.target.checked
                        )}
                    checked={this.props.data.completed}/>
                <div className="taskText" onClick={(e) => this.props.onHandleEditableTask(this.props.data.taskId, this.props.data.listId)}>
                    {this.props.data.editable ? 
                    <input type="text" value={this.props.data.text} 
                    onChange={(e) => this.props.onChangeValueTextTask(e,this.props.data.taskId, this.props.data.listId)}
                    onKeyUp={(e) => this.props.onHandleValueEditableTask(e,this.props.data.taskId, this.props.data.listId)}/> 
                    : this.props.data.text}
                  </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({onHandleRemoveTask: (taskId, listId) => dispatch(removeTask(taskId, listId))})

const TaskConnected = connect(mapStateToProps, mapDispatchToProps)(Task);

export default TaskConnected;