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
			for(var i = this.state.page; i<filterList.length-1; i++){
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

class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			value: ""
		}
	}

	search(value){
		this.setState({
			value: value
		});
	}

	render(){
		return(
			<div className="movie-app container">
				<img src={logo} className="logo" />
				<BrowseCatagories 
					heading={this.props.heading}
				/>
				<SearchBar 
					value={this.state.value} 
					onInput={this.search.bind(this)}
				/>
				<DataTable 
					heading={this.props.heading} 
					list={this.props.data} 
					value={this.state.value}
				/>
			</div>		
		)
	}

}

export default App

