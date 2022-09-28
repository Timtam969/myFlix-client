import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      <div className="movie-view justify-content-md-center">
        <div className="movie-poster">
          <img className="image" src={movie.Image} />
        </div>
        <br />
        <div className="movie-title">
          <span className="label">Movie Title: </span>
          <br />
          <span className="value">{movie.Title}</span>
        </div>
        <br />
        <div className="movie-description">
          <span className="label">Movie Description: </span>
          <br />
          <span className="value">{movie.Description}</span>
        </div>
        <br />
        <div className="movie-genre-type">
          <span className="label">Genre Type: </span>
          <br />
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <br />
        <div className="movie-genre-description">
          <span className="label">Genre Description: </span>
          <br />
          <span className="value">{movie.Genre.Description}</span>
        </div>
        <br />
        <div className="movie-director-name">
          <span className="label">Director Name: </span>
          <br />
          <span className="value">{movie.Director.Name}</span>
        </div>
        <br />
        <div className="movie-director-biography">
          <span className="label">Director Biography: </span>
          <br />
          <span className="value">{movie.Director.Bio}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}