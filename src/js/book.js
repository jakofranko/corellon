import React, { Component } from 'react';

class Book extends Component {
    render() {
        return (
            <div className="book-scene">
                <div className="book">
                    <div className="book-side book-left spine">{this.props.title}</div>
                    <div className="book-side book-front"></div>
                    <div className="book-side book-back"></div>
                    <div className="book-side book-top pages-top-bottom"></div>
                    <div className="book-side book-bottom pages-top-bottom"></div>
                    <div className="book-side book-right pages"></div>
                </div>
            </div>
        )
    }
}

export default Book;
