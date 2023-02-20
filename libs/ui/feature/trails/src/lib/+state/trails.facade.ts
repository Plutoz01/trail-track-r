import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as TrailsActions from './trails.actions';
import * as TrailsFeature from './trails.reducer';
import * as TrailsSelectors from './trails.selectors';

@Injectable()
export class TrailsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(TrailsSelectors.selectTrailsLoaded));
  allTrails$ = this.store.pipe(select(TrailsSelectors.selectAllTrails));
  selectedTrails$ = this.store.pipe(select(TrailsSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(TrailsActions.initTrails());
  }
}
