import React, { useState, useEffect } from "react";
import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import PropTypes from 'prop-types';

function UpdateUser({ user, onDeleteUser, props }) {
  const Username = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username Required' });
      isReq = false;
    } else if (username.length < 5) {
      setValues({ ...values, usernameErr: 'Username must be 5 characters long' });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password Required' });
      isReq = false;
    } else if (password.length < 6) {
      setValues({ ...values, passwordErr: 'Password must ne 6 characters long' });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email Address Required' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Email must contain correct symbols' });
      isReq = false;
    }
    return isReq;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios.put(`https://myflixdatabase.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setUser(response.data);
        alert('User Update successful!');
        window.open('/', '_self');
      })
      .catch(response => {
        console.log(response)
        alert('unable to Update');
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