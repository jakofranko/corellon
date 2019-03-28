import React, { Component } from 'react';
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
        console.log(this.state);
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

        filtersElements.forEach(filter => filters.push(filter.value));
        this.setState({
            filters
        }, () => this.props.setEntryFilters(this.state.filters));
    }

    render() {
        const filters = this.state.filters.map(filter => <select key={generateId()} defaultValue={filter} className="with-entry" onChange={this.handleChange}>{this.props.eventOptions}</select>)
        return (
            <div className="filter-entries-with">
                <label className="db mb1">Only Entries with Events:</label>
                <div className="filters">
                    {filters}
                </div>
                <button className="add-entry-filter-with" onClick={this.addFilter}>Add Filter</button>
            </div>
        );
    }
}

export default FilterEntriesWith;
