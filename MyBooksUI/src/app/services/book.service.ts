import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../model';

@Injectable()
export class BookService {
  
  book: Book;
  books: Array<Book>;
  favourites: Array<Book>;
  // recommanded: Array<RecommendedBook>;
  booksList: BehaviorSubject<Array<Book>>;
  // favouritesSubject: BehaviorSubject<Array<Book>>;
  // recommandedSubject: BehaviorSubject<Array<RecommendedBook>>;
  
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };

  constructor(private httpClient: HttpClient) { }

 
  getBooksList(): BehaviorSubject<Array<Book>> {
    return this.booksList;
  }

}
