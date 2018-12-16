import React from 'react';
import { Board } from "./";

const xSize = 3, ySize = xSize;

export class Game extends React.Component {
	constructor() {
		super();
		let squares = new Array(xSize);
		for(let y = 0; y < xSize; y++) {
			squares[y] = new Array(ySize).fill(null);
		}
		this.state = {
			history: [{
				squares: squares
			}],
			xIsNext: true,
			stepNumber: 0
		};
	}
	
	handleClick(x, y) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if(squares == current.squares){
			console.log("\n equal\n")
		}
		console.log(x, y);
		console.log(squares[0], squares[1], squares[2]);
		if (calculateWinner(squares) || squares[x][y]) {
			return;
		}
		squares[x][y] = this.state.xIsNext ? 'X' : 'O';
		console.log(squares[x][y]);
		console.log(current.squares)
		console.log(squares)
		this.setState({
			history: history.concat([{
				squares: squares.slice()
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
		const winner = calculateWinner(current.squares);

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
						squares={current.squares}
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

function calculateWinner(squares) {

	return null;
}
