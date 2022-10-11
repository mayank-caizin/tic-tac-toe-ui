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
  allMyGames: Game[];

  gameMode = 1;

  constructor(private _gameService: GameService) {
    this._gameService.currentGame.subscribe(g => this.currentGame = g);
    this._gameService.allGames.subscribe(games => this.allMyGames = games);
  }

  ngOnInit(): void {
  }

  startNewGame() {
    console.log('Play Against Computer', this.gameMode);
  }

  logOut() {
    this.logout.emit('Log me Out');
  }
}
