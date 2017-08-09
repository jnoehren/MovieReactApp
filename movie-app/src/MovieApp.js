import React from 'react';
import './movieapp.css'
import logo from'./imdb-logo.jpeg'

class MovieApp extends React.Component{
	state={
		browseName: "Movie",
		value: ''
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
	browse(term){
		console.log(term)
	}
	search(){
		const searchTerm = this.refs.textInput.value
		this.setState({
			value: searchTerm + ' '
		})
	}
	render(){
		const {browseName} = this.state
		const {value} = this.state
		let toggle = null
		if(browseName==="Movie"){
			toggle = (
				<div>
					<button className="basic-button toggle-button" onClick={()=> this.toggleBrowse()}>{browseName}</button>
					<button className="basic-button" onClick={()=> this.browse("year")}>Year</button>
					<button className="basic-button" onClick={()=> this.browse("rating")}>Content Rating</button>
					<button className="basic-button" onClick={()=> this.browse("director")}>Director</button>
				</div>)
		}
		else{
			toggle = (
				<div>
					<button className="basic-button toggle-button" onClick={()=> this.toggleBrowse()}>{browseName}</button>
					<button className="basic-button" onClick={()=> this.browse("alphabetical")}>Alphabetical</button>
					<button className="basic-button" onClick={()=> this.browse("likes")}>Facebook Likes</button>
					<button className="basic-button" onClick={()=> this.browse("number")}>Number of Movies</button>
				</div>
			)
		}
		return(
			<div className="movie-app">
				<img src={logo} className="logo" />
				<div className="browse-toggle">
					{toggle}
				</div>
				<div className="search">
					<form>
						<label>
							<input type="search" className="search-bar" value ={value} ref="textInput" onChange={()=> this.search()}/>
						</label>
					</form>
				</div>
					{/*<DisplayResults className="display"></DisplayResults>--!>*/}
			</div>
		);
	}
}

export default MovieApp