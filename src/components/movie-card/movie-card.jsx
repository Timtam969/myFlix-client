import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from "axios";
import './movie-card.scss';
import Card from 'react-bootstrap/card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export class MovieCard extends React.Component {

  addMovieToFavorites(e) {
    const { movie } = this.props;
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    e.preventDefault();
    axios
      .post(
        `https://myflixdatabase.herokuapp.com/users/${username}/movies/${movie._id}`,
        { username: localStorage.getItem("user") },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("movie added");
      })
      .catch((error) => console.error(error));
  }


  render() {
    const { movie } = this.props;



    return (
      <div className='movie-card justify-content-md-center'>
        <img className='movie-img' varient="top" src={movie.Image} />
        <Card.Body>
          <div className='movie-title-lable'>Movie Title:</div>
          <div className='movie-title-value'>{movie.Title}</div>
          <br />
          <Link to={`/movies/${movie._id}`}>
            <Button className='open' varient='link'>Open</Button>
          </Link>
          <br />
          <Button className='favMovButt' onClick={(e) => this.addMovieToFavorites(e)}>Add to Favorite Movies</Button>

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
};