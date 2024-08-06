import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { Subject, debounceTime, switchMap, catchError, of } from 'rxjs';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MatAutocompleteModule, MatInputModule, MatSelectModule, RouterModule],
  providers: [BookService],
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent {
  books: Book[] = [];
  searchQuery: string = '';
  filteredBooks: Book[] = [];
  selectedGenre: string = '';
  selectedYear: string = '';
  genres: string[] = [];  // Populate this with genre options if available
  years: string[] = [];   // Populate this with publication year options if available

  @Output() search = new EventEmitter<string>();
  private searchSubject = new Subject<string>();

  constructor(private bookService: BookService, private router: Router) {
    this.searchSubject.pipe(
      debounceTime(300),
      switchMap(query =>
        this.bookService.searchBooks(query).pipe(
          catchError(error => {
            console.error('Error fetching search suggestions:', error);
            return of({ docs: [] });
          })
        )
      )
    ).subscribe({
      next: (data) => {
        this.filteredBooks = this.filterBooks(data.docs || []);
      },
      error: (error) => {
        console.error('Error fetching search suggestions:', error);
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.searchSubject.next(this.searchQuery);
      this.search.emit(this.searchQuery); // Emit search query to parent component
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
    this.filteredBooks = this.filterBooks(this.filteredBooks);
  }

  onYearChange(year: string): void {
    this.selectedYear = year;
    this.filteredBooks = this.filterBooks(this.filteredBooks);
  }
}