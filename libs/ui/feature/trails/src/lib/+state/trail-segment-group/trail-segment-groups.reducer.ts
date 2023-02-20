import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as TrailSegmentGroupsActions from './trail-segment-groups.actions';
import { TrailSegmentGroupDto } from '@trail-track-r/api-contract/trail';

export const TRAIL_SEGMENT_GROUPS_FEATURE_KEY = 'trailSegmentGroups';

export interface TrailSegmentGroupsState extends EntityState<TrailSegmentGroupDto> {
  selectedId?: string | number; // which TrailSegmentGroups record has been selected
  loaded: boolean; // has the TrailSegmentGroups list been loaded
  error?: unknown; // last known error (if any)
}

export interface TrailSegmentGroupsPartialState {
  readonly [TRAIL_SEGMENT_GROUPS_FEATURE_KEY]: TrailSegmentGroupsState;
}

export const trailSegmentGroupsAdapter: EntityAdapter<TrailSegmentGroupDto> =
  createEntityAdapter<TrailSegmentGroupDto>();

export const initialTrailSegmentGroupsState: TrailSegmentGroupsState = trailSegmentGroupsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialTrailSegmentGroupsState,
  on(TrailSegmentGroupsActions.initTrailSegmentGroups, (state) => ({ ...state, loaded: false, error: null })),
  on(TrailSegmentGroupsActions.loadTrailSegmentGroupsSuccess, (state, { trailSegmentGroups }) =>
    trailSegmentGroupsAdapter.setAll(trailSegmentGroups, { ...state, loaded: true })
  ),
  on(TrailSegmentGroupsActions.loadTrailSegmentGroupsFailure, (state, { error }) => ({ ...state, error }))
);

export function trailSegmentGroupsReducer(state: TrailSegmentGroupsState | undefined, action: Action) {
  return reducer(state, action);
}
