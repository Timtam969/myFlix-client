import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import "./profile-view.scss";

function FavoriteMovies({ favoriteMovieList }) {

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
              <div key={movie._id}>
                <Figure>
                  <img src={movie.Image} />
                  <Link to={`/movies/${movie._id}`}>
                  </Link>

                </Figure>
                <h2>{movie.Title}</h2>
                <Button variant="danger" onClick={() => removeFavorite(movie._id)}>Remove</Button>
              </div>
            )
          })}
        </Row>
      </Card.Body>
    </Card>
  )
}

export default FavoriteMovies;