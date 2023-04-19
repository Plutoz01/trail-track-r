import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Trail } from '../../../models/trail.model';

@Component({
  selector: 'ttr-trail-list-item',
  templateUrl: './trail-list-item.component.html',
  styleUrls: ['./trail-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrailListItemComponent {
  @Input()
  trail?: Trail;
  @Output()
  readonly trailSelect = new EventEmitter<string>();

  onTrailSelect(): void {
    if(this.trail) {
      this.trailSelect.emit(this.trail.id);
    }
  }
}
