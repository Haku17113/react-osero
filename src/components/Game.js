import React from 'react';
import { Board } from "./";
import { Square } from './Square';

const BOARD_SIZE = {x: 8, y:8};
const PLAYER = {x: 'X', o: 'O'};

export class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			history: [{
				board: this.initBoard()
			}],
			xIsNext: true,
			stepNumber: 0
		};
	}

	initBoard(){
		let board = new Array(BOARD_SIZE.x);
		for(let y = 0; y < BOARD_SIZE.y; y++) {
			board[y] = new Array(BOARD_SIZE.y).fill(null);
		}

		board[BOARD_SIZE.x / 2][BOARD_SIZE.y / 2] = PLAYER.x;
		board[BOARD_SIZE.x / 2][BOARD_SIZE.y / 2 - 1] = PLAYER.o;
		board[BOARD_SIZE.x / 2 - 1][BOARD_SIZE.y / 2] = PLAYER.o;
		board[BOARD_SIZE.x / 2 - 1][BOARD_SIZE.y / 2 - 1] = PLAYER.x;

		console.log(board)

		return board;
	}
	
	handleClick(x, y) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const board = current.board.concat();
		if(board == current.board){
			console.log("\n equal\n")
		}
		console.log(x, y)
		if (calculateWinner(board) || board[x][y]) {
			return;
		}
		board[x][y] = this.state.xIsNext ? PLAYER.x : PLAYER.o;
		let next_board = updateBoard(board, x, y);
		if (next_board == null){
			board[x][y] = null;
			return;
		}
		// console.log(board[x][y]);
		// console.log(current.board)
		// console.log(next_board)
		this.setState({
			history: history.concat([{
				board: next_board
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
		// console.log(this.state.stepNumber)
		// console.log(this.state.history)
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.board);

		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? PLAYER.x : PLAYER.o);
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
		console.log(moves)

		return (
			<div className="game">
				<div className="game-board">
					<Board
						board={current.board}
						onClick={(x, y) => this.handleClick(x, y)}
						BOARD_SIZE = {BOARD_SIZE}
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

const x_ways = [0, 0, 1, 1, 1, -1, -1, -1], y_ways = [1, -1, 0, 1, -1, 0, 1, -1];

function updateSquare(board, x, y, player, way) {
	if(x < 0 || y < 0 || x >= BOARD_SIZE.x || y >= BOARD_SIZE.y || board[x][y] == null){
		return null;
	}

	if(board[x][y] == player){
		return [];
	}else{
		let updated_squares = updateSquare(board, x + x_ways[way], y + y_ways[way], player, way);
		if(updated_squares){
			return updated_squares.concat({x: x, y: y});
		}else{
			return null;
		}
	}
}

function updateBoard(board, x, y) {
	const player = board[x][y];
	let updated_squares_allways = [];
	
	for(let i = 0; i < x_ways.length; i++){
		let updated_squares = updateSquare(board, x + x_ways[i], y + y_ways[i], player, i);
		if(updated_squares){
			updated_squares_allways = updated_squares_allways.concat(updated_squares);
			console.log(updated_squares)
		}
	}
	console.log(updated_squares_allways)
	console.log(updated_squares_allways.length)

	if(updated_squares_allways.length == 0){
		console.log("updated_squares_allways is null")
		return null;
	}

	let updated_board = board.concat();
	updated_squares_allways.forEach((value) => {
		updated_board[value.x][value.y] = player;
	});
	
	return updated_board;
}
