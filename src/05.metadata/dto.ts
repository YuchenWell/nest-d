import { IsInt } from "class-validator";

export class CatDto {
  @IsInt()
  age: string;
}
