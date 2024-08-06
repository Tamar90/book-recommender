import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { BookListComponent } from '../book-list/book-list.component';
import { SearchBookComponent } from '../search-book/search-book.component';
import { Book } from '../../models/book.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
  standalone: true,
  imports:[BookListComponent,SearchBookComponent,FormsModule, HttpClientModule],
  providers:[BookService]
})
export class HomeScreenComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadRecommendedBooks();
  }
  
  loadRecommendedBooks() {
    this.bookService.searchBooks('bestsellers&limit=10').subscribe((data: any) => {
      this.books = data.docs.map((item: any) => new Book(item));
    });
  }

  onSearch(query: string) {
    this.bookService.searchBooks(query).subscribe((data: any) => {
      this.books = data.docs.map((item: any) => new Book(item));
    });
  }
}
