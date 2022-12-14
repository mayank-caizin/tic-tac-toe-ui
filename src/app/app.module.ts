import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './home/login-page.component';
import { SignupPageComponent } from './home/signup-page.component';
import { PlayerComponent } from './player/player.component';
import { BoardComponent } from './game/board.component';
import { SquareComponent } from './game/square.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    PlayerComponent,
    BoardComponent,
    SquareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
