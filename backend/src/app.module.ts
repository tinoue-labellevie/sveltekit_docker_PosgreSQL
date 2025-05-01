// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module'; // 追加: ItemsModule をインポート

@Module({
  imports: [
    // 環境変数をロード
    ConfigModule.forRoot({
      isGlobal: true, // アプリケーション全体で利用可能にする
      envFilePath: '../.env', // プロジェクトルートの .env ファイルを指定
      ignoreEnvFile: false, // .env ファイルを無視しない設定 (開発用)
    }),
    // TypeORM データベース接続設定
    TypeOrmModule.forRoot({
      type: 'postgres', // DB_TYPE (.envから)
      host: process.env.DB_HOST, // DB_HOST (.envから -> db)
      port: parseInt(process.env.DB_PORT as string, 10), // DB_PORT (.envから)
      username: process.env.DB_USERNAME, // DB_USERNAME (.envから)
      password: process.env.DB_PASSWORD, // DB_PASSWORD (.envから)
      database: process.env.DB_DATABASE, // DB_DATABASE (.envから)
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // エンティティファイルのパス
      synchronize: false, // 注意: 本番環境では true にしないこと (マイグレーションを使用すべき)
      // logging: true, // 開発中はクエリログを出すと便利
    }),
    ItemsModule, // 追加: ItemsModule をインポート
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
