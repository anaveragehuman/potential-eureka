import React, { Component } from 'react';
import './App.css';

class SearchField extends Component {
    render() {
        return (
            <form onSubmit={this.props.click}>
                <input defaultValue={this.props.val} type="text" />
                <button type="submit">Search</button>
            </form>
                );

    }
}

export default SearchField;
