import React from 'react';
import { Square } from "./";

export class Board extends React.Component {
	renderSquare(x, y) {
		return <Square value={this.props.board[x][y]} onClick={() => this.props.onClick(x, y)} id={x + "," + y}/>;
	}

	renderRow(y) {
		let x_arry = Array.from(new Array(this.props.BOARD_SIZE.x)).map((v, i) => i);

		return (
			<div className="board-row" key={"row" + y}>
				{x_arry.map((x) => {return this.renderSquare(x, y)})}
			</div>
		);
	}

	render() {
		let y_arry = Array.from(new Array(this.props.BOARD_SIZE.y)).map((v, i) => i);

		return (
			<div className="board-row">
				{y_arry.map((y) => {return this.renderRow(y)})}
			</div>
		);
	}

}
