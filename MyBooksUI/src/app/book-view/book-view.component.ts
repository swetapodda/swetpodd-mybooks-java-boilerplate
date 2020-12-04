import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { Book } from '../model';
import { AuthService } from '../services/auth.service';
import { MappingControllerService } from '../services/mapping-controller.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  public book: Book;
  bookSubsciption: Subscription;

  constructor(private controllerService: MappingControllerService) {
    console.log('Inside Constructor::: ');
   
    /**Use the same code for Search too.*/
    this.bookSubsciption = this.controllerService.viewBookSubject
      .subscribe((bookView: Book) => {
        console.log('bookView:' , bookView);
        this.book = bookView;
      });
  }

  ngOnInit() {
  
  }

}
