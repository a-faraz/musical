import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
// other components and APIs
import { SearchBar } from './components/search_bar';
import { TrackList } from './components/track_list';
import { AlbumList } from './components/album_list';
import SpotifyAPI from './api/spotifyAPI';
// Material UI dependencies
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// stateless component
const App = () => {

      return (
        <MuiThemeProvider>
            <SearchBar />
        </MuiThemeProvider>
      )

};

// react-router routes

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/albums" component={AlbumList}/>
    <Route path="/tracks" component={TrackList}/>
  </Router>,
  document.getElementById('app')
);
