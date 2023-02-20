import { Action } from '@ngrx/store';

import * as TrailSegmentsActions from './trail-segments.actions';
import { TrailSegmentsState, initialTrailSegmentsState, trailSegmentsReducer } from './trail-segments.reducer';
import { createTrailSegmentDto } from './trail-segment-dto.spec';

describe('TrailSegments Reducer', () => {
  describe('valid TrailSegments actions', () => {
    it('loadTrailSegmentsSuccess should return the list of known TrailSegments', () => {
      const trailSegments = [
        createTrailSegmentDto('PRODUCT-AAA'),
        createTrailSegmentDto('PRODUCT-zzz')
      ];
      const action = TrailSegmentsActions.loadTrailSegmentsSuccess({ trailSegments });

      const result: TrailSegmentsState = trailSegmentsReducer(initialTrailSegmentsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = trailSegmentsReducer(initialTrailSegmentsState, action);

      expect(result).toBe(initialTrailSegmentsState);
    });
  });
});
