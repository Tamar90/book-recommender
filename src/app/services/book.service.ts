import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'https://openlibrary.org';
  constructor(private http: HttpClient) {

  }

  searchBooks(query: string): Observable<any> {
    console.log(query);
    return this.http.get(`${this.baseUrl}/search.json?q=${query}`);
  }

  getBookDetails(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}.json`);
  }
}
