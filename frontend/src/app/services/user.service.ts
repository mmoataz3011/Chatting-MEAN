import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as data from '../data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  signUp(user) {
    return this.http
      .post('users/signup', user)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  edit(user)
  {
    return this.http
      .post("users/edit", user)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  login(user) {
    return this.http
      .post('users/login', user)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  saveData(token, user) {    
    localStorage.setItem(data.user,user);
 
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem(data.user);
  }
  logOut() {
    localStorage.removeItem(data.user);
  }
  getUserData() {

      return JSON.parse(localStorage.getItem(data.user));
  }
  check(check) {
    return this.http
      .post('/users/check', check)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  changePassword(data)
  {
   return this.http.post('users/changePasswordByID',data).pipe(
      map(res=>JSON.parse(JSON.stringify(res)))
    );
  }
  /*getToken()
  {
    return localStorage.getItem(data.token);
  }*/


}
