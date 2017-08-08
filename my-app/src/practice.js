import React from 'react';

function App() {
	return (
    	<div>
    		<Welcome name="Professor" />
    		<LoginControl />
    		<BasicButton />
    		<Toggle />
      		<Clock />
      		<Clock />
      		<Clock />
    	</div>
  	);
}
function Welcome(props){return <h1>Welcome {props.name}</h1>};
function UserGreeting(props){
	return <h1>Welcome Back!</h1>
}
function GuestGreeting(props){
	return <h1>You're not invited, please leave</h1>
}
function LoginButton(props){
	return(
		<button onClick={props.onClick}>
			Login
		</button>
	);
}
function LogoutButton(props){
	return(
		<button onClick = {props.onClick}>
			Logout
		</button>
	);
}
function Greeting(props){
	const isLoggedIn = props.isLoggedIn;
	if(isLoggedIn){
		return <UserGreeting />
	}
	return <GuestGreeting />
}
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
class Toggle extends React.Component{
	constructor(props){
		super(props);
		this.state = {isToggleOn: true};
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(){
		this.setState(prevState=>({
			isToggleOn: !prevState.isToggleOn
		}));
	}
	render(){
		return(
			<button onClick={this.handleClick}>
				{this.state.isToggleOn ? 'ON' : 'OFF'}
			</button>
		);
	}
}
class BasicButton extends React.Component{
	handleClick(){
		console.log('this is:',this)
	}
	render(){
		return(
			<button onClick={(e)=>this.handleClick(e)}>
				Basic Button
			</button>
		);
	}
}
class LoginControl extends React.Component{
	constructor(props){
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.state = {isLoggedIn: false};
	}
	handleLoginClick(){
		this.setState({isLoggedIn: true});
	}
	handleLogoutClick(){
		this.setState({isLoggedIn: false});
	}
	render(){
		const isLoggedIn = this.state.isLoggedIn;
		let button = null;
		if(isLoggedIn){
			button = <LogoutButton onClick={this.handleLogoutClick} />;
		}
		else{
			button = <LoginButton onClick={this.handleLoginClick} />;
		}
		return(
			<div>
				<Greeting isLoggedIn={isLoggedIn} />
				{button}
			</div>
		);

	}
}