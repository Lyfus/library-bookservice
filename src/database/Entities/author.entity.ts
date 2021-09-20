import { Table, Column, Model, PrimaryKey, AutoIncrement, HasOne } from 'sequelize-typescript';
import { Book } from './book.entity';

@Table
export class Author extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: Number

  @Column
  firstName: String

  @Column
  lastName: String

  @HasOne(() => Book, { onDelete: 'cascade'})
  book: Book
}