import React from 'react';
import './movieapp.css';
import logo from'./imdb-logo.jpeg';


class MovieApp extends React.Component{
	constructor(props){
		super(props)
		this.state = {
		browseName: "Movie",
		value: '',
		page: 0,
		outputData: [],
		searchData: []
		}
	}
	componentWillMount(){
		this.getMovieInfo("year")
	}
	getMovieInfo(catagory){
		var list = []
		var url = '/api/moviesSort/' + catagory
		fetch(url)
			.then(response=> {
				return response.json()})
			.then(output=>{
				for (var title in output){
					list.push(output[title].title)
				}
				this.setState({
					outputData:list
				})
			})
	}
	getActorInfo(catagory){
		var list = []
		var url = '/api/actorsSort/' + catagory
		fetch(url)
			.then(response=> {
				return response.json()})
			.then(output=>{
				for (var title in output){
					list.push(output[title].actor)
				}
				this.setState({
					outputData:list
				})
			})		
	}
	toggleBrowse(){
		const {browseName} = this.state
		const {page} = this.state
		if(browseName==="Movie"){
			this.getActorInfo("name")
			this.setState({
				browseName: "Actor",
				page: 0
			})
		}
		else{
			this.getMovieInfo("year")
			this.setState({
				browseName: "Movie",
				page: 0
			})
		}
	}	
	browse(term){
		switch(term){
			case "year":
				this.getMovieInfo("year")
				break
			case "rating":
				this.getMovieInfo("content_rating")
				break
			case "director":
				this.getMovieInfo("director")
				break
			case "alphabetical":
				this.getActorInfo("name")
				break
			case "likes":
				this.getActorInfo("likes")
				break
			case "number":
				this.getActorInfo("movies")
				break
		}
	}
	search(){
		const searchTerm = this.refs.textInput.value
		this.setState({
			value: searchTerm
		})
	}
	next(){
		const {page} = this.state
		this.setState({page: page+10})
	}
	previous(){
		const{page} =this.state
		this.setState({page: page-10})
	}
	render(){
		const {browseName} = this.state
		const {value} = this.state
		const {page} = this.state
		const {outputData} = this.state
		let toggle = null
		let table = null
		let heading = null
		let list = []
		let navigation = null

		let displayData = outputData.filter(
			(name)=>{
				return name.indexOf(value) !== -1;
			}
		)

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
				list.push(displayData[i])
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
				list.push(displayData[i])
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