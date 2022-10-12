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

  public bestMove: number = -1;

  constructor(private http: HttpClient) {
    this._currentGameSubject = new BehaviorSubject<Game>(null);
    this.currentGame = this._currentGameSubject.asObservable();

    this._allGamesSubject = new BehaviorSubject<Game[]>([]);
    this.allGames = this._allGamesSubject.asObservable();
  }

  async getMyGames(playerId: string) {
    await this.http.get<Game[]>(`${environment.apiUrl}/api/players/${playerId}/games`).subscribe(games => {
      this._allGamesSubject.next(games);
    });
  }

  async createNewGame(playerId: string, gameMode: number) {
    // this check to be removed after adding more game modes
    if(gameMode != 1) return;

    await this.http.post<Game>(`${environment.apiUrl}/api/players/${playerId}/games?gameMode=${gameMode}`, {}).subscribe(game => {
      this._currentGameSubject.next(game);
    });
  }

  async updateGame(playerId: string, gameId: string, game: Game) {
    await this.http.put(`${environment.apiUrl}/api/players/${playerId}/games/${gameId}`, game).subscribe();
  }

  async deleteGame(playerId: string, gameId: string) {
    await this.http.delete(`${environment.apiUrl}/api/players/${playerId}/games/${gameId}`)
    .subscribe();
  }

  // async makeMove(playerId: string, gameId: string, moveIndex) {
  //   await this.http.patch(`${environment.apiUrl}/api/players/${playerId}/games/${gameId}`, moveIndex).subscribe();
  // }

  // async getMove(playerId: string, gameId: string) {
  //   return await this.http.get<number>(`${environment.apiUrl}/api/players/${playerId}/games/${gameId}/move`).subscribe(index => {
  //     this.bestMove = index;
  //   });
  // }
}
