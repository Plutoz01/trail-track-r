import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as TrailsActions from './trails.actions';
import { TrailsEffects } from './trails.effects';
import { TrailsFacade } from './trails.facade';
import { TrailsEntity } from './trails.models';
import { TRAILS_FEATURE_KEY, TrailsState, initialTrailsState, trailsReducer } from './trails.reducer';
import * as TrailsSelectors from './trails.selectors';

interface TestSchema {
  trails: TrailsState;
}

describe('TrailsFacade', () => {
  let facade: TrailsFacade;
  let store: Store<TestSchema>;
  const createTrailsEntity = (id: string, name = ''): TrailsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(TRAILS_FEATURE_KEY, trailsReducer), EffectsModule.forFeature([TrailsEffects])],
        providers: [TrailsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(TrailsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allTrails$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allTrails$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadTrailsSuccess` to manually update list
     */
    it('allTrails$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allTrails$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        TrailsActions.loadTrailsSuccess({
          trails: [createTrailsEntity('AAA'), createTrailsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allTrails$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
