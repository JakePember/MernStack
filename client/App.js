import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // This will basically watch the URL and then will pass the path to its children
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { teal, orange } from 'material-ui/colors'; // Colors...
import { hot } from 'react-hot-loader'; // Basically keeps the app running and injects new versions of the file at runtime. Good to maintain state when developing
import MainRouter from './MainRouter'; // Handles and routes to find the correct component

// Create a theme instance.
const theme = createMuiTheme({ // Create a theme to wrap your entire program with
  palette: { // declaring our own palette to overide default
    primary: { // Used to represent primary interface elements for a user
      light: '#52c7b8',
      main: '#009688',
      dark: '#00675b',
      contrastText: '#fff',
    },
    secondary: { // Used to represent secondary interface elements to the user
      light: '#ffd95b',
      main: '#ffa726',
      dark: '#c77800',
      contrastText: '#000',
    },
    openTitle: teal['700'], // UNSURE
    protectedTitle: orange['700'], // UNSURE
    type: 'light',
  },
});

const App = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      {/* Wrapping main component with the theme from above */}
      <MainRouter />
      {/* Handles and routes to find the correct component */}
    </MuiThemeProvider>
  </BrowserRouter>
);

export default hot(module)(App);
