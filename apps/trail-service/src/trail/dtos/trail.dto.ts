import { IsNotEmpty, MinLength } from "class-validator";

export class TrailDto {
    @IsNotEmpty()
    // TODO: need to check for ULID
    id: string;

    @IsNotEmpty()
    @MinLength(3)
    name: string;
}