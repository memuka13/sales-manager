import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import { authActions, authApiActions } from './auth.action';
import { catchError, filter, from, map, of, pipe, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addManager } from '../managers/managers.action';
import { CurrentUser, FirebaseUser } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class AuthEffect {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loadUserState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.getUserState),
      switchMap(() => this.authService.getCurrentUser()),
      map((currentUser) => authApiActions.getUserStateSuccess({ currentUser })),
      catchError((error: string) => {
        console.log('error', error);
        return of(authApiActions.getUserStateFailure({ error }));
      })
    );
  });

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.registerUser),
      switchMap((action) =>
        from(
          this.authService.register(
            action.username,
            action.password,
            action.displayName
          )
        ).pipe(filter((user) => !!user))
      ),
      map((action) => {
        console.log(action);
        this.router.navigate(['./login']);
        this.store.dispatch(authActions.getUserState());
        if (action)
          this.store.dispatch(
            addManager({
              manager: {
                username: action.displayName.username,
                name: action.displayName.name,
                surname: action.displayName.surname,
                dateRegistered: action.displayName.dateRegistered,
                totalSales: '0',
              },
            })
          );
        return authApiActions.registerUserSuccess();
      }),
      catchError((error: string) => {
        console.log('error', error);
        this.router.navigate(['./register']);
        return of(authApiActions.registerUserFailure({ error }));
      })
    );
  });

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loginUser),
      switchMap((action) =>
        this.authService.logIn(action.username, action.password)
      ),
      filter((action) => !!action),
      map(() => {
        this.router.navigate(['./products']);
        return authApiActions.loginUserSuccess();
      }),
      catchError((error: string) => {
        console.log('error', error);
        this.router.navigate(['./login']);
        return of(authApiActions.loginUserFailure({ error }));
      })
    );
  });

  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.logoutUser),
      switchMap(() => this.authService.logout()),
      filter((boolean) => !!boolean),
      map(() => {
        this.router.navigate(['./login']);
        return authApiActions.logoutUserSuccess();
      }),
      catchError((error: string) => {
        console.log('error', error);
        return of(authApiActions.logoutUserFailure({ error }));
      })
    );
  });
}
