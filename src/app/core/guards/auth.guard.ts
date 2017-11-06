import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let url: string = state.url;

    return this.afAuth.authState.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        }

        this.authService.redirectUrl = url;

        // Navigate to the login pages with extras
        this.router.navigate(['/login']);
        return false;
      }),
    );
  }
}
