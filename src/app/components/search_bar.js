import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
// other components and APIs
import SpotifyAPI from '../api/spotifyAPI';
import { AlbumList } from './album_list';
// Material UI dependencies
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';


const urlStart = 'https://api.spotify.com/v1/search?q='
const urlEnd = '&type=artist&limit=10'

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      artistId: ''
    }
  };

  // this method fetches a list of artists for the AutoComplete - based on user input
  handleUpdateInput(value) {
    const self = this;
    if (value) {
      SpotifyAPI.getArtist(urlStart + value + urlEnd)
      .then((response) => {
        let artists = response.artists.items;
        let artistNames = [];

        artists.forEach(val => artistNames.push(val.name) );
        self.setState({ dataSource: artistNames,
                        artistId: artists[0].id });
      })
      .catch((err) => { console.log('Error here: ', err)})
    }
  };

  // this method is fired when a list item is selected or enter is pressed
  onNewRequest(selectItem) {
    const self = this;
    localStorage.setItem('artistId', self.state.artistId);
    browserHistory.push('/albums');
  }

  render() {
    return (
      <div className='search-bar'>
        <h2 className='page-title'>Spotified</h2>
        <h4 className='sub-title'>The Number One Spotify App!</h4>
        <AutoComplete
          floatingLabelText='Search Artist'
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput.bind(this)}
          onNewRequest={this.onNewRequest.bind(this)}
          filter={AutoComplete.caseInsensitiveFilter}
        />
        <br/>
        <img src='./app/img/music-icon.png' className='main-photo'/>
      </div>
    );
  }
}
