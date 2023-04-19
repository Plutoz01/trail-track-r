import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Trail } from '../../../models/trail.model';

@Component({
  selector: 'ttr-trail-details',
  templateUrl: './trail-details.component.html',
  styleUrls: ['./trail-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrailDetailsComponent {
  @Input()
  trail?: Trail;
}
