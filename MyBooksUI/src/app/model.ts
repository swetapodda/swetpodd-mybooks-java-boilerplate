export class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userID: string;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        
    }
}


export class Book {
    id: Number;
    username: string;
    bookID: string;
    bookURL: string;
    bookTitle: string;
    bookGenre: string;
    bookAuthor:string;
    score: Number;
    constructor() {
      this.username = '';
      this.bookID = '';
      this.bookURL = '';
      this.bookTitle = '';
      this.bookGenre = '';
      this.bookAuthor = '';
      this.score = 1;
    }
}


