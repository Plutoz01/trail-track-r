import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTrailModule } from '@trail-track-r/data/trail';

import { TrailProgressRoutingModule } from './trail-progress-routing.module';
import { UserProgressComponent } from './user-progress/user-progress.component';

@NgModule({
  declarations: [UserProgressComponent],
  imports: [
    CommonModule,
    TrailProgressRoutingModule,
    DataTrailModule
  ],
})
export class TrailProgressModule {}
