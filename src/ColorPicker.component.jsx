import { GithubPicker } from 'react-color';
import React, { Component } from 'react';
import TaskType from './Task.type.js';
import { connect } from 'react-redux';
import { changeTaskColor } from './store/actionCreators';

const propTypes = {
    data: TaskType,
}

class ColorPicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayColorPicker: false
        }
    }
    onHandleDisplay() {
        this.setState(preState => ({displayColorPicker: !preState.displayColorPicker}));
    }
    handleClose() {
        this.setState(preState => {
            if(true ===  preState.displayColorPicker){
                return {displayColorPicker: false}
            }
        });
    }
    render() {
        const popover = {
            position: 'absolute',
            zIndex: '2',
          }
          const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          }
          const background = {
              backgroundColor: this.props.data.color
          }
        return (
        <div>
                <button onClick={() => this.onHandleDisplay()} style={background}>Color</button>
                {
                    this.state.displayColorPicker && 
                    (<div style={ popover }> 
                    <div 
                        style={ cover } 
                        onClick={ () => this.handleClose() }
                    /> 
                        <GithubPicker 
                            onChange={(color) => this.props.onHandleChangeColor(color.hex,this.props.data.taskId,this.props.data.listId)}
                        /> 
                    </div>)
                }    
        </div>
        )
    }
}

ColorPicker.propTypes = propTypes;

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => {
    return {
        onHandleChangeColor: (color, taskId, listId) => dispatch(changeTaskColor(color, taskId, listId)),
    }
}

const ColorPickerConnected = connect(mapStateToProps, mapDispatchToProps)(ColorPicker);

export default ColorPickerConnected;