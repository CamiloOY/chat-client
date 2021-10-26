import React from "react";
import Message from "./Message";

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
				<div className="flex justify-center items-center h-screen">
					<div>
						<ol id="messages">
							{
								this.state.messages.map(msg => <Message key={msg}>{msg}</Message>)
							}
						</ol>
						<form onSubmit={this.sendMessage}>
							<input type="text" name="message" id="message" value={this.state.currentMessage} onChange={this.handleChange} className="border px-3 py-2 focus:outline-none w-96" />
							<input type="submit" value="Send" className="px-3 py-2 w-24 hover:bg-gray-200 transition-colors" />
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
