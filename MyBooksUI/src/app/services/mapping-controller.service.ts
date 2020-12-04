import { Injectable } from '@angular/core';
import { Book, User } from '../model';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { BookManagerService } from './book-manager.service';
import { getMaxListeners } from 'process';
import { RouterService } from './router.service';

@Injectable()
export class MappingControllerService {
 

  private BEARER_KEY: string = undefined;
  public logedUser: User;
  public loginStatus = false;
  private loginStatuSubject = new Subject();
  public logedUserSubject = new Subject();
  public booksList: Array<Book> = [];
  public myFavouriteBooks: Array<Book> = [];

  public bookSubject = new Subject();
  public favouriteBookSubject= new Subject();
  public viewBookSubject = new Subject();

  public errMessage : String = '';
  public errMessageSubject = new Subject();

  public infoMessage : String = '';
  public infoMessageSubject = new Subject();

  constructor(private autheService: AuthService, private bookManagerService: BookManagerService, private routerService: RouterService) {
    this.booksList = [];
  }

  registerUser(user: User) {
    
    return this.autheService.registerUser(user);
  }

  authenticateUser(userData: any) {
    this.cleanUpSession();
    return this.autheService.authenticateUser(userData)
      .pipe(
        map((data: any) => {

          const responseObject = JSON.parse(data);
           console.log("responseObject >>>>>>>>>>>>>> ", responseObject);
          this.setBearerKey(responseObject['JWT_TOKEN']);
          localStorage.setItem('BEARER_TOKEN', responseObject['JWT_TOKEN']);

          if (this.getBearerKey() !== undefined) {
            this.logedUser = responseObject['USER_DATA'];
            this.loginStatus = true;
            this.loginStatuSubject.next(this.loginStatus);
            this.logedUserSubject.next(this.logedUser);
            
            this.fetchRandomBooksListFromServer().subscribe(bookRes => {
              console.log('Data Fetched');
            }, error => {
              console.log('Error:' , error);
            });

          }
          return data;
        }), catchError(error => {
          this.cleanUpSession();
          console.log('Error:' , error);
          const errMap =  JSON.parse(JSON.stringify(error));
          if(errMap['status']==404){
           this.errMessage ="No Records Found.";
          }else  if(errMap['status']==0){
           this.errMessage ="Network Connection Failure";
          } else if(errMap['error'] != undefined){
            this.errMessage =errMap['error'];
          } else{
            this.errMessage =errMap['message'];
          }       
         return throwError(this.errMessage);
        })
      );
  }

  cleanUpSession() {
    this.logedUser = undefined;
    localStorage.removeItem('BEARER_TOKEN');
    this.logedUserSubject.next(this.logedUser);
    this.loginStatuSubject.next(false);
      this.myFavouriteBooks = [];
    this.bookSubject.next(this.myFavouriteBooks);
    this.setBearerKey(undefined);
  }

  getOffSet() {
    var x = Math.floor((Math.random() * 10) + 1);
    return x*5;
  }

  fetchRandomBooksListFromServer() {

    return this.bookManagerService.fetchRandomBooksListFromServer(this.getOffSet()).pipe(
      map((responseList: any) => {
        console.log("Random Fetch :\n",responseList);
        this.booksList = [];
        responseList["works"].forEach((element: { title: string; cover_edition_key: string; cover_id: any; authors:any[],subject: any[] }) => {
          if ('' !== element.title) {
            const book = new Book();
            book.bookID = element.cover_edition_key;
            book.bookURL = 'https://covers.openlibrary.org/w/id/' + (element.cover_id) + '.jpg';
            book.bookTitle = element.title;
            console.log("element.authors ",element.authors);
            if(undefined !==element.authors){
              element.authors.forEach((auth:{name:string})=>{
                console.log("Auhtor Name ", auth.name);
                book.bookAuthor = auth.name;
              });
            }
            //book.bookAuthor = ;
            book.bookGenre = element.subject[2];
            this.booksList.push(book);
            this.bookSubject.next(this.booksList);
          }
          return responseList;
        }), catchError(error => {
          console.log('Error:' + error);
          return throwError(error);
        });
      }));
  }


