import React, { Component } from 'react';
import './App.css';
import List from './List.component.jsx';
import { connect } from 'react-redux';
import { addNewList } from './store/actionCreators';

class App extends Component {
  constructor( props ) {
      super( props );
      this.state = {
          'addNewListText': ''
      }
  }

  addNewList = () => {
    this.props.addNewList(this.state.addNewListText);
    this.setState({ addNewListText: '' })
  }
  handleInputChange = (e) => {
    this.setState({addNewListText: e.target.value})
  }
  handleKeyup = (e) => {
    if(e.keyCode === 13) {
      this.addNewList();
    }
  }
  render() {
    localStorage.setItem('lists', JSON.stringify(this.props.lists));
    return (
      <div className="App">
        <header className="addList">
          <input type="text" value={this.state.addNewListText} onChange={this.handleInputChange} onKeyUp={this.handleKeyup}/>
          <button onClick={this.addNewList}>add new list</button>
        </header>
        <section>
          <div className="lists">
            { this.props.lists.map( listData => 
            <List key={listData.listId} data={listData} 
            // onHandleRemoveList={this.removeList.bind(this)} 
            // onHandleMarkAsCompleted={this.markAsCompleted.bind(this)} 
            // onHandleRemoveTask={this.removeTask.bind(this)}
            // onHandleChangeColor={this.changeColor.bind(this)}
            // onHandleEditableTask={this.editableTask.bind(this)}
            // onHandleValueEditableTask={this.valueEditableTask.bind(this)}
            // onChangeValueTextTask={this.changeValueTextTask.bind(this)}
            // onHandledragStart={this.dragStartTask.bind(this)}
            // onHandledragOverTask={this.dragOverTask.bind(this)}
            // onHandleDropTask={this.dropTask.bind(this)}
            />)}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({lists: state.lists});
const mapDispatchToProps = (dispatch) => ({addNewList: (name) => dispatch(addNewList(name))})

const AppConnected = connect( mapStateToProps, mapDispatchToProps)(App);

export default AppConnected;

  // removeList(listId) {
  //     this.setState(prevState => {
  //       let newLists = prevState.lists.filter( list => list.listId !== listId) ;
  //       return { lists: newLists }
  //     })
  // }
  // markAsCompleted(taskId,listId, completedState) {
  //   this.setState(prevState => {
  //       let newLists = prevState.lists.map(list => {
  //         if(list.listId === listId) {
  //           list.tasks = list.tasks.map(task => {
  //             if(task.taskId === taskId) {
  //               task.completed = completedState;
  //             }
  //             return task;
  //           })
  //         }
  //         return list
  //       }) ; 
  //       return { lists: newLists }
  //     })
  // }

  // removeTask(taskId, listId){
  //   this.setState(prevState => {
  //     let newLists = prevState.lists.map(list => {
  //       if(list.listId === listId){
  //         list.tasks = list.tasks.filter(task => {
  //           if(task.taskId === taskId){
  //             return false;
  //           }
  //           return true
  //         })
  //       }
  //       return list;
  //     });
  //     return {lists: newLists};
  //   })
  // }

  // changeColor(color,taskId,listId){
  //   this.setState(prevState => {
  //     let newLists = prevState.lists.map(list => {
  //       if(list.listId === listId) {
  //         list.tasks = list.tasks.map(task => {
  //           if(task.taskId === taskId) {
  //             task.color = color.hex;
  //           }
  //           return task;
  //         })
  //       }
  //       return list
  //     }) ; 
  //     return { lists: newLists }
  //   })
  // }
  
  // editableTask(taskId,listId){
  //   this.setState(prevState => {
  //     let newLists = prevState.lists.map(list => {
  //       if(list.listId === listId) {
  //         list.tasks = list.tasks.map(task => {
  //           if(task.taskId === taskId) {
  //             task.editable = true;
  //           }
  //           return task;
  //         })
  //       }
  //       return list
  //     }) ; 
  //     return { lists: newLists }
  //   })
  // }

  // valueEditableTask(e,taskId,listId){
  //   if(e.keyCode === 13) {
  //     this.setState(prevState => {
  //       let newLists = prevState.lists.map(list => {
  //         if(list.listId === listId) {
  //           list.tasks = list.tasks.map(task => {
  //             if(task.taskId === taskId) {
  //               task.editable = false;
  //             }
  //             return task;
  //           })
  //         }
  //         return list
  //       }) ; 
  //       return { lists: newLists }
  //     })
  //   }
  // }
  // changeValueTextTask(e,taskId,listId){
  //   let text = e.target.value;
  //   this.setState(prevState => {
  //     let newLists = prevState.lists.map(list => {
  //       if(list.listId === listId) {
  //         list.tasks = list.tasks.map(task => {
  //           if(task.taskId === taskId) {
  //             task.text = text;
  //           }
  //           return task;
  //         })
  //       }
  //       return list
  //     }) ; 
  //     return { lists: newLists }
  //   })
  // }

  // dragStartTask(e){
  //   this.dragged = e.currentTarget;
  //   e.dataTransfer.effectAllowed = 'move';
  //   e.dataTransfer.setData("taskId", e.target.id);
  //   e.dataTransfer.setData("listId", e.target.parentNode.id);
  // }

  // dragOverTask(e){
  //   e.preventDefault();
  // }
  // dropTask(e){
  //   e.preventDefault();
  //   let taskId = e.dataTransfer.getData("taskId");
  //   let listId = e.dataTransfer.getData("listId");
  //   let listIdChaged = e.target.id
  //   let taskChanging;

  //   let control = false;
  //   this.state.lists.forEach(list => {
  //     if(list.listId === listIdChaged){
  //       control = true;
  //     }
  //   });

  //   if(control){
  //     this.setState(prevState => {
  //       let prevLists = prevState.lists.map(list => {
  //         if(list.listId === listId) {
  //           list.tasks = list.tasks.filter(task => {
  //             if(task.taskId === taskId) {
  //               task.listId = listIdChaged;
  //               taskChanging = Object.assign({}, task)
  //               return false;
  //             }
  //             return task;
  //           })
  //         }
  //         return list;
  //       }); 
  
  //       console.log("prev: ",prevLists)
        
  //       let newLists = prevLists.map(list => {
  //         if(list.listId === listIdChaged) {
  //           list.tasks.push(taskChanging);
  //         }
  //         return list;
  //       }) ; 
  //       console.log("new: ",newLists)
  
  //       return { lists: newLists }
  //     })
  //   }
  // }