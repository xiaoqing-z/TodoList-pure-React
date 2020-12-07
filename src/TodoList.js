import React, { Component } from "react";
import List from './Components/List'
import './TodoList.css'
import Header from './Components/Header'
import Input from './Components/Input'
import Three from './Components/Aclass'

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: [],
      originalTodoText: "",
      order: '',
      searchValue: '',
      searchList: [],
      isSearch: false,
      isAll: true,
      isProcessing: false,
      isDone: false,
      processingList: [],
      doneList: []


    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown)
  }

  changeTypeText = (newTypeValue, item) => {

    if (item) {
      const newList = this.state.list.map((each) => {
        if (each.content === item.content) each.content = newTypeValue;
        return each;
      });
      this.setState({
        list: newList
      });
    }
    else {
      this.setState({
        inputValue: newTypeValue
      });

    }
  };

  changeOrder = (typeOrder, item) => {
    if (item) {
      const newList = this.state.list.map((each) => {
        if (each.id === item.id) each.order = typeOrder;
        return each;
      }

      );
      this.setState({
        list: newList
      });
      this.orderTodo()
    }

  }

  onKeyDown = (e) => {
    if (this.state.inputValue) {
      switch (e.keyCode) {
        case 13:
          this.addTodo()
          break
      }
    }
  }

  delTodo = (item) => {
    this.setState({
      list: this.state.list.filter((each) => each.id !== item.id)
    });
  }

  addTodo = () => {
    const newItem = {
      id: Math.random() * 100,
      content: this.state.inputValue,
      isEdit: false,
      isOrder: false,
      isClick: false,
      order: '1'
    }

    const existtodo = this.state.list.filter((each) => each.content.toUpperCase() === newItem.content.toUpperCase()).length;
    if (newItem.content) {
      if (!existtodo) {
        this.setState({
          list: [...this.state.list, newItem],
          inputValue: '',

        })
      } else {
        alert(' This item already exists, please re-enter')
      }
    } else {
      alert('please type to do')
    }

    this.orderTodo()
  }


  compare(property) {
    return function (obj1, obj2) {
      var value1 = obj1[property];
      var value2 = obj2[property];
      return value1 - value2;
    }
  }

  orderTodo = () => {
    const newList = this.state.list.sort(this.compare('order'))
    this.setState({
      list: newList
    });



  }

  editTodo = (item) => {
    const newList = this.state.list.map((each) => {
      if (each.id === item.id) {
        each.isEdit = true;
        this.setState({
          originalTodoText: item.content
        });
      }
      return each;
    });

    this.setState({
      list: newList
    });

  };
  saveEdit = (item) => {
    const newList = this.state.list.map((each) => {
      if (each.id === item.id) each.isEdit = false;
      return each;
    });

    this.setState({
      list: newList
    });
  }

  cancelEdit = (item) => {
    const newList = this.state.list.map((each) => {
      if (each.id === item.id) {
        each.content = this.state.originalTodoText;
        each.isEdit = false;
      }
      return each;
    });

    this.setState({
      list: newList
    });
  };

  searchItem = (typeSearchValue) => {
    const newlist = this.state.list.filter((each) => {
      if (each.content.includes(typeSearchValue)) {
        return each
      }
    })

    this.setState({
      searchList: newlist
    })


  }


  inputOnFocus = () => {
    this.setState({

      isSearch: !this.state.isSearch
    })


  }
  inputOnBlur = () => {

    this.setState({
      isSearch: false
    })


  }

  handelOnClick = (item) => {

    const newList = this.state.list.map((each) => {
      if (each.id === item.id) {
        each.isClick = true;
      }
      return each;
    });

    this.setState({
      list: newList,
    });
  }

  clickAll = () => {

    this.setState({
      isAll: true,
      isProcessing: false,
      isDone: false,
      searchList: [],


    })

  }
  clickProcessing = () => {
    const newpList = this.state.list.filter((each) => !each.isClick)
    this.setState({
      isAll: false,
      isProcessing: true,
      isDone: false,
      searchList: [],
      processingList: newpList,

    })

  }
  clickDone = () => {
    const newdList = this.state.list.filter((each) => each.isClick)
    this.setState({
      isAll: false,
      isProcessing: false,
      isDone: true,
      doneList: newdList,
      searchList: [],
    })

  }



  render() {
    const { list, inputValue, searchList, isAll, isProcessing, isDone, processingList, doneList, isSearch } = this.state

    return (
      <div>
        <List className='List'
          list={list}
          searchList={searchList}
          isSearch={isSearch}
          isAll={isAll}
          isProcessing={isProcessing}
          changeTypeText={this.changeTypeText}
          delTodo={this.delTodo}
          editTodo={this.editTodo}
          saveEdit={this.saveEdit}
          cancelEdit={this.cancelEdit}
          inputOnFocus={this.inputOnFocus}
          inputOnBlur={this.inputOnBlur}
          orderTodo={this.orderTodo}
          changeOrder={this.changeOrder}
          searchItem={this.searchItem}
          handelOnClick={this.handelOnClick}
          processingList={processingList}
          doneList={doneList}
        />
        {list.length === 0 ? (<div><Header />
          <Input type="text" placeholder='come on !!!' typeValue={inputValue} changeTypeText={this.changeTypeText} /></div>) : (

            <ul >
              <div className='comeon' >
                <Three className={`${isAll ? "setcolor" : null}`} currentA='All' clickAll={this.clickAll} />
                <Three className={`${isProcessing ? "setcolor" : null}`} currentA='Processing' clickProcessing={this.clickProcessing} />
                <Three className={`${isDone ? "setcolor" : null}`} currentA='Done' clickDone={this.clickDone} />
              </div>
              <div>
                <Input type="text" placeholder='come on !!!' typeValue={inputValue} changeTypeText={this.changeTypeText} />
              </div>
            </ul>



          )}








      </div>
    );
  }
}



export default TodoList;