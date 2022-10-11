import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ttt-square',
  template: `
    <div
      class="game-square"
      (click)="makeMove()"
    >
      <p class="text-grey-darker"> {{ square.state}} </p>
    </div>
   `,
  styles: [`
    .game-square {
      width: 100px;
      height: 100px;
      margin: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: 1px solid black;
    }

    p {
      display: inline;
      margin: 0px;
      overflow: hidden;
      font-size: 3rem;
    }`
  ]
})
export class SquareComponent implements OnInit {
  @Input() square;
  @Input() playerTurn;
  @Output() move: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  makeMove() {
    if(this.square.state) return;

    this.move.emit(this.square.id);
  }

}
