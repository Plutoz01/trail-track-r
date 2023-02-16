import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TrailDto, TrailSegmentDto, TrailSegmentGroupDto, UserTrailProgressDto } from '@trail-track-r/api-contract/trail';
import { find, chain } from 'lodash';
import { TrailProgress } from '../../trail-progress.model';


@Component({
  templateUrl: './my-progress.component.html',
  styleUrls: ['./my-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyProgressComponent {
  private readonly actualUserId = 'user-1';

  // TODO: move all of these data to state
  readonly trails: TrailDto[] = [
    {
      id: 'trail-0',
      name: 'Test trail 0',
      orgId: 'org-0',
      length: 50,
      description: 'Best hike on Earth, ever!',
    },
    {
      id: 'trail-1',
      name: 'Test trail 1',
      orgId: 'org-0',
      length: 123,
      description: 'Yet another trail',
    },
    {
      id: 'trail-2',
      name: 'Test trail 2',
      orgId: 'org-0',
      length: 321,
      description: 'Test trail 2 description',
    },
  ];
  private readonly trailGroups: TrailSegmentGroupDto[] = [
    {
      id: 'trail-segment-group-0-0',
      trailId: this.trails[0].id,
      name: 'Group 0',
      description: 'Group 0 description',
    },
    {
      id: 'trail-segment-group-0-1',
      trailId: this.trails[0].id,
      name: 'Group 0-1',
      description: 'Group 0-1 description',
    },

    {
      id: 'trail-segment-group-1-0',
      trailId: this.trails[1].id,
      name: 'Group 1-0',
      description: 'Group 1-0 description',
    },
  ];
  private readonly trailSegments: TrailSegmentDto[] = [
    {
      type: 'Feature',
      id: 'trail-segment-0-0-0',
      properties: {
        groupId: this.trailGroups[0].id,
        name: 'Segment 0-0-0',
        length: 5,
      },
      geometry: {
        type: 'LineString',
        coordinates: [],
      },
    },
    {
      type: 'Feature',
      id: 'trail-segment-0-0-1',
      properties: {
        groupId: this.trailGroups[0].id,
        name: 'Segment 0-0-1',
        length: 15,
      },
      geometry: {
        type: 'LineString',
        coordinates: [],
      },
    },
    {
      type: 'Feature',
      id: 'trail-segment-0-1-0',
      properties: {
        groupId: this.trailGroups[1].id,
        name: 'Segment 0-1-0',
        length: 20,
      },
      geometry: {
        type: 'LineString',
        coordinates: [],
      },
    },
    {
      type: 'Feature',
      id: 'trail-segment-0-1-1',
      properties: {
        groupId: this.trailGroups[1].id,
        name: 'Segment 0-1-1',
        length: 10,
      },
      geometry: {
        type: 'LineString',
        coordinates: [],
      },
    },

    {
      type: 'Feature',
      id: 'trail-segment-1-0-0',
      properties: {
        groupId: this.trailGroups[2].id,
        name: 'Segment 1-0-0',
        length: 10,
      },
      geometry: {
        type: 'LineString',
        coordinates: [],
      },
    },
  ];
  private readonly userTrailprogress: UserTrailProgressDto[] = [
    {
      userId: this.actualUserId,
      trailSegmentId: this.trailSegments[0].id as string,
    },
    {
      userId: this.actualUserId,
      trailSegmentId: this.trailSegments[2].id as string,
    },

    {
      userId: this.actualUserId,
      trailSegmentId: this.trailSegments[4].id as string,
    },
  ];

  readonly progress: TrailProgress[] = chain(this.userTrailprogress)
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
    .sortBy('trailName')
    .value();

  private findTrail(id: string): TrailDto {
    const trail = find(this.trails, { id });
    if (!trail) {
      throw `No trail found by id: ${id}`;
    }
    return trail;
  }

  private findTrailSegmentGroup(id: string): TrailSegmentGroupDto {
    const trailSegmentGroup = find(this.trailGroups, { id });
    if (!trailSegmentGroup) {
      throw `No trailSegmentGroup found by id: ${id}`;
    }
    return trailSegmentGroup;
  }

  private findTrailSegment(id: string): TrailSegmentDto {
    const trailSegment = find(this.trailSegments, { id });
    if (!trailSegment) {
      throw `No trailSegment found by id: ${id}`;
    }
    return trailSegment;
  }
}