  searchBookInAPI(searchText:any) {
  //  console.log("searchText :::::::::", searchText );
    return this.bookManagerService.fetchSearchBookInAPIServer(searchText).pipe(
      map((responseList: any) => {
     //   console.log("responseList  Docs :::::::::", responseList );

        this.booksList = [];
        responseList["docs"].forEach((element: { title_suggest: string; key: string; cover_i: any; subject: any[]; author_name:any[] }) => {
       
          if (undefined !== element.cover_i &&'' !== element.cover_i) {
            console.info("element.cover_i : ",element.cover_i);
            const book = new Book();
            book.bookID = element.key;
            book.bookURL = 'https://covers.openlibrary.org/w/id/' + (element.cover_i) + '.jpg';
            book.bookTitle = element.title_suggest;
            if(undefined !== element.subject){
              book.bookGenre = element.subject[0];
            }
            if(undefined !== element.author_name){
              book.bookAuthor = element.author_name[0];
            }
            
            this.booksList.push(book);
            this.bookSubject.next(this.booksList);
          }
          return responseList;
        }), catchError(error => {
          console.log('Error:' + error);
          return throwError(error);
        });
      }));
  }


  openReadMore(book: Book) {
  
    if (book !== undefined) {
        this.viewBookSubject.next(book);           
    } 
  }
  
  addToFavourites(book: Book) {
    console.log("Inside Add to fav: ",book);
    const existingObject = this.myFavouriteBooks.find(oldBook => oldBook.bookID === book.bookID);
    if (existingObject === undefined) {
     
      book.username = (this.logedUser.email == "" ? this.logedUser.userID : this.logedUser.email);
      // Push to API
      return this.bookManagerService.addToFavourites(book)
        .pipe(
          map(
            (data: any) => {
             // console.log("Inside response data\t: ",data);
              this.myFavouriteBooks.push(book);
              this.favouriteBookSubject.next(this.myFavouriteBooks);
              this.infoMessage = `Book: ${book.bookTitle}, is added successfully in Favourite list.`;
              this.infoMessageSubject.next(this.infoMessage);
              return data;
            }),
          catchError(error => {
            console.log('Added Error:' , error);           
          this.infoMessage =undefined;
          this.infoMessageSubject.next(this.infoMessage);
           const errMap =  JSON.parse(JSON.stringify(error));
           if(errMap['status']==403){
            this.errMessage ="Session Expired, Please re-login and try again.";
            this.routerService.routeToLogin();
           }else if(errMap['status']==0){
            this.errMessage ="Network Connection Failure";
           }else if (errMap['error'] !== undefined){
            this.errMessage =errMap['error'];
           }else{
            this.errMessage =errMap['message'];
           }
         //  console.log('errMap Error:\t' ,errMap['status']);
            this.errMessageSubject.next(this.errMessage);
            return throwError(error);
          })
        );
    } // Fav Exist Check
    else{ this.errMessage = "Already added in your favourite";
      this.errMessageSubject.next(this.errMessage);}

  }

