import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import SpotifyAPI from '../api/spotifyAPI';

const urlStart = 'https://api.spotify.com/v1/albums/'
const albumId = '/v1/albums/ {id} /tracks'
const urlEnd = '/tracks'

export class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  };



  render() {
    return (
      <div className="track-list">
        Track List
      </div>
    );
  }
}
