export interface Game {
  id: string,
  board: string,
  gameMode: number,
  isComplete: boolean,
  xTurn: boolean,
  xPlayerId: string,
  oPlayerId: string,
  result: string
}
