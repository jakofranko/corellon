import React, { Component, Fragment } from 'react';

class JournalName extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="journal-name">
                {this.props.editingName
                    ? <input
                        defaultValue={this.props.children}
                        onKeyDown={this.props.onKeyDown}
                        autoFocus
                      />
                    : <h2 className={`lhs ${this.props.journalIsOpen ? 'mb3' : ''}`} onClick={this.props.onClick}>
                        {this.props.children}
                        {this.props.journalIsOpen &&
                            <Fragment>
                                <button className="close-journal mh1 p1 vm" onClick={this.props.closeJournal}>
                                    Close Journal
                                </button>
                                <button className="rf p2 ba red b-red bg-blanc" onClick={this.props.deleteJournal}>
                                    Delete Journal
                                </button>
                            </Fragment>
                        }
                    </h2>
                }
            </div>
        );
    }
}

export default JournalName;
