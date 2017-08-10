import React from 'react';
import ReactDOM from 'react-dom';
import MovieApp from './MovieApp'
var DATA = require('./movie_data.json');

ReactDOM.render(
  <div id="wrapper">
  	<MovieApp data={DATA}/>
  </div>,
  document.getElementById('root')
);



