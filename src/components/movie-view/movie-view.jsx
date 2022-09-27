import React from 'react';

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
          <img src={movie.Image} />
        </div>
        <div className="movie-title">
          <span className="label">Movie Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Movie Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre-type">
          <span className="label">Genre Type: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-genre-description">
          <span className="label">Genre Description: </span>
          <span className="value">{movie.Genre.Description}</span>
        </div>
        <div className="movie-director-name">
          <span className="label">Director Name: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="movie-director-biography">
          <span className="label">Director Biography: </span>
          <span className="value">{movie.Director.Bio}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}