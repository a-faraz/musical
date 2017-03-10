import React, { Component } from 'react';
import { browserHistory } from 'react-router';
// other components and APIs
import SpotifyAPI from '../api/spotifyAPI';
import { TrackList } from './track_list';
// Material UI dependencies
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

const urlStart = 'https://api.spotify.com/v1/artists/';
const urlEnd = '/albums';

export class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    }
  };
// method when item is selected
  onSelect(e) {
    let albumId = e.currentTarget.getAttribute('id');
    // store album Id so other component can fetch it
    localStorage.setItem('albumId', albumId);
    browserHistory.push('/tracks');
  }
// allows the API call to happen as soon as inital rendering occurs
  componentDidMount() {
    //get artist Id from localStorage to use in url
    const artId = localStorage.getItem('artistId');
    SpotifyAPI.getAlbums(urlStart + artId + urlEnd)
    .then(response => {
      // console.log(response.items);
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
    .catch(err => { console.log('Error: ', err) });

  }

  render() {
// styles for material ui
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
            cellHeight={360}
            style={styles.gridList}
          >
            <Subheader>Discography</Subheader>
            {this.state.albums.map((item) => (
                <GridTile className='album-tile'
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  subtitle={<span>by <b>{item.artist}</b></span>}
                  onClick={this.onSelect}
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
