import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { CommonProperties } from './common-properties';

@ObjectType()
export class CommonPropertiesContainer<T extends CommonProperties> extends BaseEntity {
  properties: T;
}
