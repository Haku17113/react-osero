import React from 'react';
import _ from 'lodash';
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
		const board = _.cloneDeep(current.board);

		if (calculateWinner(board) || board[x][y]) {
			return;
		}

		const player = this.state.xIsNext ? PLAYER.x : PLAYER.o;

		let next_board = getNextBoard(board, x, y, player);
		if (next_board == null){
			return;
		}

		this.setState({
			history: history.concat([{
				board: next_board
			}]),
			xIsNext: !this.state.xIsNext,
			stepNumber: history.length
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) ? false : true,
		});
	}

	render() {
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

const ways={length: 8, x: [0, 0, 1, 1, 1, -1, -1, -1], y: [1, -1, 0, 1, -1, 0, 1, -1]};

function getUpdatedSquares(board, x, y, player, way) {
	if(x < 0 || y < 0 || x >= BOARD_SIZE.x || y >= BOARD_SIZE.y || board[x][y] == null){
		return null;
	}

	if(board[x][y] == player){
		return [];
	}else{
		let updated_squares = getUpdatedSquares(board, x + ways.x[way], y + ways.y[way], player, way);
		if(updated_squares){
			return updated_squares.concat({x: x, y: y});
		}else{
			return null;
		}
	}
}

function getNextBoard(board, x, y, player) {
	let next_board = _.cloneDeep(board);
	next_board[x][y] = player;
	let updated_squares_allways = [];
	
	for(let i = 0; i < ways.length; i++){
		let updated_squares = getUpdatedSquares(next_board, x + ways.x[i], y + ways.y[i], player, i);
		if(updated_squares){
			updated_squares_allways = updated_squares_allways.concat(updated_squares);
			console.log(updated_squares)
		}
	}

	if(updated_squares_allways.length == 0){
		console.log("updated_squares_allways is null")
		return null;
	}

	updated_squares_allways.forEach((value) => {
		next_board[value.x][value.y] = player;
	});
	
	return next_board;
}
