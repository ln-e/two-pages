import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class NotAuthGuard implements CanActivate {
  public constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.afAuth.authState.pipe(
      take(1),
      map((user) => {
        if (user) {
          this.router.navigate([this.authService.redirectUrl]);

          return false;
        }

        return true;
      }),
    );
  }
}
