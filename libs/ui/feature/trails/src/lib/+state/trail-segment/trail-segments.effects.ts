import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';

import * as TrailSegmentsActions from './trail-segments.actions';
import * as TrailSegmentsFeature from './trail-segments.reducer';
import { TrailSegmentApiService } from '../../http/trail-segment-api.service';

@Injectable()
export class TrailSegmentsEffects {
  constructor(private readonly actions$: Actions,
              private readonly trailSegmentApi: TrailSegmentApiService) {
  }

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrailSegmentsActions.initTrailSegments),
      switchMap(() => this.trailSegmentApi.getAll$()),
      map(trailSegments => TrailSegmentsActions.loadTrailSegmentsSuccess({ trailSegments })),
      catchError((error) => {
        console.error('Error', error);
        return of(TrailSegmentsActions.loadTrailSegmentsFailure({ error }));
      })
    )
  );
}
