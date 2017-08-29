import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
var movieData = require('./movie_table');

ReactDOM.render(
  <div id="wrapper" className="movie-app container">
  	<App data={movieData} heading="Movie" />
  </div>,
  document.getElementById('root')
);




