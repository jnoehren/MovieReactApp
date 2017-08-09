import React from 'react';
import './movieapp.css'
import logo from'./imdb-logo.jpeg'

class SearchBar extends React.Component{
	state={
		value: ''
	}
	render(){
		const {value} = this.state
		return(
			<form>
				<label>
					<input type="text" value={value}/>
				</label>
				<input className="search-button" type="submit" value="Search"/>
			</form>
		)
	}
}
class Toggle extends React.Component{
	state={
		browseName: "Movie"
	}
	toggleBrowse(){
		const {browseName} = this.state
		if(browseName==="Movie"){
			this.setState({
				browseName: "Actor"
			})
		}
		else{
			this.setState({
				browseName: "Movie"
			})
		}
	}
	render(){
		const {browseName} = this.state
		if(browseName==="Movie"){
			return(
				<div>
					<button className="basic-button toggle-button" onClick={()=> this.toggleBrowse()}>{browseName}</button>
					<button className="basic-button">Year</button>
					<button className="basic-button">Content Rating</button>
					<button className="basic-button">Director</button>
				</div>
			)			
		}
		return(
			<div>
				<button className="basic-button toggle-button" onClick={()=> this.toggleBrowse()}>{browseName}</button>
				<button className="basic-button">Alphabetical</button>
				<button className="basic-button">Facebook Likes</button>
				<button className="basic-button">Number of Movies</button>
			</div>
		)
	}
}

class MovieApp extends React.Component{
	state={
		browseName: "Movie"
	}
	render(){
		const {browseName} = this.state
		return(
			<div className="movie-app">
				<img src={logo} className="logo" />
				<div className="browse-toggle">
					<Toggle />
				</div>
				<div className="search">
					<SearchBar className="search-display"/>
				</div>
					{/*<DisplayResults className="display"></DisplayResults>--!>*/}
			</div>
		);
	}
}

export default MovieApp