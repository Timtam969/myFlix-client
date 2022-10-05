import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';


import './director-view.scss';



export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      < div className="director-view">
        <Card.Body>
          <div className='dir-name-lable'>Name:</div>
          <div className='dir-name-value'>{director.Name}</div>
          <br />
          <div className='dir-bio-lable'>Biography:</div>
          <div className='dir-bio-value'>{director.Bio}</div>
          <br />
          <div className='dir-bir-lable'>Birth Date:</div>
          <div className='dir-bir-value'>{director.Birth}</div>
          <br />
          <button className='button' onClick={() => { onBackClick(); }}>Back</button>
        </Card.Body>
      </div >
    );
  }
}

DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  }).isRequired,
};