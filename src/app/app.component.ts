import { Component } from '@angular/core';
import { Player, PlayerForAuthentication, PlayerForRegister } from './models/player';
import { AppService } from './shared/app.service';
@Component({
  selector: 'ttt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tic Tac Toe';
  player: Player;
  loginSelected = true;

  constructor(private _appService: AppService) {
    this._appService.player.subscribe(x => this.player = x);
  }

  selectLogin() {
    this.loginSelected = true;
  }

  selectSignup() {
    this.loginSelected = false;
  }

  logInPlayer(player: PlayerForAuthentication) {
    this._appService.login(player);
  }

  signUpPlayer(player: PlayerForRegister) {
    this._appService.register(player);
    this.loginSelected = true;
  }

  logOutPlayer(evt) {
    this._appService.logout();
  }
}
