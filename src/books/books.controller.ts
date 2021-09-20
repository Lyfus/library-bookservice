import { BooksService } from './books.service';
import { Controller } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';

@Controller()
export class BookController {
  public client: ClientProxy;

  constructor(
      private readonly bookService: BooksService
  ) {
    this.client = ClientProxyFactory.create({
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379'
        },
      });
  }

  @MessagePattern('availableBooks')
  getAll(): Promise<any[]> {
    return this.bookService.findAll();
  }

  @MessagePattern('userBooks')
  async getBooksOfUser(@Payload() data: any): Promise<any[]> {
    return this.bookService.findUserBooks(data.userId);
  }

  @MessagePattern('userBorrowBook')
  async checkAvailability(@Payload() data: any): Promise<any> {
    let checkedBook = await this.bookService.checkBookAvailability(data.bookId);
    return await this.bookService.borrowBookToUser(checkedBook, data.userId)
  }
}