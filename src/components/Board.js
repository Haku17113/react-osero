import React from 'react';
import { Square } from "./";

export class Board extends React.Component {
	renderSquare(x, y) {
		return <Square value={this.props.board[x][y]} onClick={() => this.props.onClick(x, y)} />;
	}

	renderRow(i) {
		return (
			<div className="board-row">
					{this.renderSquare(i, 0)}
					{this.renderSquare(i, 1)}
					{this.renderSquare(i, 2)}
					{this.renderSquare(i, 3)}
					{this.renderSquare(i, 4)}
					{this.renderSquare(i, 5)}
					{this.renderSquare(i, 6)}
					{this.renderSquare(i, 7)}
			</div>
		);
	}

	render() {
		return (
			<div>
				{this.renderRow(0)}
				{this.renderRow(1)}
				{this.renderRow(2)}
				{this.renderRow(3)}
				{this.renderRow(4)}
				{this.renderRow(5)}
				{this.renderRow(6)}
				{this.renderRow(7)}
			</div>
		);
	}
}
