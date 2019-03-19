import React, { Component } from 'react';

import Journal from './journal';

class JournalList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addingJournal: false
        };

        this.addJournal = this.addJournal.bind(this);
    }

    addJournal(e) {
        e.preventDefault();
        this.setState({
            addingJournal: true
        });
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
        const journals = journalIds.map(id => <Journal key={id} journalId={id} />);

        return (
            <div className="journal-list">
                <h1 className="bb lhs pb2">Journals</h1>
                {
                    journals.length
                    ? journals
                    : <Journal />
                }
                {this.state.addingJournal && <Journal />}
                <button className="bg-blanc ba db wf f2 fwb pv2" onClick={this.addJournal}>New Journal +</button>
            </div>
        )
    }
}

export default JournalList;
