import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as TrailSegmentGroupsActions from './trail-segment-groups.actions';
import { TrailSegmentGroupsEffects } from './trail-segment-groups.effects';
import { TrailSegmentGroupsFacade } from './trail-segment-groups.facade';
import {
  TRAIL_SEGMENT_GROUPS_FEATURE_KEY,
  TrailSegmentGroupsState,
  initialTrailSegmentGroupsState,
  trailSegmentGroupsReducer,
} from './trail-segment-groups.reducer';
import * as TrailSegmentGroupsSelectors from './trail-segment-groups.selectors';
import { createTrailSegmentGroupDto } from './trail-segment-group-dto.spec';

interface TestSchema {
  trailSegmentGroups: TrailSegmentGroupsState;
}

describe('TrailSegmentGroupsFacade', () => {
  let facade: TrailSegmentGroupsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TRAIL_SEGMENT_GROUPS_FEATURE_KEY, trailSegmentGroupsReducer),
          EffectsModule.forFeature([TrailSegmentGroupsEffects]),
        ],
        providers: [TrailSegmentGroupsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(TrailSegmentGroupsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allTrailSegmentGroups$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allTrailSegmentGroups$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadTrailSegmentGroupsSuccess` to manually update list
     */
    it('allTrailSegmentGroups$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allTrailSegmentGroups$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        TrailSegmentGroupsActions.loadTrailSegmentGroupsSuccess({
          trailSegmentGroups: [
            createTrailSegmentGroupDto('AAA'),
            createTrailSegmentGroupDto('BBB')
          ],
        })
      );

      list = await readFirst(facade.allTrailSegmentGroups$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
