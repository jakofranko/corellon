import React, { Component } from 'react';

class EntryForm extends Component {
    constructor(props) {
        super(props);

        this.addEvent = this.addEvent.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    addEvent(e) {
        e.preventDefault();
        let event = document.createElement("input");
        event.classList = "new-event p1";
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
                <div className="new-events">
                    <input className="new-event p1" placeholder="Event" onKeyDown={this.handleKeyDown} />
                    <button className="add-event p2" onClick={this.addEvent}>+</button>
                </div>
                <button className="add-entry p2" onClick={this.props.addEntry}>Add Entry</button>
            </div>
        );
    }
}

export default EntryForm;
