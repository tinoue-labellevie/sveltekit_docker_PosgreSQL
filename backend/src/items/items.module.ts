// backend/src/items/items.module.ts
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { Item } from './item.entity'; // Import Item entity

@Module({
  imports: [TypeOrmModule.forFeature([Item])], // ここで Item Entity を指定
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService], // 必要であれば他のモジュールから利用できるようにエクスポート
})
export class ItemsModule {}
