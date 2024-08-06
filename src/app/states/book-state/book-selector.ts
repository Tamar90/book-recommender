import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookState } from './book-reducer';

// Select the feature state
export const selectBookState = createFeatureSelector<BookState>('book');

// Select all books
export const selectAllBooks = createSelector(
  selectBookState,
  (state: BookState) => state.books
);

// Select the loading state for books
export const selectBooksLoading = createSelector(
  selectBookState,
  (state: BookState) => state.loading
);

// Select the error state for books
export const selectBooksError = createSelector(
  selectBookState,
  (state: BookState) => state.error
);

// Select the search query
export const selectSearchQuery = createSelector(
  selectBookState,
  (state: BookState) => state.searchQuery
);

// Select the loading state for search
export const selectSearchLoading = createSelector(
  selectBookState,
  (state: BookState) => state.searchLoading
);

// Select the error state for search
export const selectSearchError = createSelector(
  selectBookState,
  (state: BookState) => state.searchError
);
