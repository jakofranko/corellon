import React, { Component } from 'react';
import EventSelect from './event-select';
import { generateId } from './utils';

class FilterEntriesWith extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: ['']
        };

        this.addFilter = this.addFilter.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addFilter(e) {
        e.preventDefault();
        this.setState((currentState, props) => {
            currentState.filters.push('');
            return {
                filters: currentState.filters
            };
        });
    }

    handleChange(e) {
        e.preventDefault();
        const filtersElements = e.target.closest(".filter-entries-with").querySelectorAll(".with-entry");
        let filters = []

        filtersElements.forEach(filter => filter.value !== '' && filters.push(filter.value));
        this.setState({
            filters
        }, () => this.props.setEntryFilters(this.state.filters));
    }

    render() {
        const filters = this.state.filters.map(filter => <EventSelect key={generateId()} entries={this.props.entries} value={filter} className="with-entry" onChange={this.handleChange} />)
        return (
            <div className="filter-entries-with">
                <label className="db mb1">Only Entries <strong>With</strong> Events:</label>
                <div className="filters mb2">
                    {filters}
                </div>
                <button className="add-entry-filter-with p2" onClick={this.addFilter}>Add Filter</button>
            </div>
        );
    }
}

export default FilterEntriesWith;
