import React from "react";
import ReadMore from "../components/ReadMore";

class ReadMoreContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
			truncated: false
		};
		this.handleTruncate = this.handleTruncate.bind(this);
		this.toggleLines = this.toggleLines.bind(this);
	}

	handleTruncate(truncated) {
		if(this.state.truncated !== truncated) {
			this.setState({truncated: truncated});
		}
	}

	toggleLines(e) {
		e.preventDefault();
		this.setState((state) => ({expanded: !state.expanded}));
	}

	render() {
		return (
			<ReadMore toggleLines={this.toggleLines} handleTruncate={this.handleTruncate} expanded={this.state.expanded} truncated={this.state.truncated}>{this.props.children}</ReadMore>
		);
	}
}

export default ReadMoreContainer;