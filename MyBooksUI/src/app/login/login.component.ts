import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MappingControllerService } from '../services/mapping-controller.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  customError = null;

  constructor(private formBuilder: FormBuilder, private routerService: RouterService, private controllerService: MappingControllerService) {
    this.createLoginForm();
   }


  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email : ['',Validators.required],
      password : ['',Validators.required]
    });
  }


  ngOnInit() {
  }

  login(){
    this.isSubmitted = true;
    const defaultErrorMessage = 'Could not Login';
    if (this.loginForm.invalid) {
      this.isSubmitted = false;
      return;
    }
    
    this.controllerService.authenticateUser(this.loginForm.value).subscribe((data: any) => {
       
      this.isSubmitted = false;
       // console.log(this.loginForm.value);
        this.routerService.routeToDashboard();
      },
        error => {
         console.log(">>>>>>>>>> ",error);
         if(error != undefined){
          this.customError = error
         }else{          
          this.customError = defaultErrorMessage;
         }          
         console.log(this.customError);
          this.isSubmitted = false;
        }); // Subscribe
   
  }

  get loginFormControls() { return this.loginForm.controls; }
}
