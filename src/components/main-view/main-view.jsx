import React from 'react';
import axios from 'axios';

import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  componentDidMount() {
    axios.get(
      'https://myflixdatabase.herokuapp.com/movies').then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onRegistration(registered) {
    this.setState({
      registered
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!registered) return <RegistrationView onRegistration={registered => this.onRegistration(registered)} />;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


    if (movies.length === 0)
      return <div className='main-view' />;

    return (
      <div className='main-view'>
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
          ))
        }
      </div>
    );
  }
}
export default MainView;