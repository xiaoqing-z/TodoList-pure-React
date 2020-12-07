import React, { Component } from 'react';
import Item from './Item'
import Button from './Button'
import Input from './Input'
class List extends Component {

  render() {
    const { handelOnClick, isSearch, searchList, list, delTodo,
      editTodo, changeTypeText, saveEdit, cancelEdit, inputOnBlur,
      inputOnFocus, changeOrder, searchItem, isAll, isProcessing,
      processingList, doneList } = this.props

    const changeList = (isSearch || searchList.length !== 0) ? (searchList) : (isAll ? (list) : (isProcessing ? (processingList) : (doneList)))

    return (
      <ul className=''>
        {list.length !== 0 ?
          (<Input type='search' placeholder='search' searchItem={searchItem} inputOnFocus={inputOnFocus} inputOnBlur={inputOnBlur} />) : (console.log('0'))}
        {changeList.map((item) => {

          return (
            <div key={item.id} >
              {item.isEdit ? (
                <Input
                  type='text'
                  currentItem={item}
                  typeValue={item.content}
                  changeTypeText={changeTypeText}
                />
              ) : (
                  <>
                    <Input type='number' placeholder='number' changeOrder={changeOrder} typeValue={item.order} currentItem={item} />
                    <Item item={item} handelOnClick={handelOnClick} />
                  </>
                )}
              {item.isEdit ? (
                <>
                  <Button text="save" currentItem={item} saveEdit={saveEdit} />
                  <Button
                    text="cancel"
                    currentItem={item}
                    orginalList={list}
                    cancelEdit={cancelEdit}
                  />
                </>
              ) : (
                  <Button text="edit" setDisabled={item.isClick ? "disabled" : null} editTodo={editTodo} currentItem={item} />
                )}

              <Button text="delete" delTodo={delTodo} currentItem={item} />
            </div>
          )
        })}
      </ul>
    )
  }
}

export default List;