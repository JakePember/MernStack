import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles'; // HOC to style the component
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import seashellImg from '../assets/images/seashell.jpg';
import auth from '../auth/auth-helper';
import FindPeople from '../user/FindPeople';
import Newsfeed from '../post/Newsfeed';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 5,
  },
  title: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.text.secondary,
  },
  media: {
    minHeight: 330,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);

    // this.homePageNotSignedIn = this.homePageNotSignedIn.bind(this);

    this.state = {
      defaultPage: true,
    };
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps() {
    this.init();
  }

  notSignedIn = function notSignedIn(classes) { // Display this page if the user is NOT authorized
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <Typography type="headline" component="h2" className={classes.title}>Home Page</Typography>
            <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells" />
            <CardContent>
              <Typography type="body1" component="p">Welcome to the MERN Social home page.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  signedIn = function signedIn() { // Display this page if the user is authorized
    return (
      <Grid container spacing={24}>
        <Grid item xs={8} sm={7}>
          <Newsfeed />
        </Grid>
        <Grid item xs={6} sm={5}>
          <FindPeople />
        </Grid>
      </Grid>
    );
  }


  init() { // Makes sure there is a valid Auth token
    if (auth.isAuthenticated()) {
      this.setState({ defaultPage: false }); // Show signed in page
    } else {
      this.setState({ defaultPage: true }); // Show not signed in page
    }
  }

  render() {
    const { classes } = this.props;
    // If default home false, this means the user is logged in
    const { defaultPage } = this.state;
    return (
      <div className={classes.root}>
        {defaultPage ? this.notSignedIn(classes) : this.signedIn()}
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    card: PropTypes.string,
    title: PropTypes.string,
    media: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Home);
