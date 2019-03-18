import React, { Component } from 'react';

import Journal from './journal';

class JournalList extends Component {
    render() {
        const journals = this.props.journalIds.map(id => <Journal key={id} journalId={id} />);
        
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
