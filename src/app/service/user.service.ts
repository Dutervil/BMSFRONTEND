import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpEvent, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/User";
import {CustomHttpResponse} from "../model/custom-http-response";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl=environment.baseUrl;

  constructor(private http:HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}user/list`);
  }


  public addUser(formData: FormData): Observable<User | HttpErrorResponse>{
    return this.http.post<User>(`${this.baseUrl}user/add`,formData)
  }

  public findUser(id: String): Observable<User | HttpErrorResponse>{
    return this.http.get<User>(`${this.baseUrl}user/find/${id}`)
  }
  public UpdateUser(formData: FormData): Observable<User | HttpErrorResponse>{
    return this.http.put<User>(`${this.baseUrl}user/update`,formData)
  }

  public resetPassword(email: string):Observable<CustomHttpResponse | HttpErrorResponse>{
    return this.http.get<CustomHttpResponse>(`${this.baseUrl}user/resetPassword/${email}`)
  }

  public updateProfile(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse>{
    return this.http.put<User>(`${this.baseUrl}user/updateProfileImage`,formData,{
      reportProgress:true,
      observe: 'events'
    })
  }
  public deleteUser(id :number) :Observable<CustomHttpResponse | HttpErrorResponse>{
    return this.http.get<CustomHttpResponse>(`${this.baseUrl}user/delete/${id}`)
  }

  public addUserToLocalCache(users: User[] | HttpErrorResponse){
    localStorage.setItem("users",JSON.stringify(users))
  }

  public getUserToLocalCache():User[] | null{
    if (localStorage.getItem("users")){
     // @ts-ignore
      return JSON.parse(localStorage.getItem("users"));
    }
    return null;
  }
  public createUserFormData(loggedInUsername:string,user: User, profileImage:File):FormData{
   const formData=new FormData();
    formData.append("currentUsername",loggedInUsername);
    formData.append("firstName",user.firstName);
    formData.append("lastName",user.lastName);
    formData.append("username",user.username);
    formData.append("email",user.email);
    formData.append("role",user.role);
    formData.append("profileImage",profileImage);
    formData.append("isActive",JSON.stringify(user.active));
    formData.append("isNonLocked",JSON.stringify(user.notLocked));
   return formData;
  }

}
