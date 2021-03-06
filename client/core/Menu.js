import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';
import Button from 'material-ui/Button';
import { Link, withRouter } from 'react-router-dom';
import auth from '../auth/auth-helper';

const isActive = (history, path) => {
  if (history.location.pathname === path) { return { color: '#ffa726' }; }
  return { color: '#ffffff' };
};

const notSignedIn = function notSignedIn(history) {
  return (
    <span>
      <Link to="/signup">
        <Button style={isActive(history, '/signup')}>Sign up</Button>
      </Link>
      <Link to="/signin">
        <Button style={isActive(history, '/signin')}>Sign In</Button>
      </Link>
    </span>
  );
};

const signedIn = function signedIn(history) {
  return (
    <span>
      <Link to={`/user/${auth.isAuthenticated().user.id}`}>
        <Button style={isActive(history, `/user/${auth.isAuthenticated().user.id}`)}>My Profile</Button>
      </Link>
      <Button color="inherit" onClick={() => { auth.signout(() => history.push('/')); }}>Sign out</Button>
    </span>
  );
};
const Menu = withRouter(({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography type="title" color="inherit">MERN Social</Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(history, '/')}>
          <HomeIcon />
        </IconButton>
      </Link>
      { auth.isAuthenticated() ? signedIn(history) : notSignedIn(history) }
    </Toolbar>
  </AppBar>
));

export default Menu;
