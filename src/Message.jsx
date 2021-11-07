import React from "react";

export default function Message(props) {
	let message = props.children;
	const parts=message.split(/(@[a-zA-Z0-9]+)/g);
	let me_tagged = message.match(new RegExp(`@${props.me}($|\\s)`));
	return (
		<li className={"py-3 px-2 " + (me_tagged ? " bg-blue-50 border-l-2 border-blue-500 hover:bg-blue-100" : "bg-gray-50 hover:bg-gray-100")}>
			<div className="font-bold text-sm">{props.sender}</div>
			{
				parts.map(item => {
					if(item[0]==="@" && props.users.includes(item.substring(1))) {
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