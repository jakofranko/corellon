import React, { Component } from 'react';
import { phi, tableFor } from './phi';

class CorrelationTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            correlationEvent: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.getUniqueEvents = this.getUniqueEvents.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            correlationEvent: e.target.value
        });
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
        const eventOptions = uniqueEvents.map(event => <option key={event}>{event}</option>);
        const eventRows = uniqueEvents.map(event => {
            if (event === this.state.correlationEvent)
                return null;
            const table = tableFor(event, this.state.correlationEvent, this.props.entries);
            return (
                <tr key={event}>
                    <td>{event}</td>
                    <td>{phi(table)}</td>
                </tr>
            );
        });

        return (
            <div className='correlation-table'>
                <label>Select Event to Display Correlations Against</label>
                <select className="correlation-event" onChange={this.handleChange}>
                    {eventOptions}
                </select>

                <table>
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Phi({this.state.correlationEvent})</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CorrelationTable;
