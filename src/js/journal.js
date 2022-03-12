import React, { Component } from 'react' ;
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import JournalName from './journal-name';
import EntryForm from './entry-form';
import FilterEntries from './filter-entries';
import Entry from './entry';
import CorrelationTable from './correlation-table';
import { generateId } from './utils';

class Journal extends Component {
    constructor(props) {
        super(props);

        const storage = localStorage.getItem(props.journalId);
        const data = storage ? JSON.parse(storage) : null;

        if (data) {
            const entries = data.entries.map(entry => {
                if (!entry.id)
                    entry.id = generateId();

                return entry;
            });
            this.state = {
                entries,
                filteredEntries: entries,
                entriesWith: [],
                entriesWithout: [],
                name: data.name || "Journal",
                editingName: false,
                open: false
            };

            this.id = props.journalId;
        } else {
            this.state = {
                entries: [],
                filteredEntries: [],
                entriesWith: [],
                entriesWithout: [],
                name: "Journal",
                editingName: false,
                open: false
            };

            this.id = `journal-${Date.now()}`;

            // Save this journal
            localStorage.setItem(this.id, JSON.stringify(this.state));
        }

        this.handleJournalNameClick = this.handleJournalNameClick.bind(this);
        this.updateJournalName = this.updateJournalName.bind(this);
        this.updateFilteredEntries = this.updateFilteredEntries.bind(this);
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
        const id = generateId();

        let events = [];

        journal.querySelectorAll('.new-event').forEach((el) => el.value && events.push(el.value));

        this.setState((currentState, props) => {
            const newEntries = currentState.entries.concat([{ events, timestamp, id }])
            return {
                entries: newEntries
            };
        }, () => {
            localStorage.setItem(this.id, JSON.stringify(this.state));
            this.updateFilteredEntries();
        });

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
        }, () => {
            localStorage.setItem(this.id, JSON.stringify(this.state));
            this.updateFilteredEntries();
        });
    }

    handleDelete(e) {
        debugger
        e.preventDefault();
        const reallyDelete = confirm("Are you sure you want to delete this journal?");
        if (reallyDelete) this.props.deleteJournal(this.id);
    }

    updateFilteredEntries(entriesWith = this.state.entriesWith, entriesWithout = this.state.entriesWithout) {
        const filteredEntries = this.state.entries.filter(entry => {
            const entryHasEvents = entriesWith.every(eventWith => entry.events.includes(eventWith));
            const entryDoesNotHaveEvents = entriesWithout.every(eventWithout => entry.events.includes(eventWithout) === false);

            return entryHasEvents && entryDoesNotHaveEvents;
        });

        this.setState({
            entriesWith,
            entriesWithout,
            filteredEntries: filteredEntries || this.state.entries
        });
    }

    render() {
        const entries = this.state.filteredEntries
            .sort((entryA, entryB) => {
                return entryB.timestamp - entryA.timestamp;
            })
            .map((entry, index) => (
                <CSSTransition key={entry.id} classNames="entry" timeout={500}>
                    <Entry entry={entry} deleteEntry={this.deleteEntry} />
                </CSSTransition>
            ));
        return (
            <div className={`journal mv3 ${this.state.open ? 'open' : 'closed ba p3 ac'}`}>
                <JournalName
                    canEdit={this.state.open}
                    onClick={this.handleJournalNameClick}
                    onKeyDown={this.updateJournalName}
                    editingName={this.state.editingName}
                    closeJournal={this.closeJournal}
                    journalIsOpen={this.state.open}
                    deleteJournal={this.handleDelete}
                >
                    {this.state.name}
                </JournalName>
                <div className="r oxh">
                    <div className="c6 pr2">
                        <EntryForm addEntry={this.addEntry} />
                        <TransitionGroup>
                            {entries}
                        </TransitionGroup>
                    </div>
                    <div className="c6">
                        <FilterEntries entries={this.state.entries} updateFilteredEntries={this.updateFilteredEntries} />
                        <CorrelationTable entries={this.state.filteredEntries} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Journal;
