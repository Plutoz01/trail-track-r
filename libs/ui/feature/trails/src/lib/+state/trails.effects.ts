import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as TrailsActions from './trails.actions';
import * as TrailsFeature from './trails.reducer';

import { switchMap, catchError, of } from 'rxjs';

@Injectable()
export class TrailsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrailsActions.initTrails),
      switchMap(() => of(TrailsActions.loadTrailsSuccess({ trails: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(TrailsActions.loadTrailsFailure({ error }));
      })
    )
  );
}
