import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book, User } from '../model';
import { MappingControllerService } from '../services/mapping-controller.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
      console.log('Local: Image Size:' + this.booksList.length);
      this.booksList = booksArray;
    });
  }

  ngOnInit() {
   
    /**Fetch List from API**/
    this.controllerService.fetchRandomBooksListFromServer().subscribe(bookRes => {
      console.log('Data Fetched');
    }, error => {
      console.log('Error:' + error);
    });
    
  }

  addToFavourites(newBook:Book){
    console.log("Adding to Favoutires");
    this.bookErrMessage = '';
    // this.user = new User();
    console.log(this.controllerService.logedUser );
    if(this.controllerService.logedUser == undefined){
      this.routerService.routeToLogin();
      return;
    }
    this.controllerService.addToFavourites(newBook)
      .subscribe(
        (responseData: any) => {
           console.log('Added to Fav:' + responseData);
         // alert(`Book: ${newBook.bookTitle}, is added successfully in Favourite list.`);
          //  this.routerService.routeToFavourite();
        },
        error => {
          console.log(error);
        //  alert(`Err : Book- ${newBook.bookTitle}, Could Not Added to Your Favourites.`);
        });    
  }

  openReadMore(selectedBook : Book){
    // console.log(selectedBook);
     this.controllerService.openReadMore(selectedBook);   
  }  
 
}
