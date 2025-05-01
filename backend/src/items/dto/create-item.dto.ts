import { IsString, IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsString() // name は文字列である必要がある
  @IsNotEmpty() // name は空であってはならない
  name: string;
}
