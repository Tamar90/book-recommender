import { createAction, props } from '@ngrx/store';
import { Book } from '../../models/book.model';
export const loadBooks = createAction('[Book List] Load Books');
export const loadBooksSuccess = createAction('[Book List] Load Books Success', props<{ books: Book[] }>());
export const loadBooksFailure = createAction('[Book List] Load Books Failure', props<{ error: any }>());
export const searchBooks = createAction('[Book List] Search Books', props<{ query: string }>());
export const searchBooksSuccess = createAction('[Book List] Search Books Success', props<{ books: Book[] }>());
export const searchBooksFailure = createAction('[Book List] Search Books Failure', props<{ error: any }>());


