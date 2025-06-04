import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <h2>Register</h2>
    <form (submit)="register()">
      <label>Username <input [(ngModel)]="username" name="username"></label>
      <label>Password <input type="password" [(ngModel)]="password" name="password"></label>
      <button type="submit">Register</button>
    </form>
    <p *ngIf="message">{{message}}</p>
  `
})
export class RegisterComponent {
  username = '';
  password = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post('/api/register', { username: this.username, password: this.password })
      .subscribe({
        next: () => {
          this.message = 'Registration complete';
          this.router.navigate(['/login']);
        },
        error: () => this.message = 'Registration failed'
      });
  }
}
