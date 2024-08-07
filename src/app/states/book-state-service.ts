import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookStateService {
  private booksSubject = new BehaviorSubject<Book[]>([]);
  books$ = this.booksSubject.asObservable();

  setBooks(books: Book[]) {
    this.booksSubject.next(books);
  }

  getBooks(): Book[] {
    return this.booksSubject.getValue();
  }
}
