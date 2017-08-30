import React from 'react'
import './movieapp.css'


// Needs heading from props 
class BrowseCatagories extends React.Component{
	constructor(props){
		super(props);
		this.browse = this.browse.bind(this)
		this.toggle = this.toggle.bind(this)
	}

	browse(e){
		this.props.browseInput(e.target.value)
	}
	toggle(e){
		this.props.toggleChange(this.props.heading)
	}

	render(){
		let toggle = null
		if(this.props.heading==="Movie"){	
			toggle = (
				<div>
					<button className="basic-button toggle-button" onClick={this.toggle}>{this.props.heading}</button>
					<button className="basic-button" onClick={this.browse} value="year">Year</button>
					<button className="basic-button" onClick={this.browse} value="rating">Content Rating</button>
					<button className="basic-button" onClick={this.browse} value="director">Director</button>
				</div>)
		}
		else{
			toggle = (
				<div>
					<button className="basic-button toggle-button" onClick={this.toggle}>{this.props.heading}</button>
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

export default BrowseCatagories