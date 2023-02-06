import { BeforeInsert, PrimaryColumn } from "typeorm";
import { ulid } from "ulid";

export abstract class BaseEntity {
    @PrimaryColumn({
      type: 'uuid',
      nullable: false
    })
    id: string;

    @BeforeInsert()
    private beforeInsert() {
      this.id = this.id || ulid();
    }
}