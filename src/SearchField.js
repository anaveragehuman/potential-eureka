import React, { Component } from 'react';
import './App.css';

class SearchField extends Component {
    render() {
        return (<input onChange={this.props.change} value={this.props.val} />);

    }
}

export default SearchField;
