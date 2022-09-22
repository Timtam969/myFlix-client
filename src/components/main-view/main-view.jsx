import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: 'Lord of the Rings',
          Description: 'An ancient Ring thought lost for centuries has been found, and through a strange twist of fate has been given to a small Hobbit named Frodo. When Gandalf discovers the Ring is in fact the One Ring of the Dark Lord Sauron, Frodo must make an epic quest to the Cracks of Doom in order to destroy it. However, he does not go alone. He is joined by Gandalf, Legolas the elf, Gimli the Dwarf, Aragorn, Boromir, and his three Hobbit friends Merry, Pippin, and Samwise. Through mountains, snow, darkness, forests, rivers and plains, facing evil and danger at every corner the Fellowship of the Ring must go. Their quest to destroy the One Ring is the only hope for the end of the Dark Lords reign.',
          Genre: 'High Fantacy',
          Director: 'Peter Jackson',
          ImagePath: 'https://www.themoviedb.org/t/p/w440_and_h660_face/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg'
        },
        {
          _id: 2,
          Title: 'Blade',
          Description: 'The Daywalker known as \'Blade\' - a half-vampire, half-mortal man - becomes the protector of humanity against an underground army of vampires.',
          Genre: 'Action',
          Director: 'Stephen Norrington',
          ImagePath: 'https://www.themoviedb.org/t/p/original/apA0Zj09ETKxXXCLH2VEsaCH0LV.jpg'
        },
        {
          _id: 3,
          Title: '12 Monkeys',
          Description: 'In the year 2035, convict James Cole reluctantly volunteers to be sent back in time to discover the origin of a deadly virus that wiped out nearly all of the earth\'s population and forced the survivors into underground communities. But when Cole is mistakenly sent to 1990 instead of 1996, he\'s arrested and locked up in a mental hospital. There he meets psychiatrist Dr. Kathryn Railly, and patient Jeffrey Goines, the son of a famous virus expert, who may hold the key to the mysterious rogue group, the Army of the 12 Monkeys, thought to be responsible for unleashing the killer disease.',
          Genre: 'Science Fiction',
          Director: 'Terry Gilliam',
          ImagePath: 'https://www.themoviedb.org/t/p/original/fCZnJSARoTbLefr9ThwWBSkJ7oR.jpg'
        },
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className='main-view'>The list is Empty!</div>;

    return (
      <div className='main-view'>
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}
export default MainView;