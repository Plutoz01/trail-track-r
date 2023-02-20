import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as TrailSegmentsActions from './trail-segments.actions';
import { TrailSegmentsEffects } from './trail-segments.effects';

describe('TrailSegmentsEffects', () => {
  let actions: Observable<Action>;
  let effects: TrailSegmentsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [TrailSegmentsEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(TrailSegmentsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TrailSegmentsActions.initTrailSegments() });

      const expected = hot('-a-|', { a: TrailSegmentsActions.loadTrailSegmentsSuccess({ trailSegments: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
