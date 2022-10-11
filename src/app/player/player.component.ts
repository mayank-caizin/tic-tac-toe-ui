import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'ttt-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [ GameService ]
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;
  @Output() logout: EventEmitter<any> = new EventEmitter();
  currentGame: Game;
  gameBoardActive: boolean;
  allMyGames: Game[];

  gameMode = 1;

  constructor(private _gameService: GameService) {
    this._gameService.currentGame.subscribe(g => this.currentGame = g);
    this._gameService.allGames.subscribe(games => this.allMyGames = games);
  }

  ngOnInit(): void {
    this._gameService.getMyGames(this.player.id);
  }

  startNewGame() {
    this._gameService.createNewGame(this.player.id, this.gameMode);
    this.gameBoardActive = true;
  }

  async showMyGames() {
    await this._gameService.getMyGames(this.player.id);
    this.currentGame = null;
    this.gameBoardActive = false;
  }

  logOut() {
    this.logout.emit('Log me Out');
  }

  async deleteGame(gameId: string) {
    await this._gameService.deleteGame(this.player.id, gameId);
    this.allMyGames = this.allMyGames.filter(game => game.id != gameId);
  }
}
