import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { SearchBar } from './components/search_bar';
import { TrackList } from './components/track_list';
import { AlbumList } from './components/album_list';

import SpotifyAPI from './api/spotifyAPI';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Router, Route, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: []
    }
  };


  render() {
      return (<MuiThemeProvider>
                <SearchBar />
              </MuiThemeProvider>
      )
  }
};

// react-router routes!!

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/search" component={SearchBar}/>
    <Route path="/albums" component={AlbumList}/>
    <Route path="/tracks" component={TrackList}/>
  </Router>,
  document.getElementById('app')
);
