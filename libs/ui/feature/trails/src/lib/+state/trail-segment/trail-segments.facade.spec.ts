import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as TrailSegmentsActions from './trail-segments.actions';
import { TrailSegmentsEffects } from './trail-segments.effects';
import { TrailSegmentsFacade } from './trail-segments.facade';
import {
  TRAIL_SEGMENTS_FEATURE_KEY,
  TrailSegmentsState,
  initialTrailSegmentsState,
  trailSegmentsReducer
} from './trail-segments.reducer';
import * as TrailSegmentsSelectors from './trail-segments.selectors';
import { TrailSegmentDto } from '@trail-track-r/api-contract/trail';
import { createTrailSegmentDto } from './trail-segment-dto.spec';

interface TestSchema {
  trailSegments: TrailSegmentsState;
}

describe('TrailSegmentsFacade', () => {
  let facade: TrailSegmentsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TRAIL_SEGMENTS_FEATURE_KEY, trailSegmentsReducer),
          EffectsModule.forFeature([TrailSegmentsEffects])
        ],
        providers: [TrailSegmentsFacade]
      })
      class CustomFeatureModule {
      }

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {
      }

      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(TrailSegmentsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allTrailSegments$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allTrailSegments$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadTrailSegmentsSuccess` to manually update list
     */
    it('allTrailSegments$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allTrailSegments$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        TrailSegmentsActions.loadTrailSegmentsSuccess({
          trailSegments: [
            createTrailSegmentDto('AAA', 'Group 1'),
            createTrailSegmentDto('BBB', 'Group 1')
          ]
        })
      );

      list = await readFirst(facade.allTrailSegments$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
