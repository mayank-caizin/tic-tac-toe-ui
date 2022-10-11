import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'ttt-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() game: Game;
  @Input() boardActive;
  board = [];

  constructor(private _gameService: GameService) {}

  ngOnInit(): void {
    console.log(this.game);
    this.board = this.createBoard();
  }

  createBoard(){
    let board = [];
    for( let i = 0; i < 9; i ++ ){
      let currstate = this.game.board.charAt(i);
      if(currstate == '_') currstate = null;

      board.push( { id: i, state: currstate } )
    };
    return board;
  }

  makeMoveOnBoard(boxIndex: number) {
    let activePlayer = this.game.xTurn ? 'X' : 'O';
    this.board[boxIndex] = { id: boxIndex, state: activePlayer };
    this.game.xTurn = !this.game.xTurn;
  }

  async makeMove(boxIndex: number) {
    this.makeMoveOnBoard(boxIndex);
    await this._gameService.makeMove(this.game.xPlayerId, this.game.id, boxIndex);

    if(this.game.gameMode === 1)
      await this.makeComputerMove();
  }

  async makeComputerMove() {
    await this._gameService.getMove(this.game.xPlayerId, this.game.id);
    let index: number = this._gameService.bestMove;
    await this._gameService.makeMove(this.game.xPlayerId, this.game.id, index);
    this.makeMoveOnBoard(index);
  }

}
