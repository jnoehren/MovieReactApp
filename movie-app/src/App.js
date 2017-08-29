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

// Needs List and page passed as props
class DataRow extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		var partial = []
		for(var i = this.props.page; i<this.props.page+14; i++){
			partial.push(this.props.list[i])
		}
		return(
			<tbody>
				{partial.map((element,iterator)=>(
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
	}
	render(){
		let navigation = null

		if(this.props.page>0){
			navigation=(
				<div className="navigation">
					<button className="basic-button nav-button">previous</button>
					<button className="basic-button nav-button">next</button>
				</div>
			)
		}
		else{
			navigation=(
				<div className="navigation">
					<button className="basic-button nav-button">next</button>
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

// Needs heading, list and page as a prop
class DataTable extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="display">
				<table>
					<DataHeader heading={this.props.heading}/>
					<DataRow list={this.props.list} page={this.props.page}/>
				</table>
				<Navigation page={this.props.page}/>
			</div>
		)
	}
}

// Needs search value as prop
class SearchBar extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="search">
				<form>
					<label>
						<input type="search" className="search-bar" value ={this.props.value} ref="textInput"/>
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
	}
	render(){
		let toggle = null
		if(this.props.heading==="Movie"){	
			toggle = (
				<div>
					<button className="basic-button toggle-button" >{this.props.heading}</button>
					<button className="basic-button" >Year</button>
					<button className="basic-button" >Content Rating</button>
					<button className="basic-button" >Director</button>
				</div>)
		}
		else{
			toggle = (
				<div>
					<button className="basic-button toggle-button" >{this.props.heading}</button>
					<button className="basic-button" >Alphabetical</button>
					<button className="basic-button" >Facebook Likes</button>
					<button className="basic-button" >Number of Movies</button>
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

// Needs heading and search value as prop
class SortTable extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="SortTable">
				<BrowseCatagories heading={this.props.heading}/>
				<SearchBar value={this.props.value}/>
			</div>
		)
	}
}

class App extends React.Component{
	constructor(props){
		super(props)
		var collection = []
		for(var element in props.data){
			collection.push(props.data[element].title)
		}
		this.state = {list:collection}
	}
	render(){
		return(
			<div className="movie-app container">
				<img src={logo} className="logo" />
				<SortTable heading="Movie" value=""	/>
				<DataTable heading="Movie" list={this.state.list} page={0}/>
			</div>		
		)
	}

}

export default App

