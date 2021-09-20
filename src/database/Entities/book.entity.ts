import { Table, Column, Model, AllowNull, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Author } from './author.entity';
import { Editor } from './editor.entity';

@Table
export class Book extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: Number

  @ForeignKey(() => Author)
  @Column
  authorId: Number

  @ForeignKey(() => Editor)
  @Column
  editorId: Number

  @Column
  editionDate: Date

  @Column
  name: string;

  @Column
  resume: string;

  @Column
  coverLink: string;

  @Column
  state: string

  @AllowNull
  @Column
  borrowedBy: number;

  @BelongsTo(() => Editor, { onDelete: 'cascade'})
  editor: Editor

  @BelongsTo(() => Author, { onDelete: 'cascade'})
  author: Author
}