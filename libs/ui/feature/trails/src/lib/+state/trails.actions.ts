import { createAction, props } from '@ngrx/store';
import { TrailDto } from '@trail-track-r/api-contract/trail';

export const initTrails = createAction('[Trails Page] Init');

export const loadTrailsSuccess = createAction('[Trails/API] Load Trails Success', props<{ trails: TrailDto[] }>());

export const loadTrailsFailure = createAction('[Trails/API] Load Trails Failure', props<{ error: unknown }>());
