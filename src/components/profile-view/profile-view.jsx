import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import { Button, Card, Container, Row, Col } from "react-bootstrap";

import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";

import "./profile-view.scss";

export function ProfileView({
  movies,
  movie,
  onUpdatedUser,
  // onBackClick,
  // onDeleteUser,
}) {
  const [user, setUser] = useState();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const Username = localStorage.getItem("user");
  const token = localStorage.getItem("token");



  const getUser = () => {
    axios
      .get(`https://myflixdatabase.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setFavoriteMovies(
          movies.filter((movie) =>
            response.data.FavoriteMovies.includes(movie._id)
          )
        );
      })
      .catch((error) => console.error(error));
  }

  const removeFavorite = (movies) => {
    axios
      .delete(
        `https://myflixdatabase.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setUser(response.data);
        setFavoriteMovies(
          movies.filter((movie) =>
            response.data.FavoriteMovies.includes(movie._id)
          )
        );
      })
      .catch((error) => console.error(error));
  };

  const onDeleteUser = () => {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(`https://myflixdatabase.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        console.log(response);
        alert("Profile has been deleted!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }





  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      {user && (
        <>
          <Row>
            <Col md={12} lg={4}>
              <Card className="mb-3">
                <Card.Body>
                  <UserInfo name={user.Username} email={user.Email} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} lg={8}>
              <Card className="mb-3">
                <Card.Body>
                  <UpdateUser user={user} handleSubmit={onUpdatedUser} onDeleteUser={onDeleteUser} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <FavoriteMovies
            favoriteMovieList={favoriteMovies}
            onRemoveFavorite={(movie) => removeFavorite(movie._id)}
          />
          <Link to='/'>
            <Button varient='link'>Back</Button>
          </Link>
        </>
      )}
    </Container>
  );
}