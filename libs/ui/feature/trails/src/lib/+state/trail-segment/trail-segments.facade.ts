import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as TrailSegmentsActions from './trail-segments.actions';
import * as TrailSegmentsFeature from './trail-segments.reducer';
import * as TrailSegmentsSelectors from './trail-segments.selectors';

@Injectable()
export class TrailSegmentsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(TrailSegmentsSelectors.selectTrailSegmentsLoaded));
  allTrailSegments$ = this.store.pipe(select(TrailSegmentsSelectors.selectAllTrailSegments));
  selectedTrailSegment$ = this.store.pipe(select(TrailSegmentsSelectors.selectSelectedTrailSegment));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init(): void {
    this.store.dispatch(TrailSegmentsActions.initTrailSegments());
  }
}
