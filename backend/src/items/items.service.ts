// backend/nest-app/src/items/items.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'; // NotFoundException をインポート
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto'; // DTO をインポート
import { UpdateItemDto } from './dto/update-item.dto'; // DTO をインポート

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  // 全件取得 (既存)
  async findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  // 個別取得
  async findOne(id: number): Promise<Item> {
    const item = await this.itemsRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  // 作成
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = this.itemsRepository.create(createItemDto); // DTO からエンティティを作成
    return this.itemsRepository.save(newItem); // データベースに保存
  }

  // 更新
  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    // まず対象のアイテムが存在するか確認 (または update 結果で判定)
    const item = await this.findOne(id); // findOne で見つからなければ例外がスローされる

    // update メソッドを使用 (部分更新に便利)
    await this.itemsRepository.update(id, updateItemDto);

    // 更新後のアイテムを取得して返す
    return this.findOne(id);
  }

  // 削除
  async remove(id: number): Promise<void> {
    // まず対象のアイテムが存在するか確認 (または delete 結果で判定)
    const result = await this.itemsRepository.delete(id);

    // 削除されなかった（IDが見つからなかった）場合は例外をスロー
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    // 削除成功時は何も返さない (void)
  }
}
