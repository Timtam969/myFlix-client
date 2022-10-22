import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

import './registration-view.scss';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    const isReq = validate();
    if (isReq) {
      axios.post('https://myflixdatabase.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          // console.log(data);
          alert('Registration successful, please Login!');
          window.open('/', '_self');
        })
        .catch(response => {
          // console.log(response)
          alert('unable to register');
        });
    }
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder='Enter Username' value={username} onChange={e => setUsername(e.target.value)} />
        {values.usernameErr && <p>{values.usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder='Enter Password' value={password} onChange={e => setPassword(e.target.value)} />
        {values.passwordErr && <p>{values.passwordErr}</p>}
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" placeholder='Enter Email' value={email} onChange={e => setEmail(e.target.value)} />
        {values.emailErr && <p>{values.emailErr}</p>}
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthdate:</Form.Label>
        <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button varient="primary" type="submit" onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}

RegistrationView.proptypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  })
}