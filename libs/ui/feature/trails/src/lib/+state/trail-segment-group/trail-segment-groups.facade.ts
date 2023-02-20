import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as TrailSegmentGroupsActions from './trail-segment-groups.actions';
import * as TrailSegmentGroupsFeature from './trail-segment-groups.reducer';
import * as TrailSegmentGroupsSelectors from './trail-segment-groups.selectors';

@Injectable()
export class TrailSegmentGroupsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(TrailSegmentGroupsSelectors.selectTrailSegmentGroupsLoaded));
  allTrailSegmentGroups$ = this.store.pipe(select(TrailSegmentGroupsSelectors.selectAllTrailSegmentGroups));
  selectedTrailSegmentGroup$ = this.store.pipe(select(TrailSegmentGroupsSelectors.selectSelectedTrailSegmentGroup));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init(): void {
    this.store.dispatch(TrailSegmentGroupsActions.initTrailSegmentGroups());
  }
}
