import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNotFoundComponent } from './book-not-found.component';

describe('BookNotFoundComponent', () => {
  let component: BookNotFoundComponent;
  let fixture: ComponentFixture<BookNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
