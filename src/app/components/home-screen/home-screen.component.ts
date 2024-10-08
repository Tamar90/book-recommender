import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { SearchBookComponent } from '../search-book/search-book.component';
import { FormsModule } from '@angular/forms';
import { BookListComponent } from '../book-list/book-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { BookStateService } from '../../states/book-state-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
  standalone: true,
  imports: [BookListComponent, SearchBookComponent, FormsModule, MatProgressSpinnerModule, CommonModule],
  providers: [BookService]
})
export class HomeScreenComponent implements OnInit {
  books: Book[] = [];
  isLoading = true;

  constructor(private bookService: BookService, private bookStateService: BookStateService, private router: Router) { }

  ngOnInit() {
    const cachedBooks = this.bookStateService.getBooks();
    if (cachedBooks.length > 0) {
      this.books = cachedBooks;
      this.isLoading = false;
    } else {
      this.bookService.getTrendingBooks().subscribe({
        next: (data) => {
          this.books = data.works?.map((item: any) => new Book(item));
          this.bookStateService.setBooks(this.books);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching books:', error);
          this.isLoading = false;
          this.router.navigate(['/book-not-found']);
        }
      });
    }
  }

  onSearch(books: Book[]) {
    this.books = books;
  }
}
