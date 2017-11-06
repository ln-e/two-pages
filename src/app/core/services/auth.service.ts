import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  public redirectUrl?: string = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.afAuth.authState
      .subscribe((user) => {
        if (!user) {
          this.router.navigate(['/login']);
        }
        if (user) {
          this.router.navigate([this.redirectUrl || '/']);
        }
      });
  }
}
