import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as TrailSegmentGroupsActions from './trail-segment-groups.actions';
import { TrailSegmentGroupsEffects } from './trail-segment-groups.effects';

describe('TrailSegmentGroupsEffects', () => {
  let actions: Observable<Action>;
  let effects: TrailSegmentGroupsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [TrailSegmentGroupsEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(TrailSegmentGroupsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TrailSegmentGroupsActions.initTrailSegmentGroups() });

      const expected = hot('-a-|', {
        a: TrailSegmentGroupsActions.loadTrailSegmentGroupsSuccess({ trailSegmentGroups: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
