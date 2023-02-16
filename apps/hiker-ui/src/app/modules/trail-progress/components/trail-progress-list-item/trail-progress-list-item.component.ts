import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrailProgress } from '../../trail-progress.model';

@Component({
  selector: 'ttrh-trail-progress-list-item',
  templateUrl: './trail-progress-list-item.component.html',
  styleUrls: ['./trail-progress-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrailProgressListItemComponent {
  @Input()
  progress?: TrailProgress;

  get percentage(): number {
    return this.progress ? 100 * this.progress.completedLength / this.progress.totalLength : 0;
  }
}
