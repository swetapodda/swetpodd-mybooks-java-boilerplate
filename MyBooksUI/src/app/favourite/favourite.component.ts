import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BookViewComponent } from '../book-view/book-view.component';
import { Book, User } from '../model';
import { MappingControllerService } from '../services/mapping-controller.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  public booksList: Array<Book>;
  bookListSubsciption: Subscription;
  bookErrMessage: string;
  books: Array<Book>;
  favourites: Array<Book>;
  book: Book;
  user: User;

  constructor(private controllerService: MappingControllerService, private routerService: RouterService) {
    
    this.booksList = [];

    /**Use the same code for Search too.*/
    this.bookListSubsciption = this.controllerService.bookSubject
      .subscribe((booksArray: Array<Book>) => {       
        this.booksList = booksArray;
      });
  }

  ngOnInit() {
    if(this.controllerService.logedUser == undefined){
      this.routerService.routeToLogin();
      return;
    }
    this.controllerService.fetchFavouriteBooks()
      .subscribe(data => {
        // console.log('Data Fetched');
      },
        error => {
          console.log('Error:' + error);
        });
  }

  removeFromFavourites(book) {
    
    this.controllerService.removeFromFavourites(book)
      .subscribe(
        (responseData: any) => {
          console.log('Removed From Fav:' + responseData);  
          
        //  alert(`Book- ${book.bookTitle},Removed successfully from Your Favourites`);       
        },
        error => {
          console.log(error);
          // const defaultErrorMessage = 'Could Not Remove from Your Favourites';
          // alert(`Err: Book- ${book.bookTitle}, Could Not Remove from Your Favourites`);
        });
  }

  openReadMore(selectedBook : Book){
    // console.log(selectedBook);
     this.controllerService.openReadMore(selectedBook);   
  }
  
}


