import { Routes } from '@angular/router';
import { BookDetailsComponent } from './Component/book-details/book-details.component';
import { SearchBookComponent } from './Component/search-book/search-book.component';
import { HomeScreenComponent } from './Component/home-screen/home-screen.component';

export const routes: Routes = [
    { path: '', component: HomeScreenComponent },
    { path: 'book/:id', component: BookDetailsComponent },
    { path: '**', redirectTo: '' }
  ];