import React from 'react';
import './movieapp.css';
import logo from'./imdb-logo.jpeg';

// Needs to get heading as prop
class DataHeader extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<thread>
				<tr>
					<div className="heading">{this.props.heading}</div>
				</tr>
			</thread>
		)
	}
}

// Needs List passed as props
class DataRow extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<tbody>
				{this.props.list.map((element,iterator)=>(
					<div className="single-element" key={iterator}> {element} </div>
				))}
			</tbody>
		)
	}
}

// Needs page as props
class Navigation extends React.Component{
	constructor(props){
		super(props);
		this.pressNext = this.pressNext.bind(this)
		this.pressPrevious = this.pressPrevious.bind(this)
	}
	pressNext(e){
		this.props.onNext(e)
	}
	pressPrevious(e){
		this.props.onPrevious(e)
	}
	render(){
		let navigation = null

		if(this.props.page>0){
			navigation=(
				<div className="navigation">
					<button className="basic-button nav-button" onClick={this.pressPrevious}>previous</button>
					<button className="basic-button nav-button" onClick={this.pressNext}>next</button>
				</div>
			)
		}
		else{
			navigation=(
				<div className="navigation">
					<button className="basic-button nav-button" onClick={this.pressNext}>next</button>
				</div>
			)
		}
		return(
			<div className="navigation">
				{navigation}
			</div>
		)
	}
}

// Needs heading, list, and  value as a prop
class DataTable extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			page: 0
		}
	}

	next(){
		this.setState({
			page: this.state.page + 15
		})
	}
	previous(){
		this.setState({
			page: this.state.page - 15
		})
	}

	render(){
		let filterList = this.props.list.filter(
			(element)=>{
				return String(element.title).indexOf(this.props.value) !== -1;
			}
		)

		var partial = []
		if(filterList.length == 0){
			partial.push("No Results")
		}
		else if(filterList.length < 14){
			for(var i = this.state.page; i<filterList.length; i++){
				partial.push(filterList[i].title)			
			}
		}
		else{
			for(var i = this.state.page; i<this.state.page+14; i++){
				partial.push(filterList[i].title)
			}			
		}

		return(
			<div className="display">
				<table>
					<DataHeader heading={this.props.heading}/>
					<DataRow list={partial} />
				</table>
				<Navigation page={this.state.page} onNext={this.next.bind(this)} onPrevious={this.previous.bind(this)}/>
			</div>
		)
	}
}

// Needs search value as prop
class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e){
		this.props.onInput(e.target.value)
	}

	render(){
		return(
			<div className="search">
				<form>
					<label>
						<input type="search" className="search-bar" value = {this.props.value} onChange={this.handleInput} />
					</label>
				</form>
			</div>
		)
	}
}

// Needs heading from props 
class BrowseCatagories extends React.Component{
	constructor(props){
		super(props);
		this.browse = this.browse.bind(this)
	}

	browse(e){
		this.props.browseInput(e.target.value)
	}

	render(){
		let toggle = null
		if(this.props.heading==="Movie"){	
			toggle = (
				<div>
					<button className="basic-button toggle-button" >{this.props.heading}</button>
					<button className="basic-button" onClick={this.browse} value="year">Year</button>
					<button className="basic-button" onClick={this.browse} value="rating">Content Rating</button>
					<button className="basic-button" onClick={this.browse} value="director">Director</button>
				</div>)
		}
		else{
			toggle = (
				<div>
					<button className="basic-button toggle-button" >{this.props.heading}</button>
					<button className="basic-button" onClick={this.browse} value="alpha">Alphabetical</button>
					<button className="basic-button" onClick={this.browse} value="likes">Facebook Likes</button>
					<button className="basic-button" onClick={this.browse} value="number">Number of Movies</button>
				</div>
			)
		}
		return(
			<div className="browse-toggle">
				{toggle}
			</div>			
		)
	}
}

class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			value: "",
			data: this.props.data
		}
	}

	search(value){
		this.setState({
			value: value
		});
	}

	sortByKey(array, key, type) {
		if(type=="increasing"){
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
				browseList = this.sortByKey(this.state.data, 'likes','increasing')
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

	render(){
		return(
			<div className="movie-app container">
				<img src={logo} className="logo" />
				<BrowseCatagories 
					heading={this.props.heading}
					browseInput={this.browse.bind(this)}
				/>
				<SearchBar 
					value={this.state.value} 
					onInput={this.search.bind(this)}
				/>
				<DataTable 
					heading={this.props.heading} 
					list={this.state.data} 
					value={this.state.value}
				/>
			</div>		
		)
	}

}

export default App

