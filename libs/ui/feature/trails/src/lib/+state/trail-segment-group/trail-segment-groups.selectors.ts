import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TRAIL_SEGMENT_GROUPS_FEATURE_KEY,
  TrailSegmentGroupsState,
  trailSegmentGroupsAdapter,
} from './trail-segment-groups.reducer';

// Lookup the 'TrailSegmentGroups' feature state managed by NgRx
export const selectTrailSegmentGroupsState = createFeatureSelector<TrailSegmentGroupsState>(
  TRAIL_SEGMENT_GROUPS_FEATURE_KEY
);

const { selectAll, selectEntities } = trailSegmentGroupsAdapter.getSelectors();

export const selectTrailSegmentGroupsLoaded = createSelector(
  selectTrailSegmentGroupsState,
  (state: TrailSegmentGroupsState) => state.loaded
);

export const selectTrailSegmentGroupsError = createSelector(
  selectTrailSegmentGroupsState,
  (state: TrailSegmentGroupsState) => state.error
);

export const selectAllTrailSegmentGroups = createSelector(
  selectTrailSegmentGroupsState,
  (state: TrailSegmentGroupsState) => selectAll(state)
);

export const selectTrailSegmentGroupsEntities = createSelector(
  selectTrailSegmentGroupsState,
  (state: TrailSegmentGroupsState) => selectEntities(state)
);

export const selectSelectedTrailSegmentGroupId = createSelector(
  selectTrailSegmentGroupsState,
  (state: TrailSegmentGroupsState) => state.selectedId
);

export const selectSelectedTrailSegmentGroup = createSelector(selectTrailSegmentGroupsEntities, selectSelectedTrailSegmentGroupId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);
