import React, { Component } from 'react';

import Journal from './journal';

class JournalList extends Component {
    render() {
        const journalIds = Object.keys(localStorage).filter(key => key.match("journal-"));
        const journals = journalIds.map(id => <Journal key={id} journalId={id} />);

        return (
            <div className="journal-list">
                {
                    journals.length
                    ? journals
                    : <Journal />
                }
            </div>
        )
    }
}

export default JournalList;
