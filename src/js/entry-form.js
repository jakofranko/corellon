import React, { Component } from 'react';

class EntryForm extends Component {
    constructor(props) {
        super(props);

        this.addEvent = this.addEvent.bind(this);
    }

    addEvent(e) {
        e.preventDefault();
        let event = document.createElement("input");
        event.classList = "new-event p1";
        event.placeholder = "Event";

        e.target.closest(".new-events").prepend(event);
        event.focus();
    }

    render() {
        return (
            <div className="entry-form c6">
                <h2 className="mb2 lhs">New Entry</h2>
                <div className="new-events">
                    <input className="new-event p1" placeholder="Event" />
                    <button className="add-event p2" onClick={this.addEvent}>+</button>
                </div>
                <button className="add-entry p2" onClick={this.props.addEntry}>Add Entry</button>
            </div>
        );
    }
}

export default EntryForm;
