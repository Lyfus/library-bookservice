import { Book } from '../database/Entities/book.entity';

export const BooksProviders = [
  {
    provide: 'BOOKS_REPOSITORY',
    useValue: Book,
  },
];