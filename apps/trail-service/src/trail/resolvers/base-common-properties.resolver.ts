import { Type } from '@nestjs/common';
import { Float, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BaseEntity } from '../entities/base.entity';
import { CommonProperties } from '../entities/common-properties';
import { CommonPropertiesContainer } from '../entities/common-properties-container';
import { BaseCrudService } from '../services/base-crud.service';

export function BaseCommonPropertiesResolver<T extends BaseEntity>(classRef: Type<T>) {
  @Resolver(() => classRef, { isAbstract: true })
  abstract class BaseCommonPropertiesResolverHost {

    protected constructor(private readonly crudService: BaseCrudService<T>) {
    }

    @Query(() => [classRef], { name: `findAll${classRef.name}` })
    async findAll(): Promise<T[]> {
      return this.crudService.findAll();
    }

    @Query(() => [classRef], { name: `find${classRef.name}ById` })
    async findById(id: T['id']): Promise<T | null> {
      return this.crudService.findById(id);
    }

    @ResolveField(() => Float, { nullable: true })
    length(@Parent() segment: CommonPropertiesContainer<CommonProperties>): number | undefined {
      return segment.properties.length;
    }

    @ResolveField(() => String, { nullable: true })
    description(@Parent() segment: CommonPropertiesContainer<CommonProperties>): string | undefined {
      return segment.properties.description;
    }

    @ResolveField(() => String, { nullable: true })
    url(@Parent() segment: CommonPropertiesContainer<CommonProperties>): string | undefined {
      return segment.properties.url;
    }
  }

  return BaseCommonPropertiesResolverHost;
}
