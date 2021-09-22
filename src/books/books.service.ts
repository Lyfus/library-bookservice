import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable, Inject, ParseIntPipe, Sse, HttpService } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Job, Queue } from 'bull';
import { interval, map, Observable } from 'rxjs';
import { Author } from 'src/database/Entities/author.entity';
import { Editor } from 'src/database/Entities/editor.entity';
import { Book } from '../database/Entities/book.entity';

@Injectable()
@Processor('book')
export class BooksService {
    // public client: ClientProxy;

    constructor(
        @Inject('BOOKS_REPOSITORY')
        private booksRepository: typeof Book,
        @InjectQueue('book') private bookQueue: Queue,
        @InjectQueue('user') private userQueue: Queue,
        @InjectQueue('fixing') private reparationQueue: Queue
    ) { }

    async findOne(id): Promise<any> {
        return this.booksRepository.findOne<Book>({
            where: { id }
        })
    }

    async findAll(): Promise<Book[]> {
        return this.booksRepository.findAll<Book>({
            where: { state: "available" },
            include: [
                {
                    model: Author,
                    as: 'author',
                    required: true
                },
                {
                    model: Editor,
                    as: 'editor',
                    required: true
                }
            ]
        }
        );
    }

    async findUserBooks(userId: number): Promise<Book[]> {
        return this.booksRepository.findAll<Book>({
            where: { state: "borrowed", borrowedBy: userId },
            include: [
                {
                    model: Author,
                    as: 'author',
                    required: true
                },
                {
                    model: Editor,
                    as: 'editor',
                    required: true
                }
            ]
        }
        );
    }

    async checkBookAvailability(id: number): Promise<any> {
        return await this.booksRepository.findOne({
            where: { id }
        });
    }

    async borrowBookToUser(checkBook: any, userId: number): Promise<any> {
        let bookToSave = checkBook.dataValues;
        bookToSave.state = "borrowed";
        bookToSave.borrowedBy = userId;

        this.userQueue.add('incrementUserBooks', { userId })

        return await this.booksRepository.update(bookToSave, 
        {
            where: { id: bookToSave.id}
        })
    }

    @Process('fromUserToHome')
    async keepBookAtHome(job: Job<any>) {
        // console.log("fromUserToHome", job);
        let toKeepBook = await this.findOne(job.data.bookId);
        toKeepBook = toKeepBook.dataValues;
        toKeepBook.state = "atHome",

        this.booksRepository.update(toKeepBook, { where: { id: job.data.bookId }})
        .then(() => {
            this.bookQueue.add('fromHomeToLibrary', { state: job.data.state, book: toKeepBook })
        })
        .catch(error => {
            console.log("error", error);
        })
    }

    @Process('fromHomeToLibrary')
    async fromHomeToLibrary(job: Job<any>) {
        // console.log("fromHomeToLibrary", job);
        if(job.data.state == 'damaged') {
            console.log("book is damaged");
            let savedBook = JSON.parse(JSON.stringify(job.data.book))
            let bookToSetOnReparation = job.data.book;

            bookToSetOnReparation.state = "fixing",
            bookToSetOnReparation.borrowedBy = null;

            this.booksRepository.update(bookToSetOnReparation, { where: { id: job.data.book.id }})
            .then(() => {
                this.reparationQueue.add('fromHomeToReparation', { book: job.data.book });
                this.userQueue.add('addPenalitiesToUser', { book: savedBook })
            })            
            .catch(error => {
                console.log("error", error);
            })

        } else {
            let bookToSetOnLibrary = job.data.book;

            bookToSetOnLibrary.state = "available",
            bookToSetOnLibrary.borrowedBy = null;

            this.booksRepository.update(bookToSetOnLibrary, { where: { id: job.data.book.id }})
        }
    }

    @Process('fromReparationToLibrary')
    async fromReparationToLibrary(job: Job<any>) {
        // console.log("recieved book from fixservice")
        let bookToSetOnLibrary = job.data.book;

        bookToSetOnLibrary.state = "available",
        bookToSetOnLibrary.borrowedBy = null;

        this.booksRepository.update(bookToSetOnLibrary, { where: { id: job.data.book.id }})
    }
}