import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import * as TrailsActions from './trails.actions';
import * as TrailsFeature from './trails.reducer';
import { TrailApiService } from '../../http/trail-api.service';


@Injectable()
export class TrailsEffects {
  constructor(private readonly actions$: Actions,
              private readonly trailApiService: TrailApiService) {
  }

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrailsActions.initTrails),
      switchMap(() => this.trailApiService.getAll$()),
      map(trails => TrailsActions.loadTrailsSuccess({ trails: [] })),
      catchError((error) => {
        console.error('Error', error);
        return of(TrailsActions.loadTrailsFailure({ error }));
      })
    )
  );
}
