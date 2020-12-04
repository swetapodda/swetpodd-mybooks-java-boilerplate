import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../appConstants';
import { User } from '../model';

@Injectable()
export class AuthService {
  
  httpOptions: any;

  constructor(private httpClient: HttpClient) { 
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };
  }

  registerUser(user: User) {
    console.log('Posting data');
    return this.httpClient.post(`${AppConstants.USER_SERVICE}/register`, JSON.stringify(user), this.httpOptions);
  }

  authenticateUser(user: any) {
    console.log("AuthService >> 2");
    return this.httpClient.post(`${AppConstants.USER_SERVICE}/login`, JSON.stringify(user), this.httpOptions);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }
 
  isUserAuthenticated(token) {
    return this.httpClient.post(`${AppConstants.USER_SERVICE}/isAuthenticated`, {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `BEARER_KEY:${token}`
        }), responseType: 'text' as 'json'
      }

    );
}
}
