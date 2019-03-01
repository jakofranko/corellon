import React, { Component } from "react";
import { hot } from "react-hot-loader";

import Journal from './journal';
import "./app.css";


// The app will allow the user to load existing
// or creat new journals. A journal will be used
// to log events and show correlation tables for
// arbitrary data points from events.
class App extends Component {
    render() {
        return (
            <div className="App">
                <Journal />
            </div>
        );
    }
}

export default hot(module)(App);
