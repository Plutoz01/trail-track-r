import { Action } from '@ngrx/store';

import * as TrailsActions from './trails.actions';
import { TrailsState, initialTrailsState, trailsReducer } from './trails.reducer';
import { createTrailDto } from './trail-dto.spec';

describe('Trails Reducer', () => {
  describe('valid Trails actions', () => {
    it('loadTrailsSuccess should return the list of known Trails', () => {
      const trails = [
        createTrailDto('TRAIL-AAA'),
        createTrailDto('TRAIL-zzz')
      ];
      const action = TrailsActions.loadTrailsSuccess({ trails });

      const result: TrailsState = trailsReducer(initialTrailsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = trailsReducer(initialTrailsState, action);

      expect(result).toBe(initialTrailsState);
    });
  });
});
