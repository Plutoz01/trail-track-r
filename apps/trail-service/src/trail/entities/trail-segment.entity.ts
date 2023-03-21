import { Column, Entity } from 'typeorm';
import { LineString } from 'geojson';
import { BaseEntity } from './base.entity';

@Entity()
export class TrailSegment extends BaseEntity {
  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'geography',
    spatialFeatureType: 'LineString',
    srid: 4326,
    nullable: true
  })
  path: LineString;
}
