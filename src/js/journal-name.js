import React, { Component } from 'react';

class JournalName extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="journal-name">
                {
                    this.props.editingName
                    ? <input defaultValue={this.props.children} onKeyDown={this.props.onKeyDown} autoFocus />
                    : <h1 className="mb3 lhs" onClick={this.props.onClick}>
                        {this.props.children}
                        {this.props.journalIsOpen && <button className="close-journal mh1 p1" onClick={this.props.closeJournal}>Close Journal</button>}
                    </h1>
                }
            </div>
        );
    }
}

export default JournalName;
