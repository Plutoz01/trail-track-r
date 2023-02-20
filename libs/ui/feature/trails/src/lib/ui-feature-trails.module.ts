import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { DataTrailModule } from '@trail-track-r/data/trail';
import * as fromTrails from './+state/trails.reducer';
import { TrailsEffects } from './+state/trails.effects';
import { TrailsFacade } from './+state/trails.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTrails.TRAILS_FEATURE_KEY, fromTrails.trailsReducer),
    EffectsModule.forFeature([TrailsEffects]),
    DataTrailModule
  ],
  providers: [TrailsFacade]
})
export class UiFeatureTrailsModule {
}
