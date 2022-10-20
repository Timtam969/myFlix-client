import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import "./profile-view.scss";

function FavoriteMovies({ favoriteMovieList, onRemoveFavorite }) {

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col>
            <h2>Favorite Movies</h2>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList.map((movie) => {
            return (
              <Col sm={12} md={12} lg={6} key={`fav-${movie._id}`} >
                <Figure>
                  <img src={movie.Image} alt={movie.Title} />
                </Figure>
                <Link to={`/movies/${movie._id}`}>
                  <h3>{movie.Title}</h3>
                </Link>
                <Button variant="danger" className='remove' onClick={() => onRemoveFavorite(movie._id)}>Remove</Button>
              </Col>
            )
          })}
        </Row>
      </Card.Body>
    </Card>
  )
}

export default FavoriteMovies;