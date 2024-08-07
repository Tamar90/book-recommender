import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { SearchBookComponent } from '../search-book/search-book.component';
import { FormsModule } from '@angular/forms';
import { BookListComponent } from '../book-list/book-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
  standalone: true,
  imports: [BookListComponent, SearchBookComponent, FormsModule],
  providers: [BookService]
})

export class HomeScreenComponent implements OnInit {
  books: Book[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.books = this.route.snapshot.data['books'];
  }
  onSearch(books: Book[]) {
    this.books = books;
  }
}
