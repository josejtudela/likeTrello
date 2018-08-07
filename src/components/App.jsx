import React, { Component } from 'react';
import '../styles/App.scss';
import List from './List.component';
import { connect } from 'react-redux';
import { addNewList } from '../actions/actionCreators';

class App extends Component {
  constructor( props ) {
      super( props );
      this.state = {
          'addNewListText': ''
      }
  }

  addNewList(){
    this.props.addNewList(this.state.addNewListText);
    this.setState({ addNewListText: '' })
  }
  handleInputChange(e){
    this.setState({addNewListText: e.target.value})
  }
  handleKeyup(e){
    if(e.keyCode === 13) {
      this.addNewList();
    }
  }
  render() {
    localStorage.setItem('lists', JSON.stringify(this.props.lists));
    return (
      <div className="App">
        <header className="addList">
          <input 
            type="text" 
            value={this.state.addNewListText} 
            onChange={(e) => this.handleInputChange(e)} 
            onKeyUp={(e) => this.handleKeyup(e)}
          />
          <button onClick={() => this.addNewList()}>add new list</button>
        </header>
        <section>
          <div className="lists">
            { this.props.lists.map( listData => 
            <List 
              key={listData.listId} 
              listId={listData.listId}
            />)}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({lists: state.lists});
const mapDispatchToProps = (dispatch) => {
  return {
    addNewList: (name) => dispatch(addNewList(name))
  }
}

const AppConnected = connect( mapStateToProps, mapDispatchToProps)(App);

export default AppConnected;