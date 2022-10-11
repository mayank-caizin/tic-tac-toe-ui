import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ttt-square',
  template: `
    <div
      class="game-square"
    >
      <p class="text-grey-darker"> {{ square.state}} </p>
    </div>
   `,
  styles: [`
    .game-square {
      height: 96%;
      text-align: center;
      line-height: 0.85;
      cursor: pointer;
    }

    p {
      display: inline;
      margin: 0px;
      font-size: 14rem;
      overflow: hidden;
    }

    .noClick {
      pointer-events: none;
    }`
  ]
})
export class SquareComponent implements OnInit {
  @Input() square;

  constructor() { }

  ngOnInit(): void {
  }

}
