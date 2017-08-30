import React from 'react';
import './movieapp.css';

// Needs to get heading as prop
class DataHeader extends React.Component{
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
		if(this.props.heading==="Movie"){
			let filterList = this.props.list.filter(
				(element)=>{
					return String(element.title).indexOf(this.props.value) !== -1;
				}
			)

			var partial = []
			if(filterList.length === 0){
				partial.push("No Results")
			}
			else if(filterList.length < 14){
				for(var i = this.state.page; i<filterList.length; i++){
					partial.push(filterList[i].title)			
				}
			}
			else{
				for(var j = this.state.page; j<this.state.page+14; j++){
					partial.push(filterList[j].title)
				}			
			}
		}
		else{
			let filterList = this.props.list.filter(
				(element)=>{
					return String(element.actor).indexOf(this.props.value) !== -1;
				}
			)

			var partial = []
			if(filterList.length === 0){
				partial.push("No Results")
			}
			else if(filterList.length < 14){
				for(var n = this.state.page; n<filterList.length; n++){
					partial.push(filterList[n].actor)			
				}
			}
			else{
				for(var m = this.state.page; m<this.state.page+14; m++){
					partial.push(filterList[m].actor)
				}			
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
};

export default DataTable