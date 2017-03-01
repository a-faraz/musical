import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import SpotifyAPI from '../api/spotifyAPI';

const urlStart = 'https://api.spotify.com/v1/artists/'
const artistId = '/v1/artists/ {id} /albums'
const urlEnd = '/albums'

let albums = [];

export class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  };

  componentDidMount() {
    SpotifyAPI.getAlbums(urlStart + "2mxe0TnaNL039ysAj51xPQ" + urlEnd)
    .then((response) => {
      console.log(response.items);
      albums = response.items.map(function(item){
        const newObj = {};
        newObj.name = item.name;
        newObj.cover = item.images[0].url;
        newObj.artist = item.artists[0].name;
        newObj.id = item.id;
        return newObj;
      });
      console.log('albumss: ', albums);
    })
    .catch((err) => { console.log("Error: ", err) });

  }


  render() {
    return (
      <div className="album-list">
        Album List
      </div>
    );
  }
}
