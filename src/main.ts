import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideState, provideStore, StateObservable } from '@ngrx/store';
import { bookReducer } from './app/states/book-state/book-reducer';
import { GetBooksEffects } from './app/states/book-state/get-books-effects';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    NoopAnimationsModule,StoreModule,
    provideStore({ book: bookReducer }),
    importProvidersFrom(StoreModule.forRoot(bookReducer),),
    provideEffects(GetBooksEffects),
    provideStore(),
    importProvidersFrom(BrowserAnimationsModule),
    // provideState({ name: 'Book List', reducer: bookReducer }),
    Store,
  ],
});
