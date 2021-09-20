import { Module } from '@nestjs/common';
import { BookController } from './books.controller';
import { BooksService } from './books.service';
import { BooksProviders } from './books.providers';
import { DatabaseModule } from '../database/database.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
        redis: {
          host: 'localhost',
          port: 6379
        }
      }),
      BullModule.registerQueue({
        name: 'book',
        redis: {
          port: 6379,
        },
    }),
    BullModule.registerQueue({
        name: 'user',
        redis: {
          port: 6379,
        },
    }),
    BullModule.registerQueue({
        name: 'fixing',
        redis: {
            port: 6379,
        },
    }),
    DatabaseModule,   
  ],
  controllers: [BookController],
  providers: [
    BooksService, 
        ...BooksProviders,
  ],
})
export class BooksModule {}