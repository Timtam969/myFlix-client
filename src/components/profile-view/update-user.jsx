import React, { useState, useEffect } from "react";
import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import PropTypes from 'prop-types';

function UpdateUser({ user, onDeleteUser }) {
  const Username = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);



  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://myflixdatabase.herokuapp.com/users/${Username}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data;
        // console.log(data);
        // console.log(Username);
        alert("Profile was successfully updated");
        localStorage.setItem("user", username);
        // localStorage.clear();
        window.open('/users/:Username', "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  return (
    <>
      <h2>Need to Update your Profile?</h2>
      <Form>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"

            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

            minLength="8"
            placeholder="Your password must have 8 or more characters"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

            placeholder="Enter your email address"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setBirthday(e.target.value)}

          />
        </Form.Group>
        <Button varient="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        <Button className="delete-button" variant="danger" onClick={onDeleteUser}>Delete User</Button>
      </Form>
    </>
  );
}

export default UpdateUser;