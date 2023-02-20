import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as TrailsActions from './trails.actions';
import { TrailsEffects } from './trails.effects';

describe('TrailsEffects', () => {
  let actions: Observable<Action>;
  let effects: TrailsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TrailsEffects, provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(TrailsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TrailsActions.initTrails() });

      const expected = hot('-a-|', { a: TrailsActions.loadTrailsSuccess({ trails: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
