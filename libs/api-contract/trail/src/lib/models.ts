import { LineString, Feature, FeatureCollection } from 'geojson';

export interface TrailDto {
    id: string;
    orgId: string;
    name: string;
    description?: string;
    externalUrl?: string;
}

export interface TrailSegmentGroupDto {
    id: string;
    trailId: string;
    name: string;
    description?: string;
    externalUrl?: string;
}

interface TrailSegmentProperties {
    name: string;
    groupId: string;
    description?: string;
    externalUrl?: string;
}

export type TrailSegmentDto = Feature<LineString, TrailSegmentProperties>;

export type TrailSegmentCollectionDto = FeatureCollection<LineString, TrailSegmentProperties>;
