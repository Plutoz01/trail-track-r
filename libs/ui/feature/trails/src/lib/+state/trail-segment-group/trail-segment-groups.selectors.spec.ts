import {
  trailSegmentGroupsAdapter,
  TrailSegmentGroupsPartialState,
  initialTrailSegmentGroupsState,
} from './trail-segment-groups.reducer';
import * as TrailSegmentGroupsSelectors from './trail-segment-groups.selectors';
import { createTrailSegmentGroupDto } from './trail-segment-group-dto.spec';
import { TrailSegmentGroupDto } from '@trail-track-r/api-contract/trail';

describe('TrailSegmentGroups Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTrailSegmentGroupsId = (it: TrailSegmentGroupDto) => it.id;
  let state: TrailSegmentGroupsPartialState;

  beforeEach(() => {
    state = {
      trailSegmentGroups: trailSegmentGroupsAdapter.setAll(
        [
          createTrailSegmentGroupDto('PRODUCT-AAA'),
          createTrailSegmentGroupDto('PRODUCT-BBB'),
          createTrailSegmentGroupDto('PRODUCT-CCC'),
        ],
        {
          ...initialTrailSegmentGroupsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('TrailSegmentGroups Selectors', () => {
    it('selectAllTrailSegmentGroups() should return the list of TrailSegmentGroups', () => {
      const results = TrailSegmentGroupsSelectors.selectAllTrailSegmentGroups(state);
      const selId = getTrailSegmentGroupsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = TrailSegmentGroupsSelectors.selectSelectedTrailSegmentGroup(state) as TrailSegmentGroupDto;
      const selId = getTrailSegmentGroupsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectTrailSegmentGroupsLoaded() should return the current "loaded" status', () => {
      const result = TrailSegmentGroupsSelectors.selectTrailSegmentGroupsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectTrailSegmentGroupsError() should return the current "error" state', () => {
      const result = TrailSegmentGroupsSelectors.selectTrailSegmentGroupsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
