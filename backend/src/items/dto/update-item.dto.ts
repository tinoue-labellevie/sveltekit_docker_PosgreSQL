import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';

// PartialType を使用すると、CreateItemDto の全てのプロパティをオプショナルにした型を作成できる
export class UpdateItemDto extends PartialType(CreateItemDto) {
  // update では name は必須ではないため、PartialType が便利
}
