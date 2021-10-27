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
			username: null,
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
		if(this.state.currentMessage.startsWith("/nick ")) {
			this.state.socket.send("NICK " + this.state.currentMessage.substring(6));
		}
		else {
			this.state.socket.send(this.state.currentMessage);
		}
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
				<div className="flex justify-center items-center h-screen">
					{this.state.usernameSet ? (
						<div>
							<ol id="messages">
								{
									this.state.messages.map(msg => {
										if(msg.username==="Server") {
											return <Notification>{msg.text}</Notification>
										}
										else {
											return <Message sender={msg.username} key={msg}>{msg.text}</Message>;
										}
									})
								}
							</ol>
							<form onSubmit={this.sendMessage}>
								<input type="text" name="message" id="message" value={this.state.currentMessage} onChange={this.handleChange} className="border px-3 py-2 focus:outline-none w-96" />
								<input type="submit" value="Send" className="px-3 py-2 w-24 hover:bg-gray-200 transition-colors" />
							</form>
						</div>
					) : (
						<div className="">
							<input type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleUsername} id="username" className="border px-3 py-2 focus:outline-none w-96 focus:border-blue-400" />
							<button type="submit" onClick={this.acceptUsername} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors">Start chatting</button>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default App;
