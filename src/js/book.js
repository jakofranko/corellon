import React, { Component } from 'react';

import { generateId } from './utils';

class Book extends Component {
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

        // this.handleJournalNameClick = this.handleJournalNameClick.bind(this);
        // this.updateJournalName = this.updateJournalName.bind(this);
        // this.addEntry = this.addEntry.bind(this);
        // this.deleteEntry = this.deleteEntry.bind(this);
        // this.closeJournal = this.closeJournal.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);
    }

    render() {
        const bookStyle = {
            zIndex: 100 - this.props.order
        };

        return (
            <div className="book" style={bookStyle}>
                <div className="book-side book-left spine">{this.state.name}</div>
                <div className="book-side book-front"></div>
                <div className="book-side book-back"></div>
                <div className="book-side book-top pages-top-bottom"></div>
                <div className="book-side book-bottom pages-top-bottom"></div>
                <div className="book-side book-right pages-right"></div>
            </div>
        )
    }
}

export default Book;
