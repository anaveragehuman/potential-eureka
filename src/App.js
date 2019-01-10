import React, { Component } from 'react';
import './App.css';
import Card from './Card';
import SearchField from './SearchField';
import axios from 'axios';
import apikey from './api'

class App extends Component {

    getData(func) {
        let api = 'https://api.giphy.com/v1/gifs/';
        api += this.state.endpoint
        api += `?api_key=${apikey}`
        console.log(api);
        axios.get(api).then((response) => func(response));
    }

    constructor(props) {
        super(props);
        this.state = {
            endpoint: 'trending',
            gifs: [],  // list of URLs
        }
    }

    componentDidMount() {
        this.getData((response) => {
            let objs = response.data.data;
            for (let i of objs) {
                let old = this.state.gifs;
                old.push(i.images.original.url);
                this.setState({gifs: old});
            }
        })
    }

    changeEndpoint(event) {
        this.setState({endpoint: event.value});

        if (event.keyCode === 13) {
            this.componentDidMount();
        }
    }

    render() {
        console.log(this.state.gifs);
        return (
            <div className="App">
                <SearchField change={(e) => this.changeEndpoint(e)} val={this.state.endpoint} />
                {this.state.gifs.map((element) => <Card gif={element} />)}
            </div>
        );
    }
}

export default App;
