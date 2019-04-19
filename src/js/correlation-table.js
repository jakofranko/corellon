import React, { Component } from 'react';
import FilterEntriesWith from './filter-entries-with';
import FilterEntriesWithout from './filter-entries-without';
import { phi, tableFor } from './phi';

// TODO: Add sorting
// TODO: Filter considered entries by entries with multiple events, and entries without multiple events
class CorrelationTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredEntries: this.props.entries,
            correlationEvent: '',
            entriesWith: [],
            entriesWithout: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.getUniqueEvents = this.getUniqueEvents.bind(this);
        this.setEntryFilters = this.setEntryFilters.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            correlationEvent: e.target.value
        });
    }

    setEntryFilters(ew, ewo) {
        this.setState(currentState => {
            const entriesWith = ew ? ew : currentState.entriesWith;
            const entriesWithout = ewo ? ewo : currentState.entriesWithout;
            const filteredEntries = this.props.entries.filter(entry => {
                const entryHasEvents = entriesWith.every(eventWith => entry.events.includes(eventWith));
                const entryDoesNotHaveEvents = entriesWithout.every(eventWithout => entry.events.includes(eventWithout) === false);

                return entryHasEvents && entryDoesNotHaveEvents;
            });

            return {
                entriesWith,
                entriesWithout,
                filteredEntries
            };
        }, () => this.props.updateFilteredEntries(this.state.filteredEntries));
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
        const uniqueEventsFiltered = this.getUniqueEvents(this.state.filteredEntries);
        const eventOptions = uniqueEvents.map(event => <option key={event}>{event}</option>);
        const eventRows = uniqueEventsFiltered.map(event => {
            if (event === this.state.correlationEvent)
                return null;
            const table = tableFor(event, this.state.correlationEvent, this.state.filteredEntries);
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


        eventOptions.unshift(<option key="null" value="">Select Event</option>);

        return (
            <div className='correlation-table'>
                <label className="db mb1">Select Event to Display Correlations Against</label>
                <select className="correlation-event db mb1" onChange={this.handleChange}>
                    {eventOptions}
                </select>

                <FilterEntriesWith eventOptions={eventOptions} setEntryFilters={this.setEntryFilters} />
                <FilterEntriesWithout eventOptions={eventOptions} setEntryFilters={this.setEntryFilters} />

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
