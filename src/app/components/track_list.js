import React, { Component } from 'react';
import SpotifyAPI from '../api/spotifyAPI';

import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const urlStart = 'https://api.spotify.com/v1/albums/';

export class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      trackImg: ""
    }
  };

  componentDidMount() {
    const albumId = localStorage.getItem("albumId");
    SpotifyAPI.getTracks(urlStart + albumId)
      .then(response => {
        console.log("response: ", response);
        let mapped = response.tracks.items.map(song => {
          let newObj = {};
          newObj.title = song.name;
          newObj.duration = song.duration_ms;
          newObj.artist = song.artists[0].name;
          newObj.id = song.id;
          return newObj;
        })
        this.setState({tracks: mapped, trackImg: response.images[0].url});
      })
      .catch(err => {
        console.log('Error', err);
      })
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
        margin: 10,
        overflowY: 'auto',
      },
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={styles.root}>
          <GridList
            cellHeight={150}
            style={styles.gridList}
          >
            <Subheader>Track List</Subheader>
            {this.state.tracks.map((item) => (
              <GridTile
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={<span>by <b>{item.artist}</b></span>}
              >
                <img src={this.state.trackImg} />
              </GridTile>
            ))}
          </GridList>
        </div>
      </MuiThemeProvider>
    );
  }
}
