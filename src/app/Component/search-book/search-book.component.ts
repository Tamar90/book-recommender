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
  filteredBooks: Book[] = [];
  searchQuery: string = '';
  selectedGenre: string = '';
  selectedYear: string = '';
  genres: string[] = [];
  years: string[] = [];

  @Output() search = new EventEmitter< Book[]>();
  private searchSubject = new Subject<string>();
  private searchCache: Map<string, Book[]> = new Map();

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      switchMap(query => {
        if (query.length < 2) {
          return of([]);
        }
        if (this.searchCache.has(query)) {
          return of(this.searchCache.get(query) || []);
        }
        return this.bookService.searchBooks(query).pipe(
          catchError(error => {
            console.error('Error fetching search suggestions:', error);
            return of([]);
          })
        );
      })
    ).subscribe({
      next: (data) => {
        this.searchCache.set(this.searchQuery, data.docs || []);
        this.filteredBooks = this.filterBooks(data.docs || []);
      },
      error: (error) => {
        console.error('Error fetching search suggestions:', error);
      }
    });
  }

  onSearch(): void {
    console.log("onSearch search");

    if (this.searchQuery.trim()) {
      this.searchSubject.next(this.searchQuery);
      this.search.emit(this.filteredBooks); 
    } else {
      this.filteredBooks = [];
    }
  }

  onSelectBook(book: Book): void {
    this.searchQuery = book.title;
    this.filteredBooks = [];
    this.router.navigate(['/book', book.id]);
  }

  filterBooks(books: Book[]): Book[] {
    return books.filter(book =>
      (this.selectedGenre ? true : true) &&
      (this.selectedYear ? book.publishYear?.toString() === this.selectedYear : true)
    );
  }

  onGenreChange(genre: string): void {
    this.selectedGenre = genre;
    this.filteredBooks = this.filterBooks(this.books);
  }

  onYearChange(year: string): void {
    this.selectedYear = year;
    this.filteredBooks = this.filterBooks(this.books);
  }
}
