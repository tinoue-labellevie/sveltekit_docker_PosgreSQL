// backend/src/items/item.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('items') // テーブル名を指定
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
