import React from "react";
import Message from "./Message";
import Notification from "./Notification";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			socket: new WebSocket("ws://127.0.0.1:2020"),
			messages: [],
			currentMessage: "",
			username: "",
			usernameSet: false
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleUsername = this.handleUsername.bind(this);
		this.acceptUsername = this.acceptUsername.bind(this);
	}

	componentDidMount() {
		this.state.socket.addEventListener("message", e => {
			if(e.data.startsWith("SERVER ")) {
				let messages = this.state.messages;
				messages.push({username: "Server", text: e.data.substring(7)});
				this.setState({messages});
			}
			else {
				let messages = this.state.messages;
				messages.push({username: e.data.split(":")[0], text: e.data.substring(e.data.indexOf(":") + 1)});
				this.setState({messages});
			}
		});
	}

	sendMessage(e) {
		e.preventDefault();
		this.state.socket.send(this.state.currentMessage);
		this.setState({currentMessage: ""});
	}

	handleChange(e) {
		this.setState({currentMessage: e.target.value});
	}

	handleUsername(e) {
		this.setState({username: e.target.value});
	}

	acceptUsername() {
		if(this.state.username !== "") {
			this.setState({usernameSet: true});
			this.state.socket.send(`JOIN ${this.state.username}`);
		}
	}

	render(props) {
		return (
			<div className="App">
					{this.state.usernameSet ? (
						<div className="h-screen flex flex-col justify-between">
							<div className="max-h-full overflow-auto">
								<ol id="messages">
									{
										this.state.messages.map(msg => {
											if(msg.username==="Server") {
												return <Notification key={msg.text+Date.now()}>{msg.text}</Notification>
											}
											else {
												return <Message sender={msg.username} key={msg.text+Date.now()} me={this.state.username}>{msg.text}</Message>;
											}
										})
									}
								</ol>
							</div>
								<form onSubmit={this.sendMessage} className="flex justify-center w-full px-2 my-2">
									<input type="text" name="message" id="message" value={this.state.currentMessage} onChange={this.handleChange} className="border px-3 py-2 mr-2 rounded-lg w-full focus:outline-none focus:border-blue-400" />
									<input type="submit" value="Send" className="px-6 py-1 w-24 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer" />
								</form>
						</div>
					) : (
						<div className="flex justify-center items-center h-screen">
							<div className="flex justify-center">
								<input type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleUsername} id="username" className="border px-3 py-2 mr-2 rounded-lg focus:outline-none w-96 focus:border-blue-400" />
								<button type="submit" onClick={this.acceptUsername} className="px-6 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Join</button>
							</div>
						</div>
					)}
			</div>
		);
	}
}

export default App;
