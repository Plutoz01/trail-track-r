import { Action } from '@ngrx/store';

import * as TrailsActions from './trails.actions';
import { TrailsEntity } from './trails.models';
import { TrailsState, initialTrailsState, trailsReducer } from './trails.reducer';

describe('Trails Reducer', () => {
  const createTrailsEntity = (id: string, name = ''): TrailsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Trails actions', () => {
    it('loadTrailsSuccess should return the list of known Trails', () => {
      const trails = [createTrailsEntity('PRODUCT-AAA'), createTrailsEntity('PRODUCT-zzz')];
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
