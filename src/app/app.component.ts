import { Component } from '@angular/core';
import { Player } from './models/player';
import { AppService } from './shared/app.service';
@Component({
  selector: 'ttt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tic Tac Toe';
  player: Player;

  constructor(private _appService: AppService) {
    this._appService.player.subscribe(x => this.player = x);
  }
}
