import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TrailApiService } from '@trail-track-r/data/trail';

@Component({
  selector: 'ttrh-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProgressComponent {
  readonly trails$ = this.trailService.getAll$();

  constructor(private readonly trailService: TrailApiService) {
  }
}
