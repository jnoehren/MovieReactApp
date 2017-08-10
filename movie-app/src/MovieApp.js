import React from 'react';
import './movieapp.css'
import logo from'./imdb-logo.jpeg'

class MovieApp extends React.Component{
	state={
		browseName: "Movie",
		value: '',
		page: 0,
	}
	toggleBrowse(){
		const {browseName} = this.state
		const {page} = this.state
		if(browseName==="Movie"){
			this.setState({
				browseName: "Actor",
				page: 0
			})
		}
		else{
			this.setState({
				browseName: "Movie",
				page: 0
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
	next(){
		const {page} = this.state
		this.setState({
			page: page+10
		})
	}
	previous(){
		const{page} =this.state
		this.setState({
			page: page-10
		})
	}
	render(){
		const {browseName} = this.state
		const {value} = this.state
		const {page} = this.state
		let toggle = null
		let table = null
		let heading = null
		let list = []
		let navigation = null

		if(page>0){
			navigation=(
				<div className="navigation">
					<button className="basic-button nav-button" onClick={()=> this.previous()}>previous</button>
					<button className="basic-button nav-button" onClick={()=> this.next()}>next</button>
				</div>
			)
		}
		else{
			navigation=(
				<div className="navigation">
					<button className="basic-button nav-button" onClick={()=> this.next()}>next</button>
				</div>
			)
		}

		if(browseName==="Movie"){
			for(let i = page; i<page+9;i++){
				list.push(this.props.data[i].movie_title.toString())
			}	
			heading = "Movie Title"
			toggle = (
				<div>
					<button className="basic-button toggle-button" onClick={()=> this.toggleBrowse()}>{browseName}</button>
					<button className="basic-button" onClick={()=> this.browse("year")}>Year</button>
					<button className="basic-button" onClick={()=> this.browse("rating")}>Content Rating</button>
					<button className="basic-button" onClick={()=> this.browse("director")}>Director</button>
				</div>)
		}
		else{
			for(let i = page; i<page+9;i++){
				list.push(this.props.data[i].actor_1_name.toString())
			}
			heading = "Actor Name"
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
			<div className="movie-app container">
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
				<div className="display">
					<table>
						<thread>
							<tr>
								<div className="heading">{heading}</div>
							</tr>
						</thread>
						<tbody>{list.map((element,iterator)=>(
							<div className="single-element" key={iterator}> {element} </div>
							))}</tbody>
					</table>
					{navigation}
				</div>
			</div>
		);
	}
}

export default MovieApp