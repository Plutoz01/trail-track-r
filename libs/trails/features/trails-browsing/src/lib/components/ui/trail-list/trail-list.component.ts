import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';
import { Trail } from '../../../models/trail.model';

@Component({
  selector: 'ttr-trail-list',
  templateUrl: './trail-list.component.html',
  styleUrls: ['./trail-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrailListComponent {
  @Input()
  trails?: Trail[] = [];
  @Input()
  isLoading?: boolean = true;
  @Output()
  readonly trailSelect = new EventEmitter<string>();

  readonly trailTrackByFn: TrackByFunction<Trail> = (_, trail) => trail.id;
}
