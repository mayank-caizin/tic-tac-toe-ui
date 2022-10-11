import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Player } from '../models/player';

@Component({
  selector: 'ttt-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;
  @Output() logout: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  logOut() {
    this.logout.emit('Log me Out');
  }
}
