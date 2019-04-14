import React, { Component } from 'react' ;

import JournalName from './journal-name';
import Book from './book';
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
                entries: [],
                name: "Journal",
                editingName: false,
                open: false
            };

            this.id = `journal-${generateId()}`;

            // Save this journal
            localStorage.setItem(this.id, JSON.stringify(this.state));
        }

        this.handleJournalNameClick = this.handleJournalNameClick.bind(this);
        this.updateJournalName = this.updateJournalName.bind(this);
        this.addEntry = this.addEntry.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
        this.closeJournal = this.closeJournal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleJournalNameClick(e) {
        e.preventDefault();
        if (this.state.open) {
            this.setState({
                editingName: true
            });
        } else {
            this.setState({
                open: true
            });
        }

    }

    closeJournal(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            open: false
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

        journal.querySelectorAll('.new-event').forEach((el) => el.value &&  events.push(el.value));

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

    handleDelete(e) {
        e.preventDefault();
        const reallyDelete = confirm("Are you sure you want to delete this journal?");
        if (reallyDelete)
            this.props.deleteJournal(this.id);
    }


    render() {
        const entries = this.state.entries.map((entry, index) => <Entry key={generateId()} entry={entry} deleteEntry={this.deleteEntry} />);
        return (
            <div className={`journal mv3 ${this.state.open ? 'open' : 'closed ba p3 ac'}`}>
                <Book title={this.state.name}/>
                <JournalName
                    canEdit={this.state.open}
                    onClick={this.handleJournalNameClick}
                    onKeyDown={this.updateJournalName}
                    editingName={this.state.editingName}
                    closeJournal={this.closeJournal}
                    journalIsOpen={this.state.open}
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

                <button className="mv2 p2 ba red b-red bg-blanc" onClick={this.handleDelete}>Delete Journal</button>
            </div>
        );
    }
}

export default Journal;
