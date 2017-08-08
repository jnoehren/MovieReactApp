import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Clock extends React.Component{
	constructor(props){
		super(props);
		this.state = {date: new Date()};
	}
	componentDidMount(){
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}
	componentWillMount(){
		clearInterval(this.timerID)
	}
	tick(){
		this.setState({
			date: new Date()
		});
	}
	render() {
		return(
			<div>
				<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
			</div>
		);
	}
}

function Welcome(props){
	return <h1>Welcome {props.name}</h1>
};

function App() {
	return (
    	<div>
    		<Welcome name="Professor" />
      		<Clock />
      		<Clock />
      		<Clock />
    	</div>
  	);
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);



