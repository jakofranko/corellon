import React, { Component } from 'react';
import FilterEntriesWith from './filter-entries-with';
import { phi, tableFor } from './phi';

// TODO: Add sorting
// TODO: Filter considered entries by entries with multiple events, and entries without multiple events
class CorrelationTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            correlationEvent: '',
            entriesWith: [],
            entriesWithout: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.getUniqueEvents = this.getUniqueEvents.bind(this);
        this.setEntryFilters = this.setEntryFilters.bind(this);
        this.filterEntries = this.filterEntries.bind(this);
        this.addEntryFilterWithout = this.addEntryFilterWithout.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            correlationEvent: e.target.value
        });
    }

    setEntryFilters(entriesWith) {
        debugger;
        this.setState({
            entriesWith
        });
    }

    filterEntries(entries) {
        // Return entries that only contain events in the
        // 'entriesWith' state array, and that do not contain events
        // in the 'entriesWithout' state array
        debugger;
        return entries.filter(entry => {
            const entryHasEvents = this.state.entriesWith.every(eventWith => entry.events.includes(eventWith));
            const entryDoesNotHaveEvents = this.state.entriesWithout.every(eventWithout => entry.events.includes(eventWithout) === false);

            return entryHasEvents && entryDoesNotHaveEvents;
        });
    }

    addEntryFilterWithout(e) {
        e.preventDefault();
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
        const entries = this.filterEntries(this.props.entries);
        const uniqueEvents = this.getUniqueEvents(this.props.entries);
        const uniqueEventsFiltered = this.getUniqueEvents(entries);
        const eventOptions = uniqueEvents.map(event => <option key={event}>{event}</option>);
        const eventRows = uniqueEventsFiltered.map(event => {
            if (event === this.state.correlationEvent)
                return null;
            const table = tableFor(event, this.state.correlationEvent, entries);
            return (
                <tr key={event}>
                    <td>{event}</td>
                    <td>{phi(table)}</td>
                </tr>
            );
        });

        eventOptions.unshift(<option key="null" value="">Select Event</option>);

        return (
            <div className='correlation-table'>
                <label className="db mb1">Select Event to Display Correlations Against</label>
                <select className="correlation-event db mb1" onChange={this.handleChange}>
                    {eventOptions}
                </select>

                <FilterEntriesWith eventOptions={eventOptions} setEntryFilters={this.setEntryFilters} />

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
