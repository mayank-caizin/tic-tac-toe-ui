class Move {
  row: number = -1;
  col: number = -1;

  get() {
    return this.row * 3 + this.col;
  }

  set(i, j) {
    this.row = i;
    this.col = j;
  }
}
export class ComputerMove {
  board: string[][] = [];
  player: string;
  opponent: string;

  constructor(board, player) {
    this.player = player;
    this.opponent = player === 'X' ? 'O' : 'X';

    let k = 0;
    for(let i = 0; i < 3; i++) {
      let row = [];
      for(let j = 0; j < 3; j++) {
        row.push(board[k].state);
        k++;
      }
      this.board.push(row);
    }
  }

  private isMovesLeft() {
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if(this.board[i][j] === null)
          return true;
      }
    }
    return false;
  }

  private evaluate() {
    // Checking for Rows for X or O victory.
    for(let row = 0; row < 3; row++)
    {
        if (this.board[row][0] === this.board[row][1] &&
          this.board[row][1] === this.board[row][2])
        {
            if (this.board[row][0] === this.player)
                return +10;

            else if (this.board[row][0] === this.opponent)
                return -10;
        }
    }

    // Checking for Columns for X or O victory.
    for(let col = 0; col < 3; col++)
    {
        if (this.board[0][col] === this.board[1][col] &&
          this.board[1][col] === this.board[2][col])
        {
            if (this.board[0][col] === this.player)
                return +10;

            else if (this.board[0][col] === this.opponent)
                return -10;
        }
    }

    // Checking for Diagonals for X or O victory.
    if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2])
    {
        if (this.board[0][0] === this.player)
            return +10;

        else if (this.board[0][0] === this.opponent)
            return -10;
    }

    if (this.board[0][2] == this.board[1][1] &&
      this.board[1][1] == this.board[2][0])
    {
        if (this.board[0][2] === this.player)
            return +10;

        else if (this.board[0][2] === this.opponent)
            return -10;
    }

    // Else if none of them have
    // won then return 0
    return 0;
  }

  private minimax(depth: number, isMax: boolean) {
    let score = this.evaluate();

    if(score === 10 || score === -10) return score;

    if(!this.isMovesLeft()) return 0;

    if(isMax) {
      let best = -1000;

      for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
          if(this.board[i][j] === null) {
            this.board[i][j] = this.player;
            best = Math.max(best, this.minimax(depth + 1, !isMax));
            this.board[i][j] = null;
          }
        }
      }

      return best;
    }
    else {
      let best = 1000;

      for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
          if(this.board[i][j] === null) {
            this.board[i][j] = this.opponent;
            best = Math.min(best, this.minimax(depth + 1, !isMax));
            this.board[i][j] = null;
          }
        }
      }

      return best;
    }
  }

  findBestMove() {
    let bestVal = -1000;
    let bestMove: Move = new Move();

    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if(this.board[i][j] === null) {
          this.board[i][j] = this.player;
          let moveVal = this.minimax(0, false);
          this.board[i][j] = null;

          if(moveVal > bestVal) {
            bestMove.set(i, j);
            bestVal = moveVal;
          }
        }
      }
    }

    return bestMove.get();
  }
}
