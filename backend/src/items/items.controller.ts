// backend/nest-app/src/items/items.controller.ts
import {
  Controller,
  Get,
  Post, // 追加
  Patch, // 追加
  Delete, // 追加
  Param, // 追加
  Body, // 追加
  ParseIntPipe, // 追加 (IDを数値に変換)
  HttpCode, // 追加 (削除成功時のステータスコード設定など)
  HttpStatus, // 追加 (ステータスコード設定など)
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto'; // DTO をインポート
import { UpdateItemDto } from './dto/update-item.dto'; // DTO をインポート

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // 全件取得 (既存)
  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  // 個別取得
  @Get(':id') // 例: GET /items/1
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    // ParseIntPipe で id が自動的に数値に変換される
    return this.itemsService.findOne(id);
  }

  // 作成
  @Post() // 例: POST /items
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    // @Body() でリクエストボディを取得し、CreateItemDto の型とバリデーションが適用される
    return this.itemsService.create(createItemDto);
  }

  // 更新
  @Patch(':id') // 例: PATCH /items/1
  async update(
    @Param('id', ParseIntPipe) id: number, // IDを取得
    @Body() updateItemDto: UpdateItemDto, // 更新データを取得
  ): Promise<Item> {
    // サービスを呼び出して更新
    return this.itemsService.update(id, updateItemDto);
  }

  // 削除
  @Delete(':id') // 例: DELETE /items/1
  @HttpCode(HttpStatus.NO_CONTENT) // 削除成功時は 204 No Content を返すのが一般的
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    // サービスを呼び出して削除
    await this.itemsService.remove(id);
    // 204 を返すため、ここでは何も return しない
  }
}
