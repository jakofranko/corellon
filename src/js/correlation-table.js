import React, { Component } from 'react';
import EventSelect from './event-select';
import { phi, tableFor } from './phi';

// TODO: Add sorting
// TODO: Filter considered entries by entries with multiple events, and entries without multiple events
class CorrelationTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            correlationEvent: '',
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
        }).sort((row1, row2) => {
            const phi1 = row1 ? row1.props.children[1].props.children : 0;
            const phi2 = row2 ? row2.props.children[1].props.children : 0;
            return phi2 - phi1;
        });

        return (
            <div className='correlation-table mb4 ac'>
                <h2 className="mv2">Correlations</h2>
                <label className="db mb1">Select Event to Display Correlations Against</label>
                <EventSelect className="correlation-event db mb1 cn" value={this.state.correlationEvent} entries={this.props.entries} onChange={this.handleChange} />

                <table className="cn">
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
