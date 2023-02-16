import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from '@angular/core';
import { TrailProgress } from '../../trail-progress.model';

@Component({
  selector: 'ttrh-trail-progress-list',
  templateUrl: './trail-progress-list.component.html',
  styleUrls: ['./trail-progress-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrailProgressListComponent {
  @Input()
  progress: TrailProgress[] = [];

  readonly progressTrackByFn: TrackByFunction<TrailProgress> = (_, item) => item.id;
}
