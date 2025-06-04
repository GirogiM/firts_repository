import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <h2>Login</h2>
    <form (submit)="login()">
      <label>Username <input [(ngModel)]="username" name="username"></label>
      <label>Password <input type="password" [(ngModel)]="password" name="password"></label>
      <button type="submit">Login</button>
    </form>
    <p *ngIf="error">{{error}}</p>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('/api/login', { username: this.username, password: this.password })
      .subscribe({
        next: () => {
          localStorage.setItem('username', this.username);
          this.router.navigate(['/swipe']);
        },
        error: () => this.error = 'Invalid credentials'
      });
  }
}
