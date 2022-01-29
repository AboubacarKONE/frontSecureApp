import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl

  constructor(private http:HttpClient) { }
  getUsers():Observable<User[] | HttpErrorResponse>{
    return this.http.get<User[]>(`${this.host}/user/list`)
  }
  addUser(formData:FormData):Observable<User | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/add`,formData);
  }
  updateUser(formData:FormData):Observable<User | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/update`,formData);
  }
  resetPassord(email:string):Observable<any | HttpErrorResponse>{
    return this.http.get(`${this.host}/user/resetpassword/${email}`);
  }
  updateProfileImage(formData:FormData):Observable<HttpEvent<User> | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/updateProfileImage`,formData,{
      reportProgress:true,
      observe:'events'
    });
  }
  deleteUser(userId:number):Observable<any | HttpErrorResponse>{
    return this.http.delete<any>(`${this.host}/user/delete/${userId}`);
  }
  addUsersToLocalCache(users:User[]):void{
    localStorage.setItem('users',JSON.stringify(users));
  }
  // getUsersFromLocalCache():User[] | null{
  //   if(localStorage.getItem('users')){
  //     return JSON.parse(localStorage.getItem('users'));
  //   }
  //   return null;
  // }
}
