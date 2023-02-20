import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRAILS_FEATURE_KEY, TrailsState, trailsAdapter } from './trails.reducer';

// Lookup the 'Trails' feature state managed by NgRx
export const selectTrailsState = createFeatureSelector<TrailsState>(TRAILS_FEATURE_KEY);

const { selectAll, selectEntities } = trailsAdapter.getSelectors();

export const selectTrailsLoaded = createSelector(selectTrailsState, (state: TrailsState) => state.loaded);

export const selectTrailsError = createSelector(selectTrailsState, (state: TrailsState) => state.error);

export const selectAllTrails = createSelector(selectTrailsState, (state: TrailsState) => selectAll(state));

export const selectTrailsEntities = createSelector(selectTrailsState, (state: TrailsState) => selectEntities(state));

export const selectSelectedTrailId = createSelector(selectTrailsState, (state: TrailsState) => state.selectedId);

export const selectSelectedTrail = createSelector(selectTrailsEntities, selectSelectedTrailId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);
