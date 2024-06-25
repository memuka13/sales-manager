import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  initManagers,
  initManagersApiActions,
  updateManager,
  updateManagerApiActions,
} from './managers.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { ManagersService } from 'src/app/services/managers.service';

@Injectable({
  providedIn: 'root',
})
export class ManagersPageEffect {
  private readonly actions$ = inject(Actions);
  private readonly managersService = inject(ManagersService);
  loadManagers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initManagers),
      switchMap(() => this.managersService.getManagers()),
      map((managers) =>
        initManagersApiActions.loadManagersSuccess({
          managers,
        })
      ),
      catchError((error: string) => {
        console.log('error', error);
        return of(initManagersApiActions.loadManagersFailure({ error }));
      })
    );
  });

  updateManager$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateManager),
      switchMap((action) => this.managersService.updateManager(action.manager)),
      map((manager) =>
        updateManagerApiActions.updateManagersSuccess({
          manager,
        })
      ),
      catchError((error: string) => {
        console.log('error', error);
        return of(updateManagerApiActions.updateManagersFailure({ error }));
      })
    );
  });
}
