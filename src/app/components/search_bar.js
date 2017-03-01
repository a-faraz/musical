import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import SpotifyAPI from '../api/spotifyAPI';
import { Router, Route, browserHistory } from 'react-router';
import { AlbumList } from './album_list';


const urlStart = 'https://api.spotify.com/v1/search?q='
const urlEnd = '&type=artist&limit=5'

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      artistId: ''
    }
  };

  // this method is used to fetch a list of artists for the AutoComplete - based on user input
  handleUpdateInput(value) {
    const self = this;
    if (value) {
      SpotifyAPI.getArtist(urlStart + value + urlEnd)
      .then((response) => {
        let artists = response.artists.items;
        let artistNames = [];

        artists.forEach(val => artistNames.push(val.name) );
        self.setState({ dataSource: artistNames });
        self.setState({ artistId: artists[0].id });
      })
      .catch((err) => { console.log('Error: ', err)})
    }
  };

  // this method is fired when a list item is selected or enter is pressed
  onNewRequest(selectItem) {
    const self = this;
    console.log('selectItem: ', selectItem);
    console.log('selectId: ', self.state.artistId);
    localStorage.setItem("artistId", self.state.artistId);
    browserHistory.push('/albums');
  }

  render() {
    return (
      <div className="search-bar">
        <h2>Welcome to Musical</h2>
        <h4>The Number One Spotify App!</h4>
        <AutoComplete
          floatingLabelText="Search Actor"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput.bind(this)}
          onNewRequest={this.onNewRequest.bind(this)}
          filter={AutoComplete.caseInsensitiveFilter}
        />
      </div>
    );
  }
}
