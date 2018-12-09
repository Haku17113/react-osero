import React from 'react';
import { Board } from "./";

export class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			squares: new Array(9),
			xIsNext: true,
			isFinished: false
		};
  }
  
	handleClick(i) {
		if (this.state.isFinished) {
			return;
		}
		const squares = this.state.squares.slice();
		if (calculateWinner(squares)) {
			this.setState({isFinished: true});
			return;
		}
		if (squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext
		});
  }
  
	render() {
		const winner = calculateWinner(this.state.squares);
		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}
		return (
			<div className="game">
				<Board
					squares={this.state.squares}
					onClick={(i) => this.handleClick(i)}
				/>
				<div className="game-info">
					<div>{status}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	const length = lines.length;
	for (let i = 0; i < length; i++) {
		const [a, b, c] = lines[i];
		const player = squares[a];
		if (player && player === squares[b] && player === squares[c]) {
			return player;
		}
	}
	return null;
}
