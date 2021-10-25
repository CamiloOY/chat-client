import React from "react";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			socket: new WebSocket("ws://127.0.0.1:2020"),
			messages: [],
			currentMessage: ""
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.state.socket.addEventListener("message", e => {
			let messages = this.state.messages;
			messages.push(e.data);
			this.setState({messages, currentMessage: ""});
		});
	}

	sendMessage(e) {
		e.preventDefault();
		this.state.socket.send(this.state.currentMessage);
	}

	handleChange(e) {
		this.setState({currentMessage: e.target.value});
	}

	render(props) {
		return (
			<div className="App">
				<ul id="messages">
					{
						this.state.messages.map(msg => <li key={msg}>{msg}</li>)
					}
				</ul>
				<form onSubmit={this.sendMessage}>
					<input type="text" name="message" id="message" value={this.state.currentMessage} onChange={this.handleChange} />
					<input type="submit" value="Send" />
				</form>
			</div>
		);
	}
}

export default App;
