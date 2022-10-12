import { Injectable } from '@angular/core';
import { ComputerMove } from '../gamelogic/computermove';

@Injectable()
export class GameLogicService {

  constructor() { }

  boardToString(board): string {
    let str = "";
    for( let i = 0; i < 9; i ++ ){
      let char = board[i].state ? board[i].state : '_';
      str += char;
    }
    return str;
  }

  getComputerMove(board, player): number {
    let cm: ComputerMove = new ComputerMove(board, player);
    return cm.findBestMove();
  }

  checkWinner(board): boolean {
    return this.checkDiag(board) || this.checkRows(board, "row") || this.checkRows(board, "col") ? true : false;
  }

  private checkRows( board, mode ): boolean{
    const
      ROW = mode === "row" ? true : false,
      DIST = ROW ? 1 : 3,
      INC = ROW ? 3 : 1,
      NUMTIMES = ROW ? 7 : 3;

      for ( let i = 0; i < NUMTIMES; i += INC ){
        let
          firstSquare = board[i].state,
          secondSquare =  board[i + DIST].state,
          thirdSquare = board[ i + ( DIST * 2)].state;

        if ( firstSquare && secondSquare && thirdSquare  ){
          if ( firstSquare === secondSquare && secondSquare === thirdSquare ) return true;
        }
      }
    return false;
  }

  private checkDiag (board){
    const timesRun = 2,
      midSquare = board[4].state;

    for( let i = 0; i <= timesRun; i+=2 ){
     let
      upperCorner = board[i].state,
      lowerCorner =  board[8 - i].state;

      if ( midSquare && upperCorner && lowerCorner  ){
        if( midSquare === upperCorner && upperCorner === lowerCorner) return true;
      }
    }

    return false;
  }
}
