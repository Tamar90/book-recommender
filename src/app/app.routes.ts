import { Routes } from '@angular/router';
import { BookDetailsComponent } from './Component/book-details/book-details.component';
import { SearchBookComponent } from './Component/search-book/search-book.component';
import { HomeScreenComponent } from './Component/home-screen/home-screen.component';
import { BookNotFoundComponent } from './Component/book-not-found/book-not-found.component';
import { BookResolver } from './states/book-resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeScreenComponent,
    resolve: { books: BookResolver }
  },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'book-not-found', component: BookNotFoundComponent },
  { path: '**', redirectTo: '' }
];
