import { createReducer, on } from '@ngrx/store';
import { loadBooks, loadBooksSuccess, loadBooksFailure, searchBooks, searchBooksSuccess, searchBooksFailure } from './book-action';
import { Book } from '../../models/book.model';

export interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  searchLoading: boolean;
  searchError: string | null;
}

export const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
  searchQuery: '',
  searchLoading: false,
  searchError: null
};


export const bookReducer = createReducer(
  initialState,
  on(loadBooks, (state) => ({ ...state, loading: true })),
  on(loadBooksSuccess, (state, { books }) => ({ ...state, loading: false, books })),
  on(loadBooksFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(searchBooks, (state, { query }) => ({ ...state, searchQuery: query, searchLoading: true })),
  on(searchBooksSuccess, (state, { books }) => ({ ...state, searchLoading: false, books })),
  on(searchBooksFailure, (state, { error }) => ({ ...state, searchLoading: false, searchError: error }))
);
