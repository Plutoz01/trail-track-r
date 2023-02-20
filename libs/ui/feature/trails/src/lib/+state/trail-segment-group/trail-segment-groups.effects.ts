import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as TrailSegmentGroupsActions from './trail-segment-groups.actions';
import * as TrailSegmentGroupsFeature from './trail-segment-groups.reducer';


@Injectable()
export class TrailSegmentGroupsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrailSegmentGroupsActions.initTrailSegmentGroups),
      switchMap(() => of(TrailSegmentGroupsActions.loadTrailSegmentGroupsSuccess({ trailSegmentGroups: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(TrailSegmentGroupsActions.loadTrailSegmentGroupsFailure({ error }));
      })
    )
  );
}
