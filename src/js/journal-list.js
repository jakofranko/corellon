import React, { Component } from 'react';

import Journal from './journal';
import Book from './book';
import testData from './test-data';

if (build.mode === 'development' && !localStorage.getItem('journal-test-data')) localStorage.setItem('journal-test-data', JSON.stringify({ entries: testData }))

class JournalList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addingJournal: false
        };

        this.addJournal = this.addJournal.bind(this);
        this.deleteJournal = this.deleteJournal.bind(this);
    }

    addJournal(e) {
        e.preventDefault();
        this.setState({
            addingJournal: true
        });
    }

    deleteJournal(journalId) {
        localStorage.removeItem(journalId);
        this.forceUpdate();
    }

    componentDidUpdate() {
        // If we just added a journal, switch this off
        if (this.state.addingJournal) {
            this.setState({
                addingJournal: false
            });
        }
    }

    render() {
        const journalIds = Object.keys(localStorage).filter(key => key.match("journal-"));
        const journals = build.mode === 'development'
            ? journalIds.map((id, i) => <Book key={id} journalId={id} order={i} />)
            : journalIds.map(id => <Journal key={id} journalId={id} deleteJournal={this.deleteJournal} />);

        return (
            <div className="journal-list">
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
