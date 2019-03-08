import React, { Component } from 'react';

// An [journal] entry is simply an array of events (strings)
// and a time e.g., <Entry events=[events] />
// TODO: UI/UX for deleting entries and events
class Entry extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="entry">
                <h2 className="mb2 lhs">Entry</h2>
                <ul>
                    {this.props.events.map((event) => <li key={event}>{event}</li>)}
                </ul>
            </div>
        );
    }
}

export default Entry;
