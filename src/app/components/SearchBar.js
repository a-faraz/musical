import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }
  };
  
  handleUpdateInput(value) {
    this.setState({
      dataSource: [
        value
      ],
    });
  };

  render() {
    return (
      <div className="search-bar">
        <AutoComplete
          hintText="Actor Name"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput.bind(this)}
          floatingLabelText="Search"
        />
      </div>
    );
  }
}
