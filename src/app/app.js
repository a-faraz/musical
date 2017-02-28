import React from 'react';
import { render } from 'react-dom';

import { SearchBar } from './components/SearchBar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <SearchBar />
  </MuiThemeProvider>

)

render(
  <App />,
  document.getElementById('app')
);
