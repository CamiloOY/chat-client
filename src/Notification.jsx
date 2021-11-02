import React from "react";

export default function Notification(props) {
	return (
		<li className="py-3 bg-gray-50 px-2 hover:bg-gray-100">
			<div className="font-bold text-sm text-blue-700">Server</div>
			<div>{props.children}</div>
		</li>
	)
}