import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { BookStateService } from './book-state-service';


@Injectable({
    providedIn: 'root'
})
export class BookResolver implements Resolve<Book[]> {

    constructor(private bookService: BookService, private bookStateService: BookStateService) { }

    resolve(): Observable<Book[]> {
        const cachedBooks = this.bookStateService.getBooks();
        if (cachedBooks.length) {
            return of(cachedBooks);
        } else {
            return this.bookService.searchBooks('bestsellers&limit=60').pipe(
                map(data => data.docs.map((item: any) => new Book(item))),
                tap(books => this.bookStateService.setBooks(books))
            );
        }
    }
}
