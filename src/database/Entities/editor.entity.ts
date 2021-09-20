import { Table, Column, Model, PrimaryKey, AutoIncrement, HasOne } from 'sequelize-typescript';
import { Book } from './book.entity';

@Table
export class Editor extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: Number

  @Column
  name: String

  @HasOne(() => Book, { onDelete: 'cascade'})
  book: Book
}