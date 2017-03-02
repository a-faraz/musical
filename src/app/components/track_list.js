import React, { Component } from 'react';
// other components and APIs
import SpotifyAPI from '../api/spotifyAPI';
// Material UI dependencies
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

const urlStart = 'https://api.spotify.com/v1/albums/';

export class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      trackData: {
        img: '',
        year: ''
      }
    }
  };

  componentDidMount() {
    // get albumId from localStorage to use in URL
    const albumId = localStorage.getItem('albumId');
    SpotifyAPI.getTracks(urlStart + albumId)
      .then(response => {
        console.log('eetre', response)
        let mapped = response.tracks.items.map(song => {
          let newObj = {};
          newObj.title = song.name;
          newObj.duration = this.msToMinutesAndSeconds(song.duration_ms);
          newObj.artist = song.artists[0].name;
          newObj.id = song.id;
          return newObj;
        })
        // store the mapped array, albumcover, and release year into state
        this.setState({
          tracks: mapped,
          trackData: {
            img: response.images[0].url,
            year: response.release_date.slice(0,4)
          }
        });
      })
      .catch(err => {
        console.log('Error', err);
      })
  }

  msToMinutesAndSeconds(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {
// material ui styles
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
      }
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={styles.root}>
          <GridList
            cellHeight={180}
            style={styles.gridList}
          >
            <Subheader>Track List <span>({this.state.trackData.year})</span></Subheader>
            {this.state.tracks.map((item) => (
              <GridTile
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={<span>by <b>{item.artist}</b></span>}
                actionIcon={<span className='song-length'>{item.duration}</span>}
              >
                <img src={this.state.trackData.img} />
              </GridTile>
            ))}
          </GridList>
        </div>
      </MuiThemeProvider>
    );
  }
}
