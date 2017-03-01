import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import SpotifyAPI from '../api/spotifyAPI';
import { TrackList } from './track_list';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const urlStart = 'https://api.spotify.com/v1/artists/';
const urlEnd = '/albums';

export class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    }
  };

  componentDidMount() {
    const artId = localStorage.getItem("artistId");
    SpotifyAPI.getAlbums(urlStart + artId + urlEnd)
    .then((response) => {
      console.log(response.items);
      let mapped = response.items.map(function(item){
        const newObj = {};
        newObj.name = item.name;
        newObj.img = item.images[0].url;
        newObj.artist = item.artists[0].name;
        newObj.id = item.id;
        return newObj;
      });
      this.setState({ albums: mapped })
    })
    .catch((err) => { console.log("Error: ", err) });

  }

  render() {

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 800,
        height: 800,
        overflowY: 'auto',
      },
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={styles.root}>
          <GridList
            cellHeight={360}
            style={styles.gridList}
          >
            <Subheader>Discography</Subheader>
            {this.state.albums.map((item) => (
              <GridTile
                key={item.id}
                title={item.name}
                subtitle={<span>by <b>{item.artist}</b></span>}
              >
                <img src={item.img} />
              </GridTile>
            ))}
          </GridList>
        </div>
      </MuiThemeProvider>
    );
  }
}
