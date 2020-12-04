import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../appConstants';
import { Book } from '../model';
import { BookService } from './book.service';

@Injectable()
export class BookManagerService {
   
  constructor(private bookService:BookService,private httpClient: HttpClient) { }


  fetchRandomBooksListFromServer(offset: Number) {
    console.log("Under fetchRandomBooksListFromServer method ");
        return this.httpClient.get<Array<Book>>(`${AppConstants.BOOK_API}&offset=${offset}`,);  
  }

  fetchSearchBookInAPIServer(searchText:any) {
    console.log("Under fetchSearchBookInAPIServer method ",`${AppConstants.BOOK_API_SEARCH}`);
        return this.httpClient.get<Array<Book>>(`${AppConstants.BOOK_API_SEARCH}`+searchText,);  
  }

  addToFavourites(book: Book) {
    console.log('Adding to Favourites' + `${AppConstants.FAVOURITE_API_URL}/addFavourite`);
    console.log("localStorage.getItem('BEARER_TOKEN') :: ",localStorage.getItem('BEARER_TOKEN'));
    return this.httpClient.post(`${AppConstants.FAVOURITE_API_URL}/addFavourite`, JSON.stringify(book),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'AUTHORIZATION': `BEARER_KEY:` + localStorage.getItem('BEARER_TOKEN')
        }), responseType: 'text' as 'json'
      });
  }

  fetchFavouriteBooks(userId: string) {
    console.log('Getting All Favourites BOOKs ');
    return this.httpClient.get(`${AppConstants.FAVOURITE_API_URL}/favourite/${userId}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'AUTHORIZATION': `BEARER_KEY:` + localStorage.getItem('BEARER_TOKEN')
        }), responseType: 'text' as 'json'
      });
  }

  removeFromFavourites(bookId: any, userId: any){

    console.log('Removing Book from Favourites');
    return this.httpClient.delete(`${AppConstants.FAVOURITE_API_URL}/favourite/${userId}/${bookId}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'AUTHORIZATION': `BEARER_KEY:` + localStorage.getItem('BEARER_TOKEN')
        }), responseType: 'text' as 'json'
      });
  }
  

  fetchRecommendedBooks(userId: string) {
    console.log('Getting All Recommended BOOKs ');
    return this.httpClient.get(`${AppConstants.RECOMMENDATION_API_URL}/recommended`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'AUTHORIZATION': `BEARER_KEY:` + localStorage.getItem('BEARER_TOKEN')
        }), responseType: 'text' as 'json'
      });
  }

}
