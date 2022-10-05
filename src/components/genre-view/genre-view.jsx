import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';


import './genre-view.scss';



export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      < div className="genre-view">
        <Card.Body>
          <div className='genre-title-lable'>Genre:</div>
          <div className='genre-title-value'>{genre.Name}</div>
          <br />
          <div className='genre-desc-lable'>Genre Description:</div>
          <div className='genre-desc-value'>{genre.Description}</div>
          <br />
          <button className='button' onClick={() => { onBackClick(); }}>Back</button>
        </Card.Body>
      </div >
    );
  }
}

GenreView.proptypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};