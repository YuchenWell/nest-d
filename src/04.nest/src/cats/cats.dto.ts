import { IsInt, IsString, MinLength, Min } from "class-validator";

export class CatDto {
  @Min(1)
  @IsInt()
  age: number;

  @MinLength(3)
  @IsString()
  name: string;
}
