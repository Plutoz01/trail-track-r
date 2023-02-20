import { createAction, props } from '@ngrx/store';
import { TrailSegmentDto } from '@trail-track-r/api-contract/trail';

export const initTrailSegments = createAction('[TrailSegments Page] Init');

export const loadTrailSegmentsSuccess = createAction(
  '[TrailSegments/API] Load TrailSegments Success',
  props<{ trailSegments: TrailSegmentDto[] }>()
);

export const loadTrailSegmentsFailure = createAction(
  '[TrailSegments/API] Load TrailSegments Failure',
  props<{ error: unknown }>()
);
