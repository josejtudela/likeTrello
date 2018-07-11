import { GithubPicker } from 'react-color';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskType from './Task.type.js';

export default class ColorPicker extends Component {
    static propTypes = {
        data: TaskType,
        onHandleChangeColor: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        this.state = {
            displayColorPicker: false
        }
    }

    onHandleDisplay = () => {
        this.setState(preState => ({displayColorPicker: !preState.displayColorPicker}));
    }

    handleClose = () => {
        this.setState(preState => {
            if(true ===  preState.displayColorPicker){
                return {displayColorPicker: false}
            }
        });
    };

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
                <button onClick={ this.onHandleDisplay } style={background}>Color</button>
                {
                    this.state.displayColorPicker ? 
                    <div style={ popover }> <div style={ cover } onClick={ this.handleClose }/> <GithubPicker onChange={(color,e) => this.props.onHandleChangeColor(color,this.props.data.taskId, 
                        this.props.data.listId) }/> </div>
                    : null
                }    
        </div>
        )
    }
}
