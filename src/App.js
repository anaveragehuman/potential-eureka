import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card';
import axios from 'axios';
import apikey from './api'

class App extends Component {

    getData(path, func) {
        let api = 'https://api.giphy.com/v1/gifs/';
        api += path;
        api += `?api_key=${apikey}`
        axios.get(api).then((response) => func(response));
    }

    constructor(props) {
        super(props);
        this.state = {
            endpoint: 'trending',
            gifs: [],  // list of URLs
        }
    }

    render() {
        this.getData(this.state.endpoint, (response) => {
            let objs = response.data.data;
            for (let i of objs) {
                axios
                    .get(i.embed_url)
                    .then((response) => {
                        let old = this.state.gifs;
                        old.push(i.embed_url);
                        this.setState({gifs: old});
                    })
            }
        })

            console.log(this.state.gifs);
        return (
            <div className="App">
                {this.state.gifs.map((element) => <Card gif={element} />)}
            </div>
        );
    }
}

export default App;
