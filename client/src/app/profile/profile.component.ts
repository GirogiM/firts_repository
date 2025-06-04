import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  template: `
    <h2>Profile</h2>
    <div *ngIf="profile">
      <p><b>Username:</b> {{profile.username}}</p>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const username = localStorage.getItem('username');
    if (username) {
      this.http.get(`/api/profile/${username}`).subscribe(data => this.profile = data);
    }
  }
}
