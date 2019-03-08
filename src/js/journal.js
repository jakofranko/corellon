import React, { Component } from 'react' ;
import EntryForm from './entry-form';
import Entry from './entry';
import CorrelationTable from './correlation-table';
import { generateId } from './utils';

// TODO: Add journal names and UI/UX for changing names
class Journal extends Component {
    constructor(props) {
        super(props);

        const storage = localStorage.getItem(props.journalId);
        const data = storage ? JSON.parse(storage) : null;

        if (data) {
            this.state = {
                entries: data.entries
            };

            this.id = props.journalId;
        } else {
            this.state = {
                entries: []
            };

            this.id = `journal-${generateId()}`;

            // Save this journal
            localStorage.setItem(this.id, JSON.stringify(this.state));
        }

        this.addEntry = this.addEntry.bind(this);
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
        }, () => localStorage.setItem(this.id, JSON.stringify(this.state)));

        journal.querySelectorAll(".new-event").forEach((el) => el.remove());
    }


    render() {
        const entries = this.state.entries.map((entry, index) => <Entry key={index} events={entry.events} />);
        return (
            <div className="journal">
                <h1 className="mb3 lhs">Journal</h1>
                <div className="r">
                    <EntryForm addEntry={this.addEntry} />
                    <CorrelationTable entries={this.state.entries} />
                </div>
                {entries}
            </div>
        );
    }
}

export default Journal;
