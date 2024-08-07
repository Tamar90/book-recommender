import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  standalone: true,
  providers: [BookService],
  imports: [FormsModule, HttpClientModule, CommonModule],
})

export class BookDetailsComponent implements OnInit {
  book: Book | null = null;
  errorMessage: string | null = null;
  rating: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) { }

  ngOnInit() {
    const book = history.state.book;
    if (book)
      this.book = book;
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookDetails(bookId).subscribe({
        next: (data: any) => {
          this.mergeBookData(new Book(data));
        },
        error: (error) => {
          this.errorMessage = 'There is no book details. we are sorry.';
        }
      });
      this.bookService.getBookRating(bookId).subscribe({
        next: (data: any) => {
          this.rating = data["summary"]["count"];
        },
      });
    } else {
      this.errorMessage = 'There is no ID.';
    }
  }

  mergeBookData(newBook: Book) {
    if (!this.book) {
      this.book = newBook;
      return;
    }
    this.book.title = newBook.title || this.book.title;
    this.book.authors = newBook.authors || this.book.authors;
    this.book.publishYear = newBook.publishYear || this.book.publishYear;
    this.book.cover_i = newBook.cover_i || this.book.cover_i;
    this.book.genre = newBook.genre || this.book.genre;
    this.book.subjects = newBook.subjects || this.book.subjects;
    this.book.description = newBook.description || this.book.description;
  }

  getAuthors(): string {
    return this.book?.authors
      .filter((author: any) => author.author && author.author.key)
      .map((author: any) => author.author.key.split('/').pop())
      .join(', ') || '';
  }


  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '../../../assets/placeolder-book.png';
  }
}
