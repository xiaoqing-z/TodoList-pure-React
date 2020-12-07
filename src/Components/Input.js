import React, { Component } from 'react';

class Input extends Component {

  handleOnChange = (e) => {
    const { changeTypeText, currentItem } = this.props;
    changeTypeText(e.target.value, currentItem,);

  };
  handleOrder = (e) => {
    const { changeOrder, currentItem } = this.props;

    changeOrder(e.target.value, currentItem,);

  }

  handleSearch = (e) => {
    const { searchItem } = this.props;

    searchItem(e.target.value)
  }

  handleEvent = (e) => {
    const { type } = this.props;
    switch (type) {
      case 'text':
        this.handleOnChange(e);
        break
      case 'number':
        this.handleOrder(e)
        break
      case 'search':
        this.handleSearch(e)
        break
    }
  }


  render() {
    const { typeValue, type, placeholder, inputOnFocus, inputOnBlur } = this.props;
    return (
      <input type={type} placeholder={placeholder} value={typeValue} onChange={this.handleEvent} onClick={inputOnFocus} onBlur={inputOnBlur} />
    )
  }


}

export default Input;