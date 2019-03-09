import React, { Component } from 'react';

// An [journal] entry is simply an array of events (strings)
// and a time e.g., <Entry events=[events] />
// TODO: UI/UX for deleting entries and events
class Entry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: props.entry.events
        };

        this.checkDelete = this.checkDelete.bind(this);
    }

    checkDelete(e) {
        e.preventDefault();
        const sure = confirm("Are you sure you want to delete this entry?");

        if (sure)
            this.props.deleteEntry(this.props.entry);
    }

    render() {
        console.log(this.props)
        return (
            <div className="entry p3">
                <h2 className="mb2 lhs">
                    Entry
                    <button onClick={this.checkDelete}>Delete</button>
                </h2>
                <ul>
                    {this.state.events.map((event) => <li key={event}>{event}</li>)}
                </ul>
                <hr className="mv4" />
            </div>
        );
    }
}

export default Entry;
