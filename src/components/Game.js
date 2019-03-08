import React from 'react';
import _ from 'lodash';
import { Board } from "./";

const BOARD_SIZE = {x: 8, y:8};
const PLAYER = {x: 'X', o: 'O'};
const NEXT = 'I';

export class Game extends React.Component {
	constructor() {
		super();
		let board = initBoard();
		let next_boards = getNextBoards(board, PLAYER.x);
		this.state = {
			history: [{
				board: board,
				xIsNext: true,
				nextBoards: next_boards
			}],
			stepNumber: 0
		};
	}
	
	handleClick(x, y) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const board = _.cloneDeep(current.board);

		if (calculateWinner(board) || board[x][y]) {
			return;
		}

		const player = current.xIsNext ? PLAYER.x : PLAYER.o;

		let next_board = getNextBoard(board, x, y, player);
		if (next_board == null){
			return;
		}
		let next_boards = getNextBoards(next_board, !current.xIsNext ? PLAYER.x : PLAYER.o);

		this.setState({
			history: history.concat([{
				board: next_board,
				xIsNext: !current.xIsNext,
				nextBoards: next_boards
			}]),
			stepNumber: history.length
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
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
			status = 'Next player: ' + (current.xIsNext ? PLAYER.x : PLAYER.o);
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

		let board = _.cloneDeep(current.board);
		current.nextBoards.forEach((value) => {
			board[value.x][value.y] = NEXT;
		});

		return (
			<div className="game">
				<div className="game-board">
					<Board
						board={board}
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

function initBoard() {
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

function calculateWinner(board) {

	return null;
}

function getNextBoards(board, player){
	let next_boards = [];

	for(let x = 0; x < BOARD_SIZE.x; x++){
		for(let y = 0; y < BOARD_SIZE.y; y++) {
			let next_board = getNextBoard(board, x, y, player);
			if(next_board){
				next_boards = next_boards.concat({next_board: next_board, x: x, y: y});
			}
		}
	}

	console.log(next_boards)

	return next_boards;
}

const ways={length: 8, x: [0, 0, 1, 1, 1, -1, -1, -1], y: [1, -1, 0, 1, -1, 0, 1, -1]};

function getNextBoard(board, x, y, player) {
	if(board[x][y] != null){
		return;
	}
	
	let next_board = _.cloneDeep(board);
	next_board[x][y] = player;
	let updated_squares_allways = [];
	
	for(let i = 0; i < ways.length; i++){
		let updated_squares = getUpdatedSquares(next_board, x + ways.x[i], y + ways.y[i], player, i);
		if(updated_squares){
			updated_squares_allways = updated_squares_allways.concat(updated_squares);
			// console.log(updated_squares)
		}
	}

	if(updated_squares_allways.length == 0){
		// console.log("updated_squares_allways is null")
		next_board[x][y] = null;
		return null;
	}

	updated_squares_allways.forEach((value) => {
		next_board[value.x][value.y] = player;
	});
	
	return next_board;
}

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
