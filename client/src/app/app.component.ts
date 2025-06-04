import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/login">Login</a> |
      <a routerLink="/register">Register</a> |
      <a routerLink="/profile">Profile</a> |
      <a routerLink="/swipe">Swipe</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
