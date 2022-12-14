import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';


import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

import { setMovies, setFilter, setUser } from '../../actions/actions';
import MoviesList from '../movie-list/movie-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { NavBar } from "../navbar/navbar";
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

import { Row, Col } from 'react-bootstrap';

import './main-view.scss';

class MainView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      // this.setState({
      //   user: localStorage.getItem('user')
      // });
      // this.getMovies(accessToken);
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflixdatabase.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token) {
    const Username = localStorage.getItem("user");
    axios.get(`https://myflixdatabase.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    // console.log(authData);
    // this.setState({
    //   user: authData.user.Username
    // });
    this.props.setUser(authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.set({
      user: ''
    });
    window.open('/', '_self');
  }

  render() {
    const { movies, user } = this.props;
    const { Username } = user;
    // let user = this.state;



    return (
      <Router>
        <NavBar user={Username} />
        <Row className='main-view justify-content-md-center'>
          <Route exact path='/' render={() => {
            if (!Username) return <Col>
              <LoginView onLoggedIn={Username => this.onLoggedIn(Username)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies} />;
          }} />


          <Route path='/register' render={() => {
            if (user) return <Redirect to='/' />;
            return <Col lg={8} md={8}> <RegistrationView /> </Col>
          }} />

          <Route path="/movies/:movieID" render={({ match, history }) => {
            return <Col md={12}>
              <MovieView movie={movies.find((m) => m._id === match.params.movieID)}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genre/:Name" render={({ match, history }) => {
            return (
              <Col md={12}>
                <GenreView genre={movies.find((m) => m.Genre.Name === match.params.Name).Genre}
                  onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />
          <Route path="/director/:Name" render={({ match, history }) => {
            return <Col md={12}>
              <DirectorView director={movies.find((m) => m.Director.Name === match.params.Name).Director}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path='/users/:username' render={({ history, match }) => {
            if (!user) return <Col>
              <LoginView movies={movies} onLoggedIn={(user) => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={12}>
              <ProfileView
                history={history}
                movies={movies}
                user={user === match.params.username}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
    // user: PopStateEvent.user
  };
};

export default connect(mapStateToProps, { setMovies, setFilter, setUser })(MainView);
//export default MainView