import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import SpotifyAPI from '../api/spotifyAPI';


const urlStart = 'https://api.spotify.com/v1/search?q='
const urlEnd = '&type=artist&limit=10'

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      inputText: ''
    }
  };

  handleUpdateInput(value) {
    let self = this;
    if (value) {
      SpotifyAPI.getArtist(urlStart + value + urlEnd)
      .then(function(data){
        let artists = data.artists.items;
        let artistNames = [];
        artists.forEach(function(val){
          artistNames.push(val.name)
        })
        self.setState({ dataSource: artistNames });
      })
    }
  };

  render() {
    return (
      <div className="search-bar">
        <AutoComplete
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput.bind(this)}
          floatingLabelText="Search Actor"
          filter={AutoComplete.caseInsensitiveFilter}
        />
      </div>
    );
  }
}
