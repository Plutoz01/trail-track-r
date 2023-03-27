import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class CommonProperties {
  @Field({ nullable: true })
  url?: string;
  @Field({ nullable: true })
  description?: string;
}
