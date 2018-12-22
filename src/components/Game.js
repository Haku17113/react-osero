import React from 'react';
import { Board } from "./";
import { Square } from './Square';

const x_size = 8, y_size = x_size;

export class Game extends React.Component {
	constructor() {
		super();
		let board = new Array(x_size);
		for(let y = 0; y < y_size; y++) {
			board[y] = new Array(y_size).fill(null);
		}
		this.state = {
			history: [{
				board: board
			}],
			xIsNext: true,
			stepNumber: 0
		};
	}
	
	handleClick(x, y) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const board = current.board.slice();
		if(board == current.board){
			console.log("\n equal\n")
		}
		console.log(x, y);
		console.log(board[0], board[1], board[2]);
		if (calculateWinner(board) || board[x][y]) {
			return;
		}
		board[x][y] = this.state.xIsNext ? 'X' : 'O';
		console.log(board[x][y]);
		console.log(current.board)
		console.log(board)
		this.setState({
			history: history.concat([{
				board: board.slice()
			}]),
			xIsNext: !this.state.xIsNext,
			stepNumber: history.length
		});
	}

	jumpTo(step) {
		// this.setState({
		// 	stepNumber: step,
		// 	xIsNext: (step % 2) ? false : true,
		// });
	}

	render() {
		console.log(this.state.stepNumber)
		console.log(this.state.history)
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.board);

		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		const moves = history.map((step, move) => {
			const desc = move ?
				'Move #' + move :
				'Game start';
			return (
				<li key={"move" + move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});

		return (
			<div className="game">
				<div className="game-board">
					<Board
						board={current.board}
						onClick={(x, y) => this.handleClick(x, y)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

function calculateWinner(board) {

	return null;
}
