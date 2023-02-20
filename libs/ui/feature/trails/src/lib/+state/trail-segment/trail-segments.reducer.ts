import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as TrailSegmentsActions from './trail-segments.actions';
import { TrailSegmentDto } from '@trail-track-r/api-contract/trail';

export const TRAIL_SEGMENTS_FEATURE_KEY = 'trailSegments';

export interface TrailSegmentsState extends EntityState<TrailSegmentDto> {
  selectedId?: string | number; // which TrailSegments record has been selected
  loaded: boolean; // has the TrailSegments list been loaded
  error?: unknown; // last known error (if any)
}

export interface TrailSegmentsPartialState {
  readonly [TRAIL_SEGMENTS_FEATURE_KEY]: TrailSegmentsState;
}

export const trailSegmentsAdapter: EntityAdapter<TrailSegmentDto> = createEntityAdapter<TrailSegmentDto>();

export const initialTrailSegmentsState: TrailSegmentsState = trailSegmentsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialTrailSegmentsState,
  on(TrailSegmentsActions.initTrailSegments, (state) => ({ ...state, loaded: false, error: null })),
  on(TrailSegmentsActions.loadTrailSegmentsSuccess, (state, { trailSegments }) =>
    trailSegmentsAdapter.setAll(trailSegments, { ...state, loaded: true })
  ),
  on(TrailSegmentsActions.loadTrailSegmentsFailure, (state, { error }) => ({ ...state, error }))
);

export function trailSegmentsReducer(state: TrailSegmentsState | undefined, action: Action) {
  return reducer(state, action);
}
