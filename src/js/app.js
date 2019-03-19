import React, { Component } from "react";
import { hot } from "react-hot-loader";

import JournalList from './journal-list';
import Journal from './journal';

// The app will allow the user to load existing
// or creat new journals. A journal will be used
// to log events and show correlation tables for
// arbitrary data points from events.
//
// TODO: Ability to create new journals and delete old ones
// TODO: UI/UX for display and selection of new and old journals
class App extends Component {
    render() {
        return (
            <div className="app m3">
                <JournalList />
            </div>
        );
    }
}

export default hot(module)(App);
