import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Player } from '../models/player';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _playerSubject: BehaviorSubject<Player>;
  public player: Observable<Player>;

  constructor(private router: Router, private http: HttpClient) {
    this._playerSubject = new BehaviorSubject<Player>(JSON.parse(localStorage.getItem('player')));
    this.player = this._playerSubject.asObservable();
  }

  public get playerValue(): Player {
    return this._playerSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<Player>(`${environment.apiUrl}/api/players/authenticate`, { email, password })
            .pipe(map(player => {
                // store player details local storage to keep user logged in between page refreshes
                localStorage.setItem('player', JSON.stringify(player));
                this._playerSubject.next(player);
                return player;
            }));
  }

  logout() {
    // remove player from local storage and set current user to null
    localStorage.removeItem('player');
    this._playerSubject.next(null);
  }

  register(player: Player) {
    return this.http.post(`${environment.apiUrl}/players`, player);
  }
}
