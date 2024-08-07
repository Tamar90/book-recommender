import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { Subject, debounceTime, switchMap, catchError, of, tap } from 'rxjs';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { BookStateService } from '../../states/book-state-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatAutocompleteModule, MatInputModule, MatSelectModule, RouterModule],
  providers: [BookService],
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})

export class SearchBookComponent implements OnInit {
  books: Book[] = [];
  searchQuery: string = '';
  isLoading: boolean = false;
  private searchSubject = new Subject<string>();
  @Output() search = new EventEmitter<Book[]>();
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;

  constructor(private bookService: BookService, private bookStateService: BookStateService, private router: Router) { }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(500),
      switchMap(query => {
        if (query.length < 2) return of([]);
        this.isLoading = true;
        return this.bookService.searchBooks(query).pipe(
          catchError(error => {
            return of([]);
          }),
          tap(() => this.isLoading = false)
        );
      })
    ).subscribe({
      next: (data) => {
        this.books = data.docs?.map((item: any) => new Book(item));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }

  onSearch() {

    if (this.searchQuery.trim() !== '') {
      console.log(this.searchQuery.trim());
      this.searchSubject.next(this.searchQuery);
    } else {
      this.isLoading = false;
      this.search.emit(this.bookStateService.getBooks());
      this.autocompleteTrigger.closePanel();
    }
  }

  selectBook(book: Book) {
    if (book.id) {
      this.router.navigate(['/book', book.id], { state: { book: book } });
    }
  }

  onEnter() {
    if (this.books.length > 0) {
      this.search.emit(this.books);
      this.autocompleteTrigger.closePanel();
    }
  }
}
