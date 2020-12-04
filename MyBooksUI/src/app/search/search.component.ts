import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MappingControllerService } from '../services/mapping-controller.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

 
  
  // searchText = new FormControl('', [Validators.required]);
  public searchForm: FormGroup;
  public submitMessage: string;

  constructor(private formBuilder: FormBuilder, private controllerService: MappingControllerService,  private routerService: RouterService) { 
    this.submitMessage = '';
    this.createSearchForm();
  }

  ngOnInit() :void{
  }

  // getErrorMessage() {
  //   if (this.searchText.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  // }  

  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      searchText : ['',Validators.required]
    });
  }

  searchBooks(){
    if (this.searchForm.invalid) {     
      return;
    }
   
    const searchStr =  this.searchForm.get('searchText').value;
    if(searchStr.trim().length>0){
      var replaced = searchStr.split(' ').join('+');   
      console.log("replaced>>>>>>>>>> ",replaced);
     

      this.controllerService.searchBookInAPI(replaced).subscribe(bookRes => {
        this.routerService.routeToDashboard();
        // console.log('Data Fetched\n',bookRes);
      }, error => {
        console.log('Error:' + error);
      });
      
    }
  
  }
}
