import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { Subject, debounceTime, switchMap, catchError, of } from 'rxjs';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatAutocompleteModule, MatInputModule, MatSelectModule, RouterModule],
  providers: [BookService],
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})

export class SearchBookComponent implements OnInit {
  books: Book[] = [];
  searchQuery: string = '';
  private searchSubject = new Subject<string>();

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      switchMap(query => {
        return this.bookService.searchBooks(query).pipe(
          catchError(error => {
            return of([]);
          })
        );
      })
    ).subscribe({
      next: (data) => {
        this.books = data.docs.map((item: any) => new Book(item));
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.searchSubject.next(this.searchQuery);
    }
  }

  selectBook(book: Book) {
    if (book.id) {
      this.router.navigate(['/book', book.id]);
    }
  }

}
