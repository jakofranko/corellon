import React, { Component } from 'react';

import Journal from './journal';
import Book from './book';
import testData from './test-data';

if (build.mode === 'development' && !localStorage.getItem('journal-test-data')) localStorage.setItem('journal-test-data', JSON.stringify({ entries: testData }))

class JournalList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            journalIds: Object.keys(localStorage).filter(key => key.match("journal-")),
            addingJournal: false
        };

        this.addJournal = this.addJournal.bind(this);
        this.deleteJournal = this.deleteJournal.bind(this);
        this.refreshJournalIds = this.refreshJournalIds.bind(this);
    }

    addJournal(e) {
        e.preventDefault();
        this.setState({
            addingJournal: true
        });
    }

    refreshJournalIds(callback) {
        this.setState({
            journalIds: Object.keys(localStorage).filter(key => key.match("journal-"))
        }, callback);
    }

    deleteJournal(journalId) {
        localStorage.removeItem(journalId);
        this.refreshJournalIds();
    }

    componentDidUpdate() {
        // If we just added a journal, switch this off and update journal ids
        if (this.state.addingJournal) {
            this.refreshJournalIds(() => {
                this.setState({
                    addingJournal: false
                });
            });
        }
    }

    render() {
        const journals = build.mode === 'foo'
            ? this.state.journalIds.map((id, i) => <Book key={id} journalId={id} order={i} totalJournals={this.state.journalIds.length} />)
            : this.state.journalIds.map(id => <Journal key={id} journalId={id} deleteJournal={this.deleteJournal} />);

        return (
            <div className="journal-list cn mv5 vw6">
                <h1 className="bb lhs pb2">Journals</h1>
                {build.mode === 'foo'
                    ? <div className="book-scene clearfix">{journals}</div>
                    : journals.length
                    ? journals
                    : <Journal deleteJournal={this.deleteJournal} />
                }
                {this.state.addingJournal && <Journal deleteJournal={this.deleteJournal} />}
                <button className="bg-blanc ba db wf f2 fwb pv2" onClick={this.addJournal}>New Journal +</button>
            </div>
        )
    }
}

export default JournalList;
