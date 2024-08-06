import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  imports: [FormsModule, HttpClientModule,CommonModule],

})
export class BookDetailsComponent implements OnInit {
  book: Book | undefined; 
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookDetails(bookId).subscribe({
        next: (data: any) => {
          this.book = data;
        },
        error: (error) => {
          this.errorMessage = 'Unable to fetch book details. Please try again later.';
          console.error('Error fetching book details:', error);
        }
      });
    } else {
      this.errorMessage = 'No book ID provided.';
    }
  }

  getAuthors(): string {
    return this.book?.authors.map((author: any) => author.author.key.split('/').pop()).join(', ') || 'Unknown';
  }

  getPublicationYear(): string {
    return this.book?.publishYear ? new Date(this.book.publishYear).getFullYear().toString() : 'Unknown';
  }
}