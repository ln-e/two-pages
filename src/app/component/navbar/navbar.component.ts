import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  public user: firebase.User;

  constructor(
    private afAuth: AngularFireAuth,
  ) { }

  public ngOnInit() {
    this.afAuth.authState
      .subscribe((user) => {
        this.user = user;
      });
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
