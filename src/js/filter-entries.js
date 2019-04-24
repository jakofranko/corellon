import React, { Component } from 'react';
import FilterEntriesWith from './filter-entries-with';
import FilterEntriesWithout from './filter-entries-without';

class FilterEntries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entriesWith: [],
            entriesWithout: [],
            filteredEntries: this.props.entries
        }

        this.setEntryFilters = this.setEntryFilters.bind(this);
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

    render() {
        return (
            <div className="filter-entries">
                <h2 className="mb2">Filter Entries</h2>
                <FilterEntriesWith entries={this.props.entries} setEntryFilters={this.setEntryFilters} />
                <FilterEntriesWithout entries={this.props.entries} setEntryFilters={this.setEntryFilters} />
            </div>
        )
    }
}

export default FilterEntries;
