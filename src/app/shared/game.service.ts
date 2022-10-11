import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game';

@Injectable()
export class GameService {
  private _currentGameSubject: BehaviorSubject<Game>;
  public currentGame: Observable<Game>;

  private _allGamesSubject: BehaviorSubject<Game[]>;
  public allGames: Observable<Game[]>;

  constructor(private http: HttpClient) {
    this._currentGameSubject = new BehaviorSubject<Game>(null);
    this.currentGame = this._currentGameSubject.asObservable();

    this._allGamesSubject = new BehaviorSubject<Game[]>([]);
    this.allGames = this._allGamesSubject.asObservable();
  }

  getMyGames(playerId: string) {
    return this.http.get<Game[]>(`${environment.apiUrl}/api/players/${playerId}/games`).subscribe(games => {
      this._allGamesSubject.next(games);
    });
  }

  createNewGame(playerId: string, gameMode: number) {
    return this.http.post<Game>(`${environment.apiUrl}/api/players/${playerId}/games?gameMode=${gameMode}`, {}).subscribe(game => {
      this._currentGameSubject.next(game);
    });
  }
}
