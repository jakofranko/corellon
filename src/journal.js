import React, { Component } from 'react' ;
import { phi, tableFor } from './phi';

class Journal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: []
        };
    }

    addEntry(events) {
        this.setState((currentState, props) => {
            return {
                entries: currentState.entries.push({ events })
            };
        })
    }

    getUniqueEvents() {
        let events = [];
        for (let entry of this.state.entries) {
            for (let event of entry.events) {
                if (!events.includes(event)) {
                    events.push(event);
                }
            }
        }

        return events;
    }

    render() {
        return <div className="journal">I am a Journal</div>;
    }
}

export default Journal;
