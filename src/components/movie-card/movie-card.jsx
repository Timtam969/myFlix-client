import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './movie-card.scss';
import Card from 'react-bootstrap/card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div className='movie-card justify-content-md-center'>
        <img className='movie-img' varient="top" src={movie.Image} />
        <Card.Body>
          <div className='movie-title-lable'>Movie Title:</div>
          <div className='movie-title-value'>{movie.Title}</div>
          <br />
          <div className='movie-desc-lable'>Movie Description:</div>
          <div className='movie-desc-value'>{movie.Description}</div>
          <br />
          <Link to={`/movies/${movie._id}`}>
            <Button varient='link'>Open</Button>
          </Link>
        </Card.Body>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    })
  }).isRequired,
  // onMovieClick: PropTypes.func.isRequired
};