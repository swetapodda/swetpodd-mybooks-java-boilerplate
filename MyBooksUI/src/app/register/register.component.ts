import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MappingControllerService } from '../services/mapping-controller.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // 1. Add Form Control
  // 2. use  Form Control in the HTML
  // 3. On click of submit, call method /register in ts
  // 4. fetch the values from the form
  // 5. POST that FORM-Control Data to the REST API.
  // 6. Handle the response & return subscribe.
  // 7. handle the Success / Failure cases.
  // 8. Success--> navigated to Login page.
  // 9. Failure --> Show the error message on the same page.

  registrationForm: FormGroup;
  isSubmitted = false;
  customError = null;

  constructor(private formBuilder: FormBuilder, private routerService: RouterService, private controllerService: MappingControllerService) { 

    this.createReactiveForm();
  }
  createReactiveForm() {
   this.registrationForm = this.formBuilder.group({
     firstName : ['',Validators.required],
     lastName : ['',Validators.required],
     email : ['',Validators.required],
     password : ['',Validators.required],
     confirmPassword : ['',Validators.required]
   });
  }

  ngOnInit() {
  }

  register(){
    this.isSubmitted = true;
    const defaultErrorMessage = 'Failed to Sign Up';
    if (this.registrationForm.invalid) {
      this.isSubmitted = false;
      return;

    } else {

      if (this.registrationControls['password'].value !== this.registrationControls['confirmPassword'].value) {  
       // Password Mismatch
        this.isSubmitted = false;
        this.customError = 'Password Mismatch';
        return false;
      }
    }

    this.controllerService.registerUser(this.registrationForm.value)
      .subscribe({
        next: () => {
          const aletMessage = {
            message: 'Registration Success. Redirecting to Login. Login and Contunue.',
            type: 'success'
          };
          console.log(this.registrationForm.value);
          this.isSubmitted = false;
          this.routerService.routeToLogin();
        },
        error: error => {          
          console.log(">>>>>>>>>> ",error);
          if(error != undefined){
            const errMap =  JSON.parse(JSON.stringify(error));
            if(errMap['status']==0){
             this.customError ="Network Connection Failure";
            }else if(errMap['error'] != undefined){
              this.customError =errMap['error'];
            } else{
              this.customError =errMap['message'];
            }        
          }else{          
           this.customError = defaultErrorMessage;
          }          
          console.log(this.customError);
           this.isSubmitted = false;
         }      
      }); // Subscribe

 
  }

  get registrationControls() { return this.registrationForm.controls; }
}
