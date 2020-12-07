import React, { Component } from 'react';

class Button extends Component {
    handelOnClick = () => {
        const {
            currentItem,
            delTodo,
            text,
            editTodo,
            saveEdit,
            cancelEdit

        } = this.props;
        switch (text) {
            case 'delete':
                delTodo(currentItem);
                break
            case 'edit':
                editTodo(currentItem);
                break
            case 'save':
                saveEdit(currentItem);
                break
            case 'cancel':
                cancelEdit(currentItem);
                break

        }
    }

    render() {
        const { text, setDisabled } = this.props;

        return (
            <button disabled={setDisabled} onClick={this.handelOnClick}>{text}</button>

        )
    }
}

export default Button;