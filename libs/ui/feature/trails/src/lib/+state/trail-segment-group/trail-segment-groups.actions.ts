import { createAction, props } from '@ngrx/store';
import { TrailSegmentGroupDto } from '@trail-track-r/api-contract/trail';

export const initTrailSegmentGroups = createAction('[TrailSegmentGroups Page] Init');

export const loadTrailSegmentGroupsSuccess = createAction(
  '[TrailSegmentGroups/API] Load TrailSegmentGroups Success',
  props<{ trailSegmentGroups: TrailSegmentGroupDto[] }>()
);

export const loadTrailSegmentGroupsFailure = createAction(
  '[TrailSegmentGroups/API] Load TrailSegmentGroups Failure',
  props<{ error: unknown }>()
);
