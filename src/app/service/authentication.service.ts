import { User } from './../model/user';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
private host = environment.apiUrl;
private token:any;
private loggedInUsername:any;
private JwtHelper = new JwtHelperService();
private isLogged :any;
  constructor(private http:HttpClient) { }
  login(user:User):Observable<HttpResponse<any> | HttpErrorResponse>{
    return this.http.post<HttpResponse<any> | HttpErrorResponse>
    (`${this.host}/user/login`, user, {observe:'response'});
  }
  register(user:User):Observable<User | HttpErrorResponse>{
    return this.http.post<User | HttpErrorResponse>
    (`${this.host}/user/register`,user);
  }
  logOut():void{
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }
  saveToken(token:string):void{
    this.token = token;
    localStorage.setItem('token', token);
  }
  addUserToLocalCache(user:User):void{
    localStorage.setItem('user',JSON.stringify(user));
  }
  // getUserFromLocalCache():User{
  //   return JSON.parse(localStorage.getItem('user'));
  //   }
  loadToken():void{
    this.token= localStorage.getItem('token')
  }
  getToken():String{
    return this.token;
  }
  isloggedIn(): boolean{
    this.loadToken();
    if(this.token != null && this.token !== ''){
      if(this.JwtHelper.decodeToken(this.token).sub !=null || ''){
        if(!this.JwtHelper.isTokenExpired(this.token)){
          this.loggedInUsername = this.JwtHelper.decodeToken(this.token).sub;
          this.isLogged = true;
        }       
      }
    }
    else{
      this.logOut();
      this.isLogged = false;
    }
    return this.isLogged;
  }
  

}
