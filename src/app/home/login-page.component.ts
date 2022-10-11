import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerForAuthentication } from '../models/player';

@Component({
  selector: 'ttt-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  email: string;
  password: string;
  @Output() submitInfo: EventEmitter<PlayerForAuthentication> = new EventEmitter<PlayerForAuthentication>();

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    this.submitInfo.emit({
      email: this.email,
      password: this.password
    });
  }

}
