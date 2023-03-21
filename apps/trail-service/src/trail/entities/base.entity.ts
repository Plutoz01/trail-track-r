import { BeforeInsert, PrimaryColumn } from "typeorm";
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ulid } from "ulid";

@ObjectType()
export abstract class BaseEntity {
    @PrimaryColumn({
      type: 'uuid',
      nullable: false
    })
    @Field(() => ID, {nullable: false})
    id: string;

    @BeforeInsert()
    private beforeInsert() {
      this.id = this.id || ulid();
    }
}
