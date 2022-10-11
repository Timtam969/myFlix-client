import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';


import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { NavBar } from "../navbar/navbar";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

import { Row, Col } from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://myflixdatabase.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        // assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // setSelectedMovie(newSelectedMovie) {
  //   this.setState({
  //     selectedMovie: newSelectedMovie
  //   });
  // }

  // onRegistration(registered) {
  //   this.setState({
  //     registered
  //   });
  // }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  render() {
    const { movies, user } = this.state;


    return (
      <Router>
        <NavBar user={user} />
        <Row className='main-view justify-content-md-center'>
          <Route exact path='/' render={() => {
            if (!user) return <Col>
              <LoginView movies={movies} onLoggedIn={(user) => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map((m) => (
              <Col md={4} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ));
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
            return (<Col md={12}>
              <ProfileView history={history} movies={movies} user={user === match.params.username} />
            </Col>
            );
          }} />

          <Route path={`/user-update/${user}`} render={({ match, history }) => {
            if (!user) return <Redirect to='/' />;
            return (
              <Col>
                <UserUpdate user={user} onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />

        </Row>
      </Router>
    );
  }
}
export default MainView