import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book, User } from '../model';
import { MappingControllerService } from '../services/mapping-controller.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {


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
        // console.log('Local: Image Size:' + this.booksList.length);
        this.booksList = booksArray;
      });
  }

  ngOnInit() {
    if(this.controllerService.logedUser == undefined){
      this.routerService.routeToLogin();
      return;
    }

    this.controllerService.fetchRecommendedBooks()
    .subscribe(data => {
      console.log('Data Fetched');
    },
      error => {
        console.log('Error:' ,error);
      });
  }

  openReadMore(selectedBook : Book){
     console.log(selectedBook);
     this.controllerService.openReadMore(selectedBook);
  }
  

}
