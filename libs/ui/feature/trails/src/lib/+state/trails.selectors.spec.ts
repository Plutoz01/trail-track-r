import { TrailDto } from '@trail-track-r/api-contract/trail';
import { trailsAdapter, TrailsPartialState, initialTrailsState } from './trails.reducer';
import * as TrailsSelectors from './trails.selectors';
import { createTrailDto } from './trail-dto.spec';

describe('Trails Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTrailsId = (it: TrailDto) => it.id;

  let state: TrailsPartialState;

  beforeEach(() => {
    state = {
      trails: trailsAdapter.setAll(
        [
          createTrailDto('TRAIL-AAA'),
          createTrailDto('TRAIL-BBB'),
          createTrailDto('TRAIL-CCC')
        ],
        {
          ...initialTrailsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Trails Selectors', () => {
    it('selectAllTrails() should return the list of Trails', () => {
      const results = TrailsSelectors.selectAllTrails(state);
      const selId = getTrailsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('TRAIL-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = TrailsSelectors.selectEntity(state) as TrailDto;
      const selId = getTrailsId(result);

      expect(selId).toBe('TRAIL-BBB');
    });

    it('selectTrailsLoaded() should return the current "loaded" status', () => {
      const result = TrailsSelectors.selectTrailsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectTrailsError() should return the current "error" state', () => {
      const result = TrailsSelectors.selectTrailsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
