import { Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { BookNotFoundComponent } from './components/book-not-found/book-not-found.component';

export const routes: Routes = [
  { path: '', component: HomeScreenComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'book-not-found', component: BookNotFoundComponent },
  { path: '**', redirectTo: '' }
];
