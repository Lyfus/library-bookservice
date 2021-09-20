import { Sequelize } from 'sequelize-typescript';
import { Author } from './Entities/author.entity';
import { Book } from './Entities/book.entity';
import { Editor } from './Entities/editor.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'library_book',
                define: {
                    timestamps: false
                }
            });

            sequelize.addModels([Book, Author, Editor]);
            await sequelize.sync();
            return sequelize
        }
    }
]