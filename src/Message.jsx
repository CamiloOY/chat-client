import React from "react";

export default function Message(props) {
	return (
		<li className="py-3 bg-gray-50 px-2 hover:bg-gray-100">
			<div className="font-bold text-sm">{props.sender}</div>
			<div>{props.children}</div>
		</li>
	)
}