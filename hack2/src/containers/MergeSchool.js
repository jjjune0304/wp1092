// Designed by Ming-Yang, Ho (https://github.com/Kaminyou)
import React, { Component } from 'react';
import Header from '../components/Header';
import Board2048 from '../components/Board2048'
import '../containers/MergeSchool.css';

let secret_seed = 1;
const tokenString = "Kaminyou".split("");
for(let i = 0; i < tokenString.length; i++){
    secret_seed *= tokenString[i].charCodeAt(0);
    secret_seed = secret_seed % 0xffffffff;
}

class MergeSchool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [[0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [2,2,0,0]], // the 4*4 board
            qs_ranking: 32768, // qs ranking now 
            best_qs_ranking: 32768, // the best ranking
            gameover: false, // flag for game over
            step: 0, // step
            win: false, // flag for win i.e. get a "65536" grid
            seed: secret_seed
        };
        this.handleKeyDown= this.handleKeyDown.bind(this);
    }

    // Pesudo random number generator
    // 4 bytes hashing function By Thomas Wang or Robert Jenkins
    prng = (seed, salt, mod) => {
        let temp = seed + salt;
        temp = (temp+0x7ed55d16) + (temp<<12);
        temp = (temp^0xc761c23c) ^ (temp>>19);
        temp = (temp+0x165667b1) + (temp<<5);
        temp = (temp+0xd3a2646c) ^ (temp<<9);
        temp = (temp+0xfd7046c5) + (temp<<3);
        temp = (temp^0xb55a4f09) ^ (temp>>16);
        if( temp < 0 ) temp = 0xffffffff + temp;
        return (temp % mod);
    }   
    
    // Create board and add two "2" and reset everything required
    initializeBoard = () => {
        let board = [[0,0,0,0],
                     [0,0,0,0],
                     [0,0,0,0],
                     [0,0,0,0]];
        let boardset = this.putGridRandom(board, true);
        boardset = this.putGridRandom(boardset.board, true);
        // #########################
        // # 7 Add something yourself
        // boardset.board will be the initial board, please use it directly
        // #########################
        this.setState({board: boardset.board, qs_ranking: 32768, step: 0, win:false, gameover:false});
    }

    
    
    // Get all empty x y coordinates in board
    getEmptyGrid = (board) => {
        let empty_grid = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j<4; j++) {
                if (board[i][j] === 0) {
                    empty_grid.push([i, j])
                }
            }
        }
        return empty_grid;
    }
    
    // Put one "2" in random empty grid
    putGridRandom = (board, init) => {
        let empty_grid = this.getEmptyGrid(board);
        let random_num = this.prng(this.state.seed, this.state.step, empty_grid.length);
        if (init){
            random_num = this.prng(this.state.seed, 0, empty_grid.length);
        } 
        let random_empty_grid = empty_grid[random_num];
        board[random_empty_grid[0]][random_empty_grid[1]] = 2;
        return {board};
    }
    
    // Check if one move is effecitve
    justifyMove = (prev, next) => {
        let prev_string = JSON.stringify(prev)
        let new_string = JSON.stringify(next)
        return (prev_string !== new_string) ? true : false;
    }
    
    // Move
    moveGrid = (direction) => {
        if (!this.state.gameover) {
            if (direction === 'right') {
                const nextBoard = this.moveRight(this.state.board);
                this.checkAndUpdateAfterMove(nextBoard);
            } 
            // #########################
            // # 8 Implement yourself
            // #########################
            if (direction === 'left') {
                const nextBoard = this.moveLeft(this.state.board);
                this.checkAndUpdateAfterMove(nextBoard);
            } else if (direction === 'up') {
                const nextBoard = this.moveUp(this.state.board);
                this.checkAndUpdateAfterMove(nextBoard);
            } else if (direction === 'down') {
                const nextBoard = this.moveDown(this.state.board);
                this.checkAndUpdateAfterMove(nextBoard);
            } 
        }
    }

    // Check everything after one move including gameover and win
    // Also, the step, ranking, best ranking should be updated here
    checkAndUpdateAfterMove = (nextBoard) => {
        if (this.justifyMove(this.state.board, nextBoard.board)) {
            const nextBoardSetWithRandom = this.putGridRandom(nextBoard.board, false);
            let qsRankNow = this.state.qs_ranking;
            let stepNow = this.state.step;
            let combNow = nextBoard.combination;
            let bestPrev = this.state.best_qs_ranking;

            // #########################
            // # 4 Implement yourself
            // #########################

            // #########################
            // # 5 Implement yourself
            // #########################
            stepNow = stepNow + 1;
            if (combNow > 0) {
                qsRankNow = qsRankNow - combNow;
            }
            this.setState({board: nextBoardSetWithRandom.board, qs_ranking: qsRankNow, step: stepNow});
            
            // #########################
            // # 7 Implement yourself
            // #########################
            if (bestPrev > qsRankNow) {
                this.setState({best_qs_ranking: qsRankNow});
            }
            
            if (this.checkGameover(nextBoardSetWithRandom.board)) {
                this.setState({gameover: true});
                console.log("Lose");
            }

            if(this.checkWin(nextBoardSetWithRandom.board)) {
                this.setState({win: true});
                console.log("Win");
            }
        }
    }
    
    // Moveup function    
    // Moveright function
    moveRight = (prevBoard) => {
        let board = [];
        let combination = 0;
    
        for (let r = 0; r < prevBoard.length; r++) {
            let row = [];      
            for (let c = 0; c < prevBoard[r].length; c++) {
                let current = prevBoard[r][c];
                (current === 0) ? row.unshift(current) : row.push(current);
            }
            board.push(row);
        }
    
        for (let r = 0; r < board.length; r++) {
            // special case
            if ((board[r][0] === board[r][1]) && (board[r][0] !== 0) && (board[r][2] === board[r][3]) && (board[r][2] !== 0)) {
                board[r][3] = board[r][3] * 2;
                board[r][2] = board[r][1] * 2;
                board[r][1] = 0;
                board[r][0] = 0;
                combination += 2;
                continue;
            }

            for (let c = board[r].length - 1; c > 0; c--) {
                if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c - 1] = 0;
                    combination += 1;
                } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
                    board[r][c] = board[r][c - 1];
                    board[r][c - 1] = 0;
                }
            }
        }
    
        return {board, combination};
    }

    moveUp = (prevBoard) => {
        // #########################
        // # 8 Implement yourself
        // #########################
        let board = prevBoard;
        let combination = 0;
        board = this.rotateClockwise(board);
		let nextBoard = this.moveRight(board);
        board = nextBoard.board;
        combination = nextBoard.combination;
        board = this.rotateCounterClockwise(board);
        return {board, combination};
    }
    
    // Movedown function
    moveDown = (prevBoard) => {
        // #########################
        // # 8 Implement yourself
        // #########################
        let board = prevBoard;
        let combination = 0;
        board = this.rotateCounterClockwise(board);
		let nextBoard = this.moveRight(board);
        board = nextBoard.board;
        combination = nextBoard.combination;
        board = this.rotateClockwise(board);
        return {board, combination};
    }
    
    // Moveleft function
    moveLeft = (prevBoard) => {
        // #########################
        // # 8 Implement yourself
        // #########################
        let board = prevBoard;
        let combination = 0;
        board = this.rotateClockwise(board);
        board = this.rotateClockwise(board);
		let nextBoard = this.moveRight(board);
        board = nextBoard.board;
        combination = nextBoard.combination;
        board = this.rotateClockwise(board);
        board = this.rotateClockwise(board);
        return {board, combination};
    };
    
    // Rotate the matrix clockwisely
    rotateClockwise = (matrix) => {
        let result = [];
        for(let i = 0; i < matrix[0].length; i++) {
            let row = matrix.map(e => e[i]).reverse();
            result.push(row);
        }
        return result;
    };
    
    // Rotate the matrix counterclockwisely
    rotateCounterClockwise = (matrix) => {
        // #########################
        // # 8 Implement yourself
        // #########################
        let result = [];
        for(let i = matrix[0].length - 1; i >=- 0; i--) {
            let row = matrix.map(e => e[i]);
            result.push(row);
        }
        console.log("Counter");
        console.log(result);
        return result;
    };

    // Check if it is gameover
    checkGameover = (board) => {
        // #########################
        // # 9 Implement yourself
        // #########################
        let test = this.moveLeft(board).board;
        if (this.justifyMove(board, test)) return false;
        test = this.moveUp(board).board;
        if (this.justifyMove(board, test)) return false;
        test = this.moveRight(board).board;
        if (this.justifyMove(board, test)) return false;
        test = this.moveDown(board).board;
        if (this.justifyMove(board, test)) return false;
        return true;
    };

    // Check if it is win
    checkWin = (board) => {
        // #########################
        // # 10 Implement yourself
        // #########################
        for(let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] === 65536) return true;
            }
        }
        return false;
    };

    // #########################
    // # 4 Implement yourself
    // You might need something to capture keyboard input
    // #########################

    componentDidMount() {
        document.body.addEventListener('keydown', this.handleKeyDown, false);
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.handleKeyDown, false);
    }
    
    handleKeyDown(event) {
        event.preventDefault();
        if (event.keyCode === 39) {
            this.moveGrid("right");
        }
        // #########################
        // # 8 Implement yourself
        // #########################
        if (event.keyCode === 37) {
            this.moveGrid("left");
        } else if (event.keyCode === 38) {
            this.moveGrid("up");
        } else if (event.keyCode === 40) {
            this.moveGrid("down");
        }
    }

    // Useful function for you to check the endgame
    setBadEnd = () => {
        let nextBoard = [[2,4,2,4],
                        [4,2,4,2],
                        [2,4,2,128],
                        [4,128,2,2]];
        this.setState({board: nextBoard});
    }
    
    // Useful function for you to check the best result
    setGoodEnd = () => {
        let nextBoard = [[2,2,4,8],
                        [128,64,32,16],
                        [256,512,1024,2048],
                        [32768,16384,8192,4096]];
        this.setState({board: nextBoard});
    }

    render() {
        return (
            <>      
                <Header qs={this.state.qs_ranking} step={this.state.step} 
                        best={this.state.best_qs_ranking} handleNewGame={this.initializeBoard}/>
                <Board2048 className="wrapper" board={this.state.board} 
                    lose={this.state.gameover} win={this.state.win} restart={this.initializeBoard}/>
                <div className="btn-groups">
                    <div className="btn-useful" id="badend-btn" onClick={this.setBadEnd}>BadEnd</div>
                    <div className="btn-useful" id="goodend-btn" onClick={this.setGoodEnd}>GoodEnd</div>
                </div>
            </>
        );
    }
};

export default MergeSchool;