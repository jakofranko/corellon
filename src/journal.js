import React, { Component } from 'react' ;
import { phi, tableFor } from './phi';
import Entry from './entry';

class Journal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: []
        };

        this.addEntry = this.addEntry.bind(this);
        this.addEvent = this.addEvent.bind(this);
    }

    addEntry(e) {
        const journal = e.target.closest(".journal");
        let events = [];
        document.querySelectorAll('.new-event').forEach((el) => events.push(el.value));

        this.setState((currentState, props) => {
            const newEntries = currentState.entries.concat([{ events }])
            return {
                entries: newEntries
            };
        });

        journal.querySelectorAll(".new-event").forEach((el) => el.remove());
    }

    addEvent(e) {
        e.preventDefault();
        let event = document.createElement("input");
        event.classList = "new-event";
        event.placeholder = "Event";

        e.target.closest(".new-events").prepend(event);
        event.focus();
    }

    getUniqueEvents() {
        let events = [];
        for (let entry of this.state.entries) {
            for (let event of entry.events) {
                if (!events.includes(event)) {
                    events.push(event);
                }
            }
        }

        return events;
    }

    render() {
        const entries = this.state.entries.map((entry, index) => <Entry key={index} events={entry.events} />);
        return (
            <div className="journal">
                <h1>Journal:</h1>
                <label>Add Event</label>
                <form className="new-events">
                    <input className="new-event" placeholder="Event" />
                    <button className="add-event" onClick={this.addEvent}>+</button>
                </form>
                <button className="add-entry" onClick={this.addEntry}>Add Entry</button>
                {entries}
            </div>
        );
    }
}

export default Journal;
