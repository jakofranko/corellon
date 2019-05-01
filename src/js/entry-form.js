import React, { Component } from 'react';

const buttonInputClasses = "f5 lhc p2 bn";

class EntryForm extends Component {
    constructor(props) {
        super(props);

        this.addEvent = this.addEvent.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    addEvent(e) {
        e.preventDefault();
        let event = document.createElement("input");
        event.classList = `new-event ${buttonInputClasses}`;
        event.placeholder = "Event";
        event.onkeydown = this.handleKeyDown;

        e.target.closest(".new-events").prepend(event);
        event.focus();
    }

    handleKeyDown(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            this.addEvent(e);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            this.props.addEntry(e);
        }
    }

    render() {
        return (
            <div className="entry-form mb4">
                <h3 className="mb2 lhs">New Entry</h3>
                <small><em>Use buttons, or Tab to add an additional event, enter to add the entry.</em></small>
                <div className="new-events mb2">
                    <input className={`new-event ${buttonInputClasses}`} placeholder="Event" onKeyDown={this.handleKeyDown} />
                    <button className={`add-event ${buttonInputClasses}`} onClick={this.addEvent}>+</button>
                </div>
                <button className="add-entry f5 p2" onClick={this.props.addEntry}>Add Entry</button>
            </div>
        );
    }
}

export default EntryForm;
