import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerForRegister } from '../models/player';

@Component({
  selector: 'ttt-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  @Output() submitInfo: EventEmitter<PlayerForRegister> = new EventEmitter<PlayerForRegister>();

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    this.submitInfo.emit({
      name: this.name,
      email: this.email,
      password: this.password
    });
  }
}
