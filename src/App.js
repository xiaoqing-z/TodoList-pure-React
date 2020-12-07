import './App.css';
import { Component } from 'react';
import List from './todo/List'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      inputvalue: '',

    }


  }

  handleOnChange = (e) => {
    this.setState({
      inputvalue: e.target.value,

    })
  }


  handleOnClick = () => {
    if (!this.state.inputvalue.trim().length) {
      alert('please input valid content')
      return;
    }

    let existvalue = this.state.list.filter((item) => item.value.toUpperCase() === this.state.inputvalue.toUpperCase()).length
    if (existvalue) {
      alert(' input existed')
      return;
    }

    let todoItem = {
      id: Math.random() * 100,
      value: this.state.inputvalue,
      isEdit: false
    };

    this.setState({
      list: [...this.state.list, todoItem],
      inputvalue: '',
    });
  }


  handleDel = (id) => {
    let list = this.state.list.filter((item) => item.id !== id)
    this.setState({
      list
    })
  }

  handelEdit = (id) => {


  }
  handelCancel = () => {

  }
  render() {
    const { list } = this.state;
    return (

      <div className="App">
        <input type='text' value={this.state.inputvalue} onChange={this.handleOnChange}></input>
        <button type='button' style={{ marginLeft: 20 }} onClick={this.handleOnClick}>add</button>

        <List list={list} />

      </div>

    );
  }

};
