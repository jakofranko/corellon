import React, { Component } from 'react' ;
import { phi, tableFor } from './phi';
import Entry from './entry';

class Journal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: [],
            creatingPhiTable: false
        };

        this.addEntry = this.addEntry.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.createPhiTable = this.createPhiTable.bind(this);
        this.createTable = this.createTable.bind(this);
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

    createPhiTable(e) {
        e.preventDefault();

        this.setState({
            creatingPhiTable: true
        });
    }

    createTable(e) {
        e.preventDefault();
        const journal = e.target.closest('.journal');
        const eventA = journal.querySelector('.event-a').value;
        const eventB = journal.querySelector('.event-b').value;

        console.log(tableFor(eventA, eventB, this.state.entries))
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
                <button className="create-phi-table" onClick={this.createPhiTable}>Generate Correlation Table</button>

                {
                    this.state.creatingPhiTable ?
                        <form className="correlate-events-form">
                            <select className="event-a">
                                {this.getUniqueEvents().map(event => <option key={event}>{event}</option>)}
                            </select>
                            <select className="event-b">
                                {this.getUniqueEvents().map(event => <option key={event}>{event}</option>)}
                            </select>
                            <button onClick={this.createTable}>Generate Table</button>
                        </form>
                        :
                        <div></div>
                }


                {entries}
            </div>
        );
    }
}

export default Journal;
