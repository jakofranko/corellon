import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Journal from './journal';
import Book from './book';
import testData from './test-data';

if (build.mode === 'development' && !localStorage.getItem('journal-test-data')) {
    localStorage.setItem('journal-test-data', JSON.stringify({ entries: testData }));
}

const journalPrefix = "journal-";

class JournalList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            journalIds: Object.keys(localStorage).filter(key => key.match(journalPrefix)),
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
            journalIds: Object.keys(localStorage).filter(key => key.match(journalPrefix))
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
        const journals = this.state.journalIds
            .sort((idA, idB) => {
                const suffixA = Number(idA.replace(journalPrefix, ''));
                const suffixB = Number(idB.replace(journalPrefix, ''));
                if (Number.isNaN(suffixA))
                    return -1;
                if (Number.isNaN(suffixB))
                    return 1;

                return suffixB - suffixA;
            })
            .map(id => (
                <CSSTransition timeout={500} classNames="journal" key={id}>
                    <Journal key={id} journalId={id} deleteJournal={this.deleteJournal} />
                </CSSTransition>
            ));

        return (
            <div className="journal-list cn mv5 vw6-l vw8-m vw-s oxh">
                <h1 className="bb lhs pb2">Journals</h1>
                <TransitionGroup>
                    {journals}
                </TransitionGroup>
                {this.state.addingJournal && <Journal deleteJournal={this.deleteJournal} />}
                <button className="bg-blanc ba db wf f2 fwb pv2" onClick={this.addJournal}>New Journal +</button>
            </div>
        )
    }
}

export default JournalList;
