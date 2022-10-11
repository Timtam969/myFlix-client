import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


import './movie-view.scss';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img className="image" src={movie.Image} />
        </div>
        <br />
        <div className="movie-title-label">
          <span className="label">Movie Title: </span>
        </div>
        <div className="movie-title-value">
          <span className="value">{movie.Title}</span>
        </div>
        <br />

        <div className="movie-description-label">
          <span className="label">Movie Description: </span>
        </div>
        <div className="movie-description-value">
          <span className="value">{movie.Description}</span>

        </div>
        <br />
        <div className="movie-genre-type-label">
          <span className="label">Genre Type: </span>
        </div>
        <div className="movie-genre-type-value">
          <Link to={`/genre/${movie.Genre.Name}`}>
            <Button variant="link">{movie.Genre.Name}</Button>
          </Link>
        </div>
        <br />
        <div className="movie-director-name-label">
          <span className="label">Director Name: </span>
        </div>
        <div className="movie-director-name-value">
          <Link to={`/director/${movie.Director.Name}`}>
            <Button variant="link">{movie.Director.Name}</Button>
          </Link>
        </div>
        <br />
        <button className='button' onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}