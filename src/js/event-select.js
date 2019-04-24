import React, { Component } from 'react';
import { generateId } from './utils';

class EventSelect extends Component {
    constructor(props) {
        super(props);

        this.getUniqueEvents = this.getUniqueEvents.bind(this);
    }

    getUniqueEvents(entries) {
        let events = [];
        for (let entry of entries) {
            for (let event of entry.events) {
                if (!events.includes(event)) {
                    events.push(event);
                }
            }
        }

        return events;
    }

    render() {
        const uniqueEvents = this.getUniqueEvents(this.props.entries);
        const eventOptions = uniqueEvents.map(event => <option key={generateId()} value={event}>{event}</option>);
        eventOptions.unshift(<option key={generateId()} value="">Select Event</option>);

        return <select className={this.props.className} value={this.props.value ? this.props.value : ''} onChange={this.props.onChange}>{eventOptions}</select>
    }
}

export default EventSelect;
