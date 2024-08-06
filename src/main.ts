import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { bookReducer } from './app/states/book-state/book-reducer';
import { GetBooksEffects } from './app/states/book-state/get-books-effects';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    NoopAnimationsModule,
    // provideStore({ book: bookReducer }),
    // provideEffects(GetBooksEffects),
  ],
});
