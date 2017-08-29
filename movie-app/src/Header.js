import React from 'react';
import './movieapp.css';
import logo from'./imdb-logo.jpeg';

class Header extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<img src={logo} className="logo" />
		)
	}
}
export default Header