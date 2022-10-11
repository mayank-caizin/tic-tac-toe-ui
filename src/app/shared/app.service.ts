import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Player, PlayerForAuthentication, PlayerForRegister } from '../models/player';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _playerSubject: BehaviorSubject<Player>;
  public player: Observable<Player>;

  constructor(private http: HttpClient) {
    this._playerSubject = new BehaviorSubject<Player>(JSON.parse(localStorage.getItem('player')));
    this.player = this._playerSubject.asObservable();
  }

  public get playerValue(): Player {
    return this._playerSubject.value;
  }

  login(playerForAuthentication: PlayerForAuthentication) {
    console.log(playerForAuthentication);
    return this.http.post<Player>(`${environment.apiUrl}/api/players/authenticate`, playerForAuthentication)
    .subscribe(player => {
      // store player details local storage to keep user logged in between page refreshes
      localStorage.setItem('player', JSON.stringify(player));
      this._playerSubject.next(player);
    });
  }

  logout() {
    // remove player from local storage and set current user to null
    console.log('logging out...');
    localStorage.removeItem('player');
    this._playerSubject.next(null);
  }

  register(playerForRegister: PlayerForRegister) {
    console.log(playerForRegister);
    return this.http.post(`${environment.apiUrl}/api/players`, playerForRegister).subscribe();
  }
}
