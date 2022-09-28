import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './movie-card.scss';
import Card from 'react-bootstrap/card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <div className='movie-card justify-content-md-center'>
        <img className='movie-img' varient="top" src={movie.Image} />
        <Card.Body>
          <Card.Text>Movie Title:</Card.Text>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>Movie Description:</Card.Text>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} varient="link">Open</Button>
        </Card.Body>
      </div>
    );
  }
}

MovieCard.porpTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};