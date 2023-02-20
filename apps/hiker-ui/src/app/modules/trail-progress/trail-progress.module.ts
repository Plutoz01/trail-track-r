import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import {OverlayPanelModule} from 'primeng/overlaypanel';

import { TrailsModule } from '@trail-track-r/ui/feature/trails';
import { TrailProgressRoutingModule } from './trail-progress-routing.module';
import { TrailProgressListComponent } from './components/trail-progress-list/trail-progress-list.component';
import { TrailProgressListItemComponent } from './components/trail-progress-list-item/trail-progress-list-item.component';
import { MyProgressComponent } from './pages/my-progress/my-progress.component';

@NgModule({
  declarations: [
    TrailProgressListComponent,
    TrailProgressListItemComponent,
    MyProgressComponent,
  ],
  imports: [
      CommonModule,
      TrailProgressRoutingModule,
      CardModule,
      ButtonModule,
      DividerModule,
      ProgressBarModule,
      OverlayPanelModule,
      TrailsModule
  ]
})
export class TrailProgressModule {}
