import React, { Component } from 'react';
import './App.css';
const boardConst = [ 
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

const boardCol = 7;
const boardRow = 6;
class App extends Component {
  constructor(){
    super();
    this.state={
      board: boardConst,
      player1: true,
      player2: false,
      winner: ''
    }
  }
  
  getNearByValue = (row, col, row1, col1) => {
    if(this.getCurrentValue(row,col) === this.getCurrentValue(row+row1,col+col1)){
      return 1 + this.getNearByValue(row+row1, col+col1, row1, col1);
    } else {
      return 0;
    }
  }

  getCurrentValue = (row,col) => {
    if(this.state.board[row][col] === undefined || this.state.board[row][col] === 0){
      return -1;
    } else {
      return this.state.board[row][col];
    }
  }

  checkforWinner(row, col){
    let i, j, x, y, maxX, maxY, steps, count = 0, board =  this.state.board,
    checkConditions = [
      { x: 0, y: 1  }, 
      { x: 1, y: 0  },
      { x: 1, y: 1  },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: -1},
    ];
  loop:
  for (i = 0; i < checkConditions.length; i++, count = 0) {
    x =     Math.min(Math.max(row - (4 * checkConditions[i].x), 0), boardRow    - 1);
    y =     Math.min(Math.max(col - (4 * checkConditions[i].y), 0), boardCol - 1);
    maxX =  Math.max(Math.min(row + (4 * checkConditions[i].x), boardRow - 1), 0);
    maxY =  Math.max(Math.min(col + (4 * checkConditions[i].y), boardCol - 1), 0);
    steps = Math.max(Math.abs(maxX - x), Math.abs(maxY - y));
    
    for (j = 0; j < steps; j++, x += checkConditions[i].x, y += checkConditions[i].y) {
      if (x < boardRow && y < boardCol && board[x][y] === board[row][col]) {
        if (++count >= 4) {
          break loop;
        }
      } else {
        count = 0;
      }
    }
  }
  
  return count >= 4;
  }

  checkWhetherGameIsCompleted(row, col) {
    let value = this.checkforWinner(row, col);
    let player = this.state.board[row][col] === 1 ? 'Player 1' : 'Player 2';
    if(!value){
      return false;
    } else {
      setTimeout(() => {
        this.clear();
      }, 5000);
      this.setState({winner: player}); 
    }
  }
  
  clear = () => {
    let board = this.state.board;
    this.setState({board: board.map( item => {return 0;}), player1: true, player2: false, winner: ''});
  }

  boardOnClick = (row,col) =>{
    let board = this.state.board;
      if(this.state.player1){
        board[row][col] = 1;
      }else{
        board[row][col] = 2;
      }
      this.setState({board: board, player1: !this.state.player1}, () => {this.checkWhetherGameIsCompleted(row,col)});      
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Connect Four Game</h1>
          <div className="headerName">
            <a href="" onClick={() => this.clear()} className="newGame">New Game</a>
          </div>  
        </header>
       
        {this.state.winner && <div className="winner">Winner: {this.state.winner}</div>}
        <div className="table">
          <table>
            <tbody>
              <tr>
                <td className={this.state.board[0][0] === 1 ? "yellow" : (this.state.board[0][0] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(0,0)}></td>
                <td className={this.state.board[0][1] === 1 ? "yellow" : (this.state.board[0][1] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(0,1)}></td>
                <td className={this.state.board[0][2] === 1 ? "yellow" : (this.state.board[0][2] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(0,2)}></td>
                <td className={this.state.board[0][3] === 1 ? "yellow" : (this.state.board[0][3] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(0,3)}></td>
                <td className={this.state.board[0][4] === 1 ? "yellow" : (this.state.board[0][4] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(0,4)}></td>
                <td className={this.state.board[0][5] === 1 ? "yellow" : (this.state.board[0][5] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(0,5)}></td>
                <td className={this.state.board[0][6] === 1 ? "yellow" : (this.state.board[0][6] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(0,6)}></td>
              </tr>
              <tr>
                <td className={this.state.board[1][0] === 1 ? "yellow" : (this.state.board[1][0] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(1,0)}></td>
                <td className={this.state.board[1][1] === 1 ? "yellow" : (this.state.board[1][1] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(1,1)}></td>
                <td className={this.state.board[1][2] === 1 ? "yellow" : (this.state.board[1][2] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(1,2)}></td>
                <td className={this.state.board[1][3] === 1 ? "yellow" : (this.state.board[1][3] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(1,3)}></td>
                <td className={this.state.board[1][4] === 1 ? "yellow" : (this.state.board[1][4] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(1,4)}></td>
                <td className={this.state.board[1][5] === 1 ? "yellow" : (this.state.board[1][5] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(1,5)}></td>
                <td className={this.state.board[1][6] === 1 ? "yellow" : (this.state.board[1][6] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(1,6)}></td>
              </tr>
              <tr>
                <td className={this.state.board[2][0] === 1 ? "yellow" : (this.state.board[2][0] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(2,0)}></td>
                <td className={this.state.board[2][1] === 1 ? "yellow" : (this.state.board[2][1] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(2,1)}></td>
                <td className={this.state.board[2][2] === 1 ? "yellow" : (this.state.board[2][2] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(2,2)}></td>
                <td className={this.state.board[2][3] === 1 ? "yellow" : (this.state.board[2][3] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(2,3)}></td>
                <td className={this.state.board[2][4] === 1 ? "yellow" : (this.state.board[2][4] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(2,4)}></td>
                <td className={this.state.board[2][5] === 1 ? "yellow" : (this.state.board[2][5] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(2,5)}></td>
                <td className={this.state.board[2][6] === 1 ? "yellow" : (this.state.board[2][6] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(2,6)}></td>
              </tr>
              <tr>
                <td className={this.state.board[3][0] === 1 ? "yellow" : (this.state.board[3][0] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(3,0)}></td>
                <td className={this.state.board[3][1] === 1 ? "yellow" : (this.state.board[3][1] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(3,1)}></td>
                <td className={this.state.board[3][2] === 1 ? "yellow" : (this.state.board[3][2] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(3,2)}></td>
                <td className={this.state.board[3][3] === 1 ? "yellow" : (this.state.board[3][3] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(3,3)}></td>
                <td className={this.state.board[3][4] === 1 ? "yellow" : (this.state.board[3][4] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(3,4)}></td>
                <td className={this.state.board[3][5] === 1 ? "yellow" : (this.state.board[3][5] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(3,5)}></td>
                <td className={this.state.board[3][6] === 1 ? "yellow" : (this.state.board[3][6] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(3,6)}></td>
              </tr>
              <tr>
                <td className={this.state.board[4][0] === 1 ? "yellow" : (this.state.board[4][0] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(4,0)}></td>
                <td className={this.state.board[4][1] === 1 ? "yellow" : (this.state.board[4][1] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(4,1)}></td>
                <td className={this.state.board[4][2] === 1 ? "yellow" : (this.state.board[4][2] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(4,2)}></td>
                <td className={this.state.board[4][3] === 1 ? "yellow" : (this.state.board[4][3] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(4,3)}></td>
                <td className={this.state.board[4][4] === 1 ? "yellow" : (this.state.board[4][4] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(4,4)}></td>
                <td className={this.state.board[4][5] === 1 ? "yellow" : (this.state.board[4][5] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(4,5)}></td>
                <td className={this.state.board[4][6] === 1 ? "yellow" : (this.state.board[4][6] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(4,6)}></td>
              </tr>
              <tr>
                <td className={this.state.board[5][0] === 1 ? "yellow" : (this.state.board[5][0] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(5,0)}></td>
                <td className={this.state.board[5][1] === 1 ? "yellow" : (this.state.board[5][1] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(5,1)}></td>
                <td className={this.state.board[5][2] === 1 ? "yellow" : (this.state.board[5][2] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(5,2)}></td>
                <td className={this.state.board[5][3] === 1 ? "yellow" : (this.state.board[5][3] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(5,3)}></td>
                <td className={this.state.board[5][4] === 1 ? "yellow" : (this.state.board[5][4] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(5,4)}></td>
                <td className={this.state.board[5][5] === 1 ? "yellow" : (this.state.board[5][5] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(5,5)}></td>
                <td className={this.state.board[5][6] === 1 ? "yellow" : (this.state.board[5][6] === 2 ? 'red' : '') } onClick={() => this.boardOnClick(5,6)}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
