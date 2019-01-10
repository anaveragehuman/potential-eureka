import React, { Component } from 'react';

class Card extends Component {
    render() {
        return (
            <div>
                {this.props.gif}
            </div>
        )
    }
}

export default Card;
