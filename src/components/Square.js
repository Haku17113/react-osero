import React from 'react';

export class Square extends React.Component {
	render() {
		return (
			<button className="square" onClick={() => this.props.onClick()} key={this.props.id}>
				{this.props.value}
			</button>
		);
	}
}
