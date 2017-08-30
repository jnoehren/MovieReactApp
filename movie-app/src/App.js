import React from 'react'
import './movieapp.css'
import logo from'./imdb-logo.jpeg'

import DataTable from './DataTable'
import SearchBar from './SearchBar'
import BrowseCatagories from './BrowseCatagories'

class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			value: "",
			data: this.props.data,
			heading: this.props.heading
		}
	}
	search(value){
		this.setState({
			value: value
		});
	}
	sortByKey(array, key, type) {
		if(type==="increasing"){
		    return array.sort(function(a, b) {
		        var x = a[key]; var y = b[key];
		        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});	
		}
		else{
		    return array.sort(function(a, b) {
		        var x = a[key]; var y = b[key];
		        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
		    });			
		}
	}
	browse(category){
		let browseList = null
		switch (category){
			case "year":
				browseList = this.sortByKey(this.state.data,'year','decreasing')
				break
			case "rating":
				browseList = this.sortByKey(this.state.data,'content_rating','decreasing')
				break
			case "director":
				browseList = this.sortByKey(this.state.data, 'director', 'increasing')
				break
			case "alpha":
				browseList = this.sortByKey(this.state.data, 'actor','increasing')
				break
			case "likes":
				browseList = this.sortByKey(this.state.data, 'likes','decreasing')
				break
			case "number":
				browseList = this.sortByKey(this.state.data, 'movies','increasing')
				break
			default:
				browseList = this.state.data
				break
		}
		this.setState({
			data: browseList
		})
	}

	toggle(choice){
		if(choice==="Movie"){
			this.getActorInfo();
		}
		else{
			this.getMovieInfo();
		}
	}
	getMovieInfo(){
		fetch('/api/movies')
			.then(response=> {
				return response.json()})
			.then(output=>{
				this.setState({
					data:output,
					heading: "Movie"
				})
			})
	}
	getActorInfo(){
		fetch('/api/actors')
			.then(response=> {
				return response.json()})
			.then(output=>{
				this.setState({
					data:output,
					heading: "Actor"
				})
			})		
	}


	render(){
		return(
			<div className="movie-app container">
				<img src={logo} className="logo" />
				<BrowseCatagories 
					heading={this.state.heading}
					browseInput={this.browse.bind(this)}
					toggleChange={this.toggle.bind(this)}
				/>
				<SearchBar 
					value={this.state.value} 
					onInput={this.search.bind(this)}
				/>
				<DataTable 
					heading={this.state.heading} 
					list={this.state.data} 
					value={this.state.value}
				/>
			</div>		
		)
	}

}

export default App

