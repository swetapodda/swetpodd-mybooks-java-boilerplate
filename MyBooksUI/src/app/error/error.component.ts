import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MappingControllerService } from '../services/mapping-controller.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

   public errorMessage:String;
   public errorMsgSubsciption :Subscription;

   public infoMessage:String;
   public infoMsgSubsciption :Subscription;

  constructor(private controllerService: MappingControllerService) {
     this.errorMessage = undefined;
    this.errorMsgSubsciption = this.controllerService.errMessageSubject
      .subscribe((errorMessage: String) => {
        console.log('Error Message:' , errorMessage);
        this.errorMessage = errorMessage;
        this.infoMessage = undefined;
      });
      this.infoMessage = undefined;
      this.infoMsgSubsciption = this.controllerService.infoMessageSubject
        .subscribe((infoMessage: String) => {
          console.log('INFO Message:' , infoMessage);
          this.infoMessage = infoMessage;
          this.errorMessage = undefined;
        });
  }

  ngOnInit() {
  }

}
