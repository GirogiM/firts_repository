import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  username: string;
}

@Component({
  selector: 'app-swipe',
  template: `
    <h2>Swipe</h2>
    <div *ngIf="current">
      <p>{{current.username}}</p>
      <button (click)="like()">Like</button>
      <button (click)="dislike()">Dislike</button>
    </div>
    <h3>Matches</h3>
    <ul>
      <li *ngFor="let m of matches">{{m}}</li>
    </ul>
  `
})
export class SwipeComponent implements OnInit {
  users: User[] = [];
  current?: User;
  matches: string[] = [];
  me: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.me = localStorage.getItem('username') || '';
    this.loadUsers();
    this.loadMatches();
  }

  loadUsers() {
    this.http.get<User[]>('/api/users').subscribe(data => {
      this.users = data.filter(u => u.username !== this.me);
      this.next();
    });
  }

  loadMatches() {
    if (this.me) {
      this.http.get<string[]>(`/api/matches/${this.me}`).subscribe(data => this.matches = data);
    }
  }

  next() {
    this.current = this.users.pop();
  }

  like() {
    if (this.current) {
      this.swipe('right');
    }
  }

  dislike() {
    if (this.current) {
      this.swipe('left');
    }
  }

  swipe(direction: 'left' | 'right') {
    this.http.post('/api/swipe', {
      fromUser: this.me,
      toUser: this.current!.username,
      direction
    }).subscribe(() => {
      this.loadMatches();
      this.next();
    });
  }
}
