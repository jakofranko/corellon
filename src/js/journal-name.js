import React, { Component } from 'react';

class JournalName extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                {
                    this.props.editingName
                    ? <input defaultValue={this.props.children} onKeyDown={this.props.onKeyDown} autoFocus />
                    : <h1 className="mb3 lhs" onClick={this.props.onClick}>{this.props.children}</h1>
                }
            </div>
        );
    }
}

export default JournalName;
