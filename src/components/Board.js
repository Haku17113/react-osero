import React from 'react';
import { Square } from "./";

export class Board extends React.Component {
	renderSquare(x, y) {
		return <Square value={this.props.squares[x][y]} onClick={() => this.props.onClick(x, y)} />;
	}

	renderRow(i) {
		return (
			<div className="board-row">
					{this.renderSquare(i, 0)}
					{this.renderSquare(i, 1)}
					{this.renderSquare(i, 2)}
			</div>
		);
	}

	render() {
		return (
			<div>
				{this.renderRow(0)}
				{this.renderRow(1)}
				{this.renderRow(2)}
			</div>
		);
	}
}
