import { TrailsEntity } from './trails.models';
import { trailsAdapter, TrailsPartialState, initialTrailsState } from './trails.reducer';
import * as TrailsSelectors from './trails.selectors';

describe('Trails Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTrailsId = (it: TrailsEntity) => it.id;
  const createTrailsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TrailsEntity);

  let state: TrailsPartialState;

  beforeEach(() => {
    state = {
      trails: trailsAdapter.setAll(
        [createTrailsEntity('PRODUCT-AAA'), createTrailsEntity('PRODUCT-BBB'), createTrailsEntity('PRODUCT-CCC')],
        {
          ...initialTrailsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Trails Selectors', () => {
    it('selectAllTrails() should return the list of Trails', () => {
      const results = TrailsSelectors.selectAllTrails(state);
      const selId = getTrailsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = TrailsSelectors.selectEntity(state) as TrailsEntity;
      const selId = getTrailsId(result);

      expect(selId).toBe('PRODUCT-BBB');
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
