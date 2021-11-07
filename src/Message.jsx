import React from "react";

export default function Message(props) {
	let message = props.children;
	const parts=message.split(/(@[a-zA-Z0-9]+)/g);
	return (
		<li className="py-3 bg-gray-50 px-2 hover:bg-gray-100">
			<div className="font-bold text-sm">{props.sender}</div>
			{
				parts.map(item => {
					if(item[0]==="@") {
						return <span key={item+Date.now()} className="bg-yellow-200 px-1 rounded-md font-medium hover:bg-yellow-300 transition-colors">{item}</span>
					}
					else {
						return item;
					}
				})
			}
		</li>
	)
}