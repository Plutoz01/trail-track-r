import { Action } from '@ngrx/store';

import * as TrailSegmentGroupsActions from './trail-segment-groups.actions';
import {
  TrailSegmentGroupsState,
  initialTrailSegmentGroupsState,
  trailSegmentGroupsReducer,
} from './trail-segment-groups.reducer';
import { createTrailSegmentGroupDto } from './trail-segment-group-dto.spec';

describe('TrailSegmentGroups Reducer', () => {
  describe('valid TrailSegmentGroups actions', () => {
    it('loadTrailSegmentGroupsSuccess should return the list of known TrailSegmentGroups', () => {
      const trailSegmentGroups = [
        createTrailSegmentGroupDto('PRODUCT-AAA'),
        createTrailSegmentGroupDto('PRODUCT-zzz'),
      ];
      const action = TrailSegmentGroupsActions.loadTrailSegmentGroupsSuccess({ trailSegmentGroups });

      const result: TrailSegmentGroupsState = trailSegmentGroupsReducer(initialTrailSegmentGroupsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = trailSegmentGroupsReducer(initialTrailSegmentGroupsState, action);

      expect(result).toBe(initialTrailSegmentGroupsState);
    });
  });
});
