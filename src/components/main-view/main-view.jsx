import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';



import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
  }

  render() {
    const { movies, user } = this.state;


    return (
      <Router>
        <Row className='main-view justify-content-md-center'>
          <Route exact path='/' render={() => {
            if (!user)
              return (
                <Col>
                  <LoginView
                    movies={movies}
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                  />
                </Col>
              );
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map((m) => (
              <Col md={4} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ));
          }} />
          <Route path="/movies/:movieID" render={({ match, history }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={12}>
                <MovieView movie={movies.find((m) => m._id === match.params.movieID)}
                  onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />
          <Route path="/genre/:Name" render={({ match, history }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={12}>
                <GenreView genre={movies.find((m) => m.Genre.Name === match.params.Name).Genre}
                  onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />
          <Route path="/director/:Name" render={({ match, history }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={12}>
                <DirectorView director={movies.find((m) => m.Director.Name === match.params.Name).Director}
                  onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />
          <button className='logout' onClick={() => { this.onLoggedOut() }}>Logout</button>
        </Row>
      </Router>
    );
  }
}
export default MainView