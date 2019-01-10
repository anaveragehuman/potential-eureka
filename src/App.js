import React, { Component } from 'react';
import './App.css';
import Card from './Card';
import SearchField from './SearchField';
import axios from 'axios';
import apikey from './api'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: 'trending',
            gifs: [],  // list of URLs
            search: false,
        }
    }

    getData(func) {
        console.log(this.state);
        let api = 'https://api.giphy.com/v1/gifs/';

        if (this.state.search) {
            api += 'search/';
        }

        api += this.state.endpoint;
        api += `?api_key=${apikey}`;
        console.log(api);
        axios.get(api).then((response) => func(response));
    }

    componentDidMount() {
        console.log(this.state.endpoint);
        this.getData((response) => {
            this.setState({gifs: []});
            for (let i of response.data.data) {
                let old = this.state.gifs;
                old.push(i.images.original.url);
                this.setState({gifs: old});
            }
        })
    }

    changeEndpoint(event) {
        event.preventDefault();
        let tmp = event.target.children[0].value.split(' ').join('+');
        this.setState({search: true, endpoint: tmp});
        this.componentDidMount();
    }

    render() {
        return (
            <div className="App">
                <SearchField click={(e) => this.changeEndpoint(e)} val={this.state.endpoint} />
                {this.state.gifs.map((element) => <Card gif={element} />)}
            </div>
        );
    }
}

export default App;
