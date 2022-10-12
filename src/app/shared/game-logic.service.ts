import { Injectable } from '@angular/core';
import { ComputerMove } from '../gamelogic/computermove';

@Injectable()
export class GameLogicService {

  constructor() { }

  getComputerMove(board, player): number {
    let cm: ComputerMove = new ComputerMove(board, player);
    return cm.findBestMove();
  }

  checkWinner(board): boolean {
    return false;
  }
}