  fetchFavouriteBooks() {  
    
    if(this.logedUser === undefined) {
    return;
    }
    return this.bookManagerService.fetchFavouriteBooks(this.logedUser && this.logedUser.email ? this.logedUser.email : undefined)
    .pipe(
      map((data: any) => {
        //console.log('Favourite Books\n', data);
        const responseObject = JSON.parse(data);
        this.myFavouriteBooks = [];

        // Note: if we use forEach-- We could not access this.myFavouriteGifs variable inside for look

        for (const book of responseObject) {

          const favBook = new Book();

          favBook.id = book.id;
          favBook.bookID = book.bookID;
          favBook.bookURL = book.bookURL;
          favBook.bookTitle = book.bookTitle;
          favBook.bookGenre = book.bookGenre;
          favBook.username = book.username;

          this.myFavouriteBooks.push(favBook);
          this.bookSubject.next(this.myFavouriteBooks);
        }
        return responseObject;
      }), catchError(error => {
        console.log('Error:' , error);
        const errMap =  JSON.parse(JSON.stringify(error));
        if(errMap['status']==404){
         this.errMessage ="No Records Found.";
        }else  if(errMap['status']==0){
         this.errMessage ="Network Connection Failure";
        }else{
          this.errMessage =errMap['message'];
        }
      //  console.log('errMap Error:\t' ,errMap['status']);
         this.errMessageSubject.next(this.errMessage);
        return throwError(error);
      })
    );
  }


  removeFromFavourites(book: Book) {
    const removeIndex = this.myFavouriteBooks.findIndex(obj => obj.bookID === book.bookID);

    // Call Remove from Fav  API
    return this.bookManagerService.removeFromFavourites(book.bookID, this.logedUser.email)// Deleting By Id
      .pipe(
        map((data: any) => {
          this.myFavouriteBooks.splice(removeIndex, 1);
          this.bookSubject.next(this.myFavouriteBooks);
          this.infoMessage = `Book: ${book.bookTitle}, is removed successfully from Favourite list.`;
          this.infoMessageSubject.next(this.infoMessage);
          return data;
        }), catchError(error => {
          console.log('Error:' , error);
        const errMap =  JSON.parse(JSON.stringify(error));
        if(errMap['status']==404){
         this.errMessage ="No Records Found.";
        }else  if(errMap['status']==0){
         this.errMessage ="Network Connection Failure";
        }else{
          this.errMessage =errMap['message'];
        }
         this.errMessageSubject.next(this.errMessage);
          return throwError(error);
        })
      );
  }


  fetchRecommendedBooks() {  
    // this.logedUser = new User();
    // this.logedUser.userID ="darsh@gmail.com";
    //console.info("this.logedUser.userID >>> \t",this.logedUser.userID);
  
    return this.bookManagerService.fetchRecommendedBooks(this.logedUser && this.logedUser.email ? this.logedUser.email : undefined)
    .pipe(
      map((data: any) => {
        //console.log('Favourite Books\n', data);
        const responseObject = JSON.parse(data);
        this.myFavouriteBooks = [];

        // Note: if we use forEach-- We could not access this.myFavouriteGifs variable inside for look

        for (const book of responseObject) {

          const recommBook = new Book();

          recommBook.id = book.id;
          recommBook.bookID = book.bookID;
          recommBook.bookURL = book.bookURL;
          recommBook.bookTitle = book.bookTitle;
          recommBook.bookGenre = book.bookGenre;
          recommBook.username = book.username;
          recommBook.score = book.recommendationCount;
          recommBook.bookAuthor = book.bookAuthor;
          this.myFavouriteBooks.push(recommBook);
          this.bookSubject.next(this.myFavouriteBooks);
        }
        return responseObject;
      }), catchError(error => {
        console.log('Error:' , error);
        const errMap =  JSON.parse(JSON.stringify(error));
        if(errMap['status']==404){
         this.errMessage ="No Records Found.";
        }else  if(errMap['status']==0){
         this.errMessage ="Network Connection Failure";
        }else{
          this.errMessage =errMap['message'];
        }
      //  console.log('errMap Error:\t' ,errMap['status']);
      this.errMessageSubject.next(this.errMessage);
        return throwError(error);
      })
    );
  }
  
  logout(){
    this.cleanUpSession();
    return true;
  }
  setBearerKey(newKey: string) {
    this.BEARER_KEY = newKey;
  }

  getBearerKey(): string {
    return this.BEARER_KEY;
  }
}


