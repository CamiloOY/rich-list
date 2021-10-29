import React from "react";
import Truncate from 'react-truncate';

export default function ReadMore(props) {
	return (
		<div>
			<Truncate lines={!props.expanded && 2} ellipsis={(<span>... <a href="#" onClick={props.toggleLines} role="button" className="toggleExpansionButton">Read more</a></span>)} onTruncate={props.handleTruncate}>{props.children}</Truncate>
			{!props.truncated && props.expanded && (<span> <a href="#" onClick={props.toggleLines} role="button" className="toggleExpansionButton">Read less</a></span>)}
		</div>
	);
}