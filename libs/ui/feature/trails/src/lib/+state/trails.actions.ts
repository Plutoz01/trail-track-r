import { createAction, props } from '@ngrx/store';
import { TrailsEntity } from './trails.models';

export const initTrails = createAction('[Trails Page] Init');

export const loadTrailsSuccess = createAction('[Trails/API] Load Trails Success', props<{ trails: TrailsEntity[] }>());

export const loadTrailsFailure = createAction('[Trails/API] Load Trails Failure', props<{ error: any }>());
