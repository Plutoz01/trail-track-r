import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromTrails from './+state/trail/trails.reducer';
import { TrailsEffects } from './+state/trail/trails.effects';
import { TrailsFacade } from './+state/trail/trails.facade';

import * as fromTrailSegmentGroups from './+state/trail-segment-group/trail-segment-groups.reducer';
import { TrailSegmentGroupsEffects } from './+state/trail-segment-group/trail-segment-groups.effects';
import { TrailSegmentGroupsFacade } from './+state/trail-segment-group/trail-segment-groups.facade';

import * as fromTrailSegments from './+state/trail-segment/trail-segments.reducer';
import { TrailSegmentsEffects } from './+state/trail-segment/trail-segments.effects';
import { TrailSegmentsFacade } from './+state/trail-segment/trail-segments.facade';

import { TrailApiService } from './http/trail-api.service';
import { TrailSegmentApiService } from './http/trail-segment-api.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromTrails.TRAILS_FEATURE_KEY,
      fromTrails.trailsReducer),
    EffectsModule.forFeature([TrailsEffects]),

    StoreModule.forFeature(
      fromTrailSegmentGroups.TRAIL_SEGMENT_GROUPS_FEATURE_KEY,
      fromTrailSegmentGroups.trailSegmentGroupsReducer
    ),
    EffectsModule.forFeature([TrailSegmentGroupsEffects]),

    StoreModule.forFeature(
      fromTrailSegments.TRAIL_SEGMENTS_FEATURE_KEY,
      fromTrailSegments.trailSegmentsReducer
    ),
    EffectsModule.forFeature([TrailSegmentsEffects])
  ],
  providers: [
    TrailApiService,
    TrailSegmentApiService,
    TrailsFacade,
    TrailSegmentsFacade,
    TrailSegmentGroupsFacade
  ],
})
export class TrailsModule {}
