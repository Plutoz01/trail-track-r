import { TrailSegmentDto, TrailSegmentGroupDto } from '@trail-track-r/api-contract/trail';

export const dummyTrails = [
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
    name: 'A test trail with a quite long title to... just for testing',
    orgId: 'org-0',
    length: 321,
    description: 'Test trail 2 description',
  },
];

export const dummyTrailGroups: TrailSegmentGroupDto[] = [
  {
    id: 'trail-segment-group-0-0',
    name: 'Group 0',
    trailId: dummyTrails[0].id,
    description: 'Group 0 description',
  },
  {
    id: 'trail-segment-group-0-1',
    trailId: 'trail-0',  // TODO: use reference instead of hardcoded id
    name: dummyTrails[0].id,
    description: 'Group 0-1 description',
  },

  {
    id: 'trail-segment-group-1-0',
    trailId: 'trail-1',  // TODO: use reference instead of hardcoded id
    name: dummyTrails[1].id,
    description: 'Group 1-0 description',
  },
];

export const dummyTrailSegments: TrailSegmentDto[] = [
  {
    type: 'Feature',
    id: 'trail-segment-0-0-0',
    properties: {
      groupId: dummyTrailGroups[0].id,
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
      groupId: dummyTrailGroups[0].id,
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
      groupId: dummyTrailGroups[1].id,
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
      groupId: dummyTrailGroups[1].id,
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
      groupId: dummyTrailGroups[2].id,
      name: 'Segment 1-0-0',
      length: 10,
    },
    geometry: {
      type: 'LineString',
      coordinates: [],
    },
  },
];
