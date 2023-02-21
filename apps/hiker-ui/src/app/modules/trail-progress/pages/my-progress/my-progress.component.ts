import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { map } from 'rxjs/operators';
import { chain, find } from 'lodash';
import { TrailDto, TrailSegmentDto, TrailSegmentGroupDto, TrailProgressDto } from '@trail-track-r/api-contract/trail';
import { dummyTrailGroups, dummyTrails, dummyTrailSegments, TrailsFacade } from '@trail-track-r/ui/feature/trails';
import { TrailProgress } from '../../trail-progress.model';


@Component({
  templateUrl: './my-progress.component.html',
  styleUrls: ['./my-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyProgressComponent {
  @ViewChild('addTrailOverlay')
  addTrailOverlay?: OverlayPanel;

  private readonly actualUserId = 'user-1';

  // TODO: move all of these data to state
  private readonly userTrailProgress: TrailProgressDto[] = [
    {
      userId: this.actualUserId,
      trailSegmentId: dummyTrailSegments[0].id as string,
    },
    {
      userId: this.actualUserId,
      trailSegmentId: dummyTrailSegments[2].id as string,
    },

    {
      userId: this.actualUserId,
      trailSegmentId: dummyTrailSegments[4].id as string,
    },
  ];

  readonly progress: TrailProgress[] = chain(this.userTrailProgress)
    .reduce((result, actual) => {
      const trailSegment = this.findTrailSegment(actual.trailSegmentId);
      const trailSegmentGroup = this.findTrailSegmentGroup(trailSegment.properties.groupId);
      const trail = this.findTrail(trailSegmentGroup.trailId);

      const p: TrailProgress = result[trail.id] || {
        id: trail.id,
        name: trail.name,
        totalLength: trail.length,
        completedLength: 0,
      };

      p.completedLength += trailSegment.properties.length;
      return {
        ...result,
        [p.id]: p,
      };
    }, {} as { [id: TrailDto['id']]: TrailProgress })
    .values()
    .sortBy('name')
    .value();

  // let allow only trails has not yet been added
  readonly trailsToAdd$ = this.trailsFacade.allTrails$.pipe(
    map(trails => trails.filter(trail =>this.progress.every(progress => progress.id !== trail.id)))
  );

  constructor(private readonly trailsFacade: TrailsFacade) {
  }

  private findTrail(id: string): TrailDto {
    const trail = find(dummyTrails, { id });
    if (!trail) {
      throw `No trail found by id: ${id}`;
    }
    return trail;
  }

  private findTrailSegmentGroup(id: string): TrailSegmentGroupDto {
    const trailSegmentGroup = find(dummyTrailGroups, { id });
    if (!trailSegmentGroup) {
      throw `No trailSegmentGroup found by id: ${id}`;
    }
    return trailSegmentGroup;
  }

  private findTrailSegment(id: string): TrailSegmentDto {
    const trailSegment = find(dummyTrailSegments, { id });
    if (!trailSegment) {
      throw `No trailSegment found by id: ${id}`;
    }
    return trailSegment;
  }

  addTrail(trailId: string): void {
    console.log('should add trail with id: ', trailId);
    this.addTrailOverlay?.hide();
  }
}
