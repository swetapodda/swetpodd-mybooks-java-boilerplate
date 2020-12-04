import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../model';
import { MappingControllerService } from '../services/mapping-controller.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //Subsricbe loggedUser from controlller
  public logedUser: User;
  public loggedUserSubsciption :Subscription;
  title = 'Book Library';
  
  constructor(private controllerService: MappingControllerService, private routerService: RouterService) {
    //Substhis
    //this.loggedUser = <--Subscribed


     /**Use the same code for Search too.*/
    this.loggedUserSubsciption = this.controllerService.logedUserSubject
      .subscribe((user: User) => {
         console.log('User In Header' , user);
        this.logedUser = user;
      });
   }


  ngOnInit() {
  }

  logout(){
   
   if(this.controllerService.logout()){
    this.routerService.routeToLogin();
   } 
  }

}
