import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [CommonModule, NgxPaginationModule]
})
export class BookListComponent {
  @Input() books: Book[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 15;
  hoveredBook: Book | null = null;

  constructor(private router: Router) { }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '../../../assets/placeolder-book.png';
  }

  selectBook(book: Book) {
    if (book.id) {
      this.router.navigate(['/book', book.id], { state: { book: book } });
    } else {
      this.router.navigate(['/book-not-found']);
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onMouseEnter(book: Book) {
    this.hoveredBook = book;
  }

  onMouseLeave() {
    this.hoveredBook = null;
  }
}
