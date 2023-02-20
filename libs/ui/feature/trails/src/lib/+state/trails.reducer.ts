import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { TrailDto } from '@trail-track-r/api-contract/trail';

import * as TrailsActions from './trails.actions';

export const TRAILS_FEATURE_KEY = 'trails';

export interface TrailsState extends EntityState<TrailDto> {
  selectedId?: string | number; // which Trails record has been selected
  loaded: boolean; // has the Trails list been loaded
  error?: string | null; // last known error (if any)
}

export interface TrailsPartialState {
  readonly [TRAILS_FEATURE_KEY]: TrailsState;
}

export const trailsAdapter: EntityAdapter<TrailDto> = createEntityAdapter<TrailDto>();

export const initialTrailsState: TrailsState = trailsAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const reducer = createReducer(
  initialTrailsState,
  on(TrailsActions.initTrails, (state) => ({ ...state, loaded: false, error: null })),
  on(TrailsActions.loadTrailsSuccess, (state, { trails }) => trailsAdapter.setAll(trails, { ...state, loaded: true })),
  on(TrailsActions.loadTrailsFailure, (state, { error }) => ({ ...state, error }))
);

export function trailsReducer(state: TrailsState | undefined, action: Action) {
  return reducer(state, action);
}
