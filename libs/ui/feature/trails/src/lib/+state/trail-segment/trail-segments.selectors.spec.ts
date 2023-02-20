import { trailSegmentsAdapter, TrailSegmentsPartialState, initialTrailSegmentsState } from './trail-segments.reducer';
import * as TrailSegmentsSelectors from './trail-segments.selectors';
import { TrailSegmentDto } from '@trail-track-r/api-contract/trail';
import { createTrailSegmentDto } from './trail-segment-dto.spec';

describe('TrailSegments Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTrailSegmentsId = (it: TrailSegmentDto) => it.id;

  let state: TrailSegmentsPartialState;

  beforeEach(() => {
    state = {
      trailSegments: trailSegmentsAdapter.setAll(
        [
          createTrailSegmentDto('PRODUCT-AAA'),
          createTrailSegmentDto('PRODUCT-BBB'),
          createTrailSegmentDto('PRODUCT-CCC'),
        ],
        {
          ...initialTrailSegmentsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('TrailSegments Selectors', () => {
    it('selectAllTrailSegments() should return the list of TrailSegments', () => {
      const results = TrailSegmentsSelectors.selectAllTrailSegments(state);
      const selId = getTrailSegmentsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = TrailSegmentsSelectors.selectSelectedTrailSegment(state) as TrailSegmentDto;
      const selId = getTrailSegmentsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectTrailSegmentsLoaded() should return the current "loaded" status', () => {
      const result = TrailSegmentsSelectors.selectTrailSegmentsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectTrailSegmentsError() should return the current "error" state', () => {
      const result = TrailSegmentsSelectors.selectTrailSegmentsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
