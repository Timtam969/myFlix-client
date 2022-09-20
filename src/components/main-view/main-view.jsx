import React from 'react';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: 'Inception',
          Description: 'desc1',
          ImagePath: '....'
        },
        {
          _id: 2,
          Title: 'The Shawshank Reception',
          Description: 'desc2',
          ImagePath: '....'
        },
        {
          _id: 3,
          Title: 'The Gladiator',
          Description: 'desc3',
          ImagePath: '....'
        },
      ]
    }
  }

  render() {
    const { movies } = this.state;

    if (movies.length === 0)
      return <div className='main-view'>The list is Empty</div>;

    return (
      <div className='main-view'>
        {movies.map(movie => <MovieCard key={movie._id} movie={movie} />)}
      </div>
    );
  }
}

export default MainView;