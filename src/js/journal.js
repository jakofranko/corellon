import React, { Component } from 'react' ;

import JournalName from './journal-name';
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
                entries: data.entries,
                name: data.name || "Journal",
                editingName: false,
                open: false
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

        this.editJournalName = this.editJournalName.bind(this);
        this.updateJournalName = this.updateJournalName.bind(this);
        this.addEntry = this.addEntry.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
    }

    editJournalName(e) {
        e.preventDefault();
        this.setState({
            editingName: true
        });
    }

    updateJournalName(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.setState({
                editingName: false,
                name: e.target.value
            }, () => localStorage.setItem(this.id, JSON.stringify(this.state)));
        } else if (e.key === 'Escape') {
            this.setState({
                editingName: false
            });
        }
    }

    // TODO: Have the EntryForm handle its own DOM manipulation
    // TODO: Use state from EntryForm instead of directly pulling values from inputs
    addEntry(e) {
        const journal = e.target.closest(".journal");
        const timestamp = Date.now();

        let events = [];

        document.querySelectorAll('.new-event').forEach((el) => events.push(el.value));

        this.setState((currentState, props) => {
            const newEntries = currentState.entries.concat([{ events, timestamp }])
            return {
                entries: newEntries
            };
        }, () => localStorage.setItem(this.id, JSON.stringify(this.state)));

        journal.querySelectorAll(".new-event").forEach((el) => el.remove());
    }

    deleteEntry(entry) {
        this.setState((currentState, props) => {
            const index = currentState.entries.indexOf(entry);
            if (index > -1) {
                currentState.entries.splice(index, 1);
                return {
                    entries: currentState.entries
                };
            }
        }, () => localStorage.setItem(this.id, JSON.stringify(this.state)));
    }


    render() {
        const entries = this.state.entries.map((entry, index) => <Entry key={generateId()} entry={entry} deleteEntry={this.deleteEntry} />);
        return (
            <div className="journal">
                <JournalName
                    onClick={this.editJournalName}
                    onKeyDown={this.updateJournalName}
                    editingName={this.state.editingName}
                >
                    {this.state.name}
                </JournalName>
                <div className="r">
                    <div className="c6">
                        <EntryForm addEntry={this.addEntry} />
                        <CorrelationTable entries={this.state.entries} />
                    </div>
                    <div className="c6">
                        {entries}
                    </div>
                </div>
            </div>
        );
    }
}

export default Journal;
