import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis-server',
        port: 6379
      }
    }),
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
