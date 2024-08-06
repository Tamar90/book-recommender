import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { BookService } from '../../services/book.service';
import { loadBooks, loadBooksSuccess, loadBooksFailure } from './book-action';

@Injectable()
export class GetBooksEffects {

    // private actions$ = inject(Actions);
    // private bookService = inject(BookService);

    // loadBooks$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(loadBooks),
    //         concatMap(() =>
    //             this.bookService.searchBooks('bestsellers').pipe(
    //                 map(books => loadBooksSuccess({ books })),
    //                 catchError(error => of(loadBooksFailure({ error })))
    //             )
    //         )
    //     )
    // );

    // constructor  (){}

}
