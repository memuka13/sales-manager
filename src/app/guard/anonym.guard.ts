import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthStateFacade } from 'src/store/auth/auth.facade';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AnonymGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.getCurrentUser().pipe(
      map((currentUser) => {
        if (currentUser) {
          this.router.navigate(['./products']);
          return false;
        }
        return true;
      })
    );
  }
}
