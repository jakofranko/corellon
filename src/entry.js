import React, { Component } from 'react';

// An [journal] entry is simply an array of events (strings)
// and a time e.g., <Entry events=[events] />
class Entry extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="entry">
                <h2>Entry</h2>
                <ul>
                    {this.props.events.map((event) => <li key={event}>{event}</li>)}
                </ul>
            </div>
        );
    }
}

export default Entry;
