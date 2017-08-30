import React from 'react'
import './movieapp.css'

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

export default SearchBar