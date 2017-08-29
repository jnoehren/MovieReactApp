import React from 'react';
import './movieapp.css';

class Navigation extends React.Component{
	constructor(props){
		super(props);
		this.state={
			page: this.props.page
		}
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
		let navigation = null
		const {page} = this.state

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

		return(
			{navigation}
		)
	}
}
export default Navigation