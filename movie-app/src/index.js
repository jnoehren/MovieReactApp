import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

fetch('/api/movies')
	.then(response=> {
		return response.json()})
	.then(output=>{

		ReactDOM.render(
		  <div id="wrapper" className="movie-app container">
		  	<App data={output} heading="Movie" />
		  </div>,
		  document.getElementById('root')
		);
	})
