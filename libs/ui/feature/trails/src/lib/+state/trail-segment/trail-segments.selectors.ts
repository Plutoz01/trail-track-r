import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRAIL_SEGMENTS_FEATURE_KEY, TrailSegmentsState, trailSegmentsAdapter } from './trail-segments.reducer';

// Lookup the 'TrailSegments' feature state managed by NgRx
export const selectTrailSegmentsState = createFeatureSelector<TrailSegmentsState>(TRAIL_SEGMENTS_FEATURE_KEY);

const { selectAll, selectEntities } = trailSegmentsAdapter.getSelectors();

export const selectTrailSegmentsLoaded = createSelector(
  selectTrailSegmentsState,
  (state: TrailSegmentsState) => state.loaded
);

export const selectTrailSegmentsError = createSelector(
  selectTrailSegmentsState,
  (state: TrailSegmentsState) => state.error
);

export const selectAllTrailSegments = createSelector(selectTrailSegmentsState, (state: TrailSegmentsState) =>
  selectAll(state)
);

export const selectTrailSegmentsEntities = createSelector(selectTrailSegmentsState, (state: TrailSegmentsState) =>
  selectEntities(state)
);

export const selectSelectedTrailSegmentId = createSelector(
  selectTrailSegmentsState,
  (state: TrailSegmentsState) => state.selectedId
);

export const selectSelectedTrailSegment = createSelector(selectTrailSegmentsEntities, selectSelectedTrailSegmentId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);
